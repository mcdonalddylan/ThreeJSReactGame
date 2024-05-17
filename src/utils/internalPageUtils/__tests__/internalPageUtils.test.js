import { loadLazyImagesFromObserver } from "../internalPageUtils";

describe('internalPageUtils', () => {
    test('should observe serveral images upon being called', () => {
        expect(loadLazyImagesFromObserver('.test class')).toBeCalled();
    });
});