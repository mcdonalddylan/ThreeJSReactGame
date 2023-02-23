import { setupObjects } from "../homePageUtils";

describe('homePageUtils', () => {
    test('should setup three JS objects in the 3D scene', () => {
        expect(setupObjects()).toBeTruthy();
    });
});