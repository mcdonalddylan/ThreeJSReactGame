import { addingWebFBXFile } from "../fbxUtils";

describe('fbxUtils', () => {
    test('should add fbx Util to scene', () => {
        expect(addingWebFBXFile()).toBeTruthy();
    });
});