import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';

describe("Test App component", () => {

    
    it("For success, Component renders App dom element", () => {
        
        const div = document.createElement('div');

        ReactDOM.hydrate(
            <App />,
            div
        );
    });
    
});