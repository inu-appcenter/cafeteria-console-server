import sequelize from "../../lib/db/sequelize";
import Cafeteria from "../../lib/db/models/Cafeteria";

describe('Sequelize', () => {
   it('should work', async () => {
        const cafeteriaRepository = sequelize.getRepository(Cafeteria);

        const allCafeteria = await cafeteriaRepository.findAll();

        console.log(allCafeteria);

        expect(allCafeteria.length).toBeGreaterThan(0);
   });
});
