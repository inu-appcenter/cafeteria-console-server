import discountTransactionRepository from "../../lib/repositories/DiscountTransactionRepository";

describe('# getTransactions', () => {
    /**
     * 환경변수 세 개를 맞추고 실행해 주세요!
     * - DB_HOST
     * - DB_USERNAME
     * - DB_PASSWORD
     */
   it('should work', async () => {
       const result = await discountTransactionRepository.getTransactions({cafeteriaId: 4, date: new Date()});

       console.log(result);
   });
});
