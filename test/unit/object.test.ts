import Cafeteria from "../../lib/entities/Cafeteria";
import {parseObject, serializeObject} from "../../lib/utils/object";
import {camelToSnake, snakeToCamel} from "../../lib/utils/naming";

describe('Object', () => {

    function getCafeteria() {
        const cafeteria = new Cafeteria();
        cafeteria.id = 1;
        cafeteria.name = 'cafeteria';
        cafeteria.displayName = 'realCafeteria';
        cafeteria.supportMenu = true;
        cafeteria.supportDiscount = true;
        cafeteria.supportNotification = true;

        return cafeteria;
    }

    function getSerializedCafeteria() {
        return {
            'id': 1,
            'name': 'cafeteria',
            'display_name': 'realCafeteria',
            'support_menu': true,
            'support_discount': true,
            'support_notification': true
        };
    }

    it('should serialize', async () => {
        const before = getCafeteria();
        const result = serializeObject(before, camelToSnake, ['imagePath']);
        const expected = getSerializedCafeteria();

        expect(result).toStrictEqual(expected);
    });

    it('should parse', async () => {
        const before = getSerializedCafeteria();
        // @ts-ignore
        const result = parseObject(before, snakeToCamel, Cafeteria);
        const expected = getCafeteria();

        expect(result).toStrictEqual(expected);
    });
});
