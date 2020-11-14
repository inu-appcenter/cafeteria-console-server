import sequelize from "../../lib/db/sequelize";
import CafeteriaModel from "../../lib/db/models/CafeteriaModel";

describe('Sequelize', () => {
   it('should work', async () => {
        const cafeteriaRepository = sequelize.getRepository(CafeteriaModel);

        const allCafeteria = await cafeteriaRepository.findAll();

        console.log(allCafeteria);

        expect(allCafeteria.length).toBeGreaterThan(0);
   });
});
