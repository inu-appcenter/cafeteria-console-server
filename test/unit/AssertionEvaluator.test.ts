import AssertionEvaluator from "../../lib/utils/AssertionEvaluator";

it('should support le', async () => {
    expect(new AssertionEvaluator().evaluate({
        value: '4.0.0',
        assertion: '<= 4.0.0',
    })).toBe(true);
});
