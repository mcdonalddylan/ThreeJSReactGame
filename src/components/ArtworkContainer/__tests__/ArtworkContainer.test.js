import React from 'react';
import { getByAltText, render } from '@testing-library/react';
import { TestScheduler } from 'jest';
import { ArtworkContainer } from '../ArtworkContainer';

describe('<ArtworkContainer />', () => {
    let prop;

    beforeEach(() => {
        prop = {};
    });

    const setupRTL = () => {
        return render(
            <ArtworkContainer
            />
        );
    };

    test('should render artwork container stuff and things', () => {
        const { getbyText } = setupRTL();
        expect(getByText('idkman')).toBeInTheDocument();
    });
});