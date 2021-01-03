import cafeteriaRepository from "../../lib/repositories/CafeteriaRepository";
import Cafeteria from "../../lib/entities/Cafeteria";

describe('CafeteriaRepository', () => {
   async function deleteIfExists(cafeteriaId: number) {
      await cafeteriaRepository.deleteCafeteria(cafeteriaId);
   }

   it('should add cafeteria', async () => {
      await deleteIfExists(99);

      const newly = new Cafeteria();
      newly.id = 99;
      newly.name = '히히'
      newly.displayName = '이히히';
      newly.supportMenu = true;
      newly.supportDiscount = true;
      newly.supportNotification = true;

      await cafeteriaRepository.addCafeteria(newly);

      const theNewlyCreated = await cafeteriaRepository.getCafeteria(99);
      expect(theNewlyCreated).toBeDefined();

      await deleteIfExists(99);
   });

   it('should get all cafeteria', async () => {
      const allCafeteria = await cafeteriaRepository.getAllCafeteria();

      expect(allCafeteria).toHaveLength(5);
   });

   it('should get cafeteria', async () => {
      const cafeteria1 = await cafeteriaRepository.getCafeteria(1);

      expect(cafeteria1).toBeDefined();
   });

   it('should update cafeteria', async () => {
      const cafeteria1 = await cafeteriaRepository.getCafeteria(1);
      if (!cafeteria1) {
         fail('No cafeteria found');
      }

      // Update
      cafeteria1.name = '이히히히히히';
      await cafeteriaRepository.updateCafeteria(cafeteria1);

      // Check
      const updatedCafeteria = await cafeteriaRepository.getCafeteria(1);
      if (!updatedCafeteria) {
         fail('No cafeteria found');
      }
      expect(updatedCafeteria.name).toBe('이히히히히히');

      // Restore
      updatedCafeteria.name = '학생식당';
      await cafeteriaRepository.updateCafeteria(updatedCafeteria);

      // Check
      const restoredCafeteria = await cafeteriaRepository.getCafeteria(1);
      if (!restoredCafeteria) {
         fail('No cafeteria found');
      }
      expect(restoredCafeteria.name).toBe('학생식당');
   });

   it('should delete cafeteria', async () => {
      await cafeteriaRepository.deleteCafeteria(909);
   });
});
