import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import Notice from "../entities/Notice";
import NoticeModel from "../db/models/NoticeModel";

class NoticeRepository extends SequelizeCRUDRepository<Notice, NoticeModel> {

    constructor() {
        super(Notice, NoticeModel);
    }

    async addNotice(notice: Notice) {
        return this.create(notice);
    }

    async getNotice(noticeId: number) {
        return this.read(noticeId);
    }

    async getAllNotices() {
        return this.readAll();
    }

    async updateNotice(notice: Notice) {
        return this.update(notice, ['id'])
    }

    async deleteNotice(noticeId: number) {
        return this.delete(noticeId);
    }
}

const noticeRepository = new NoticeRepository();

export default noticeRepository;
