import Question from "../entities/Question";
import QuestionModel from "../db/models/QuestionModel";
import Answer from "../entities/Answer";
import AnswerModel from "../db/models/AnswerModel";
import SequelizeRawCRUDRepository from "./base/SequelizeRawCRUDRepository";
import logger from "../utils/logger";

class InteractionRepository {
    private questionRepo = new QuestionRepository()
    private answerRepo = new AnswerRepository()

    async getAllQuestions() {
        const seqQuestions = await this.questionRepo.ra();
        const seqAnswers = await this.answerRepo.ra();

        return new QuestionAnswerGatherer(seqQuestions, seqAnswers).combine()
    }

    async answerQuestion(questionId: number, answer: Answer) {
        const seqQuestion = await this.questionRepo.r(questionId);
        if (!seqQuestion) {
            return 0;
        }

        const seqAnswer = (await this.answerRepo.ra()).find((a) => a.question_id === questionId);
        if (seqAnswer) {
            // Answer already exists for that question!
            logger.warn(`이봐! ${questionId}번 질문에는 이미 답변한 걸로 아는데? 또 무슨 말을 하려고!`)
            return 0;
        }

        return this.answerRepo.c({
            title: answer.title,
            body: answer.body,
            read: false,
            user_id: seqQuestion.user_id,
            question_id: questionId
        });
    }

    async updateAnswer(questionId: number, answer: Answer) {
        const seqQuestion = await this.questionRepo.r(questionId);
        if (!seqQuestion) {
            return 0;
        }

        const seqAnswer = (await this.answerRepo.ra()).find((a) => a.question_id === questionId);
        if (!seqAnswer) {
            // Answer already exists for that question!
            logger.warn(`이봐! ${questionId}번에 대답한 적도 없으면서 업데이트라구?!`)
            return 0;
        }

        return this.answerRepo.u({
            id: seqAnswer.id,
            title: answer.title,
            body: answer.body,
            read: false,
            user_id: seqQuestion.user_id,
            question_id: questionId
        });
    }
}

class QuestionAnswerGatherer {
    private seqQuestions: Array<QuestionModel>
    private seqAnswers: Array<AnswerModel>

    constructor(seqQuestions: Array<QuestionModel>, seqAnswers: Array<AnswerModel>) {
        this.seqQuestions = seqQuestions;
        this.seqAnswers = seqAnswers;
    }

    combine() {
        return this.seqQuestions.map((q) => this.question(q));
    }

    private question(seqQuestion: QuestionModel) {
        const question = new Question();
        question.id = seqQuestion.id;
        question.deviceInfo = seqQuestion.device_info;
        question.version = seqQuestion.version;
        question.content = seqQuestion.content;
        question.userId = seqQuestion.user_id;
        question.date = seqQuestion.createdAt;
        question.answer = this.answerOfQuestion(seqQuestion.id);

        return question;
    }

    private answerOfQuestion(questionId: number) {
        const seqAnswer = this.seqAnswers.find((a) => a.question_id === questionId);
        if (!seqAnswer) {
            return null;
        }

        const answer = new Answer();
        answer.id = seqAnswer.id;
        answer.title = seqAnswer.title;
        answer.body = seqAnswer.body;
        answer.read = seqAnswer.read;
        answer.date = seqAnswer.createdAt;

        return answer;
    }
}

class QuestionRepository extends SequelizeRawCRUDRepository<QuestionModel> {
    constructor() { super(QuestionModel); }

    async c(q: object) { return this.create(q); }
    async r(id: number) { return this.read(id) }
    async ra() { return this.readAll() }
    async u(q: object) { return this.update(q) }
    async d(id: number) { return this.delete(id) }
}

class AnswerRepository extends SequelizeRawCRUDRepository<AnswerModel> {
    constructor() { super(AnswerModel); }

    async c(a: object) { return this.create(a); }
    async r(id: number) { return this.read(id) }
    async ra() { return this.readAll() }
    async u(a: object) { return this.update(a) }
    async d(id: number) { return this.delete(id) }
}

const interactionRepository = new InteractionRepository();

export default interactionRepository;
