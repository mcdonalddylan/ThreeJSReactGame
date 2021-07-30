import React from 'react';
import { ThreeJSHomePage } from '../ThreeJSHomePage';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

describe('Three JS Home page', () => {

    let mockStore;

    beforeEach(()=>{
        mockStore = {};
    });

    const setupRTL = () => {
        return render(
            <Provider store={mockStore}>
                <ThreeJSHomePage />
            </Provider>
        );
    };

    test.skip('Clicking on github link sends you somewhere', () => {
        const { getAllByText } = setupRTL();

        const githubBtn = getAllByText('GitHub')[0];
        fireEvent.click(githubBtn);
        expect(getAllByText('idkman')).toHaveLength(1);
    });
});