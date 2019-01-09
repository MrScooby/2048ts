import './main.css';
import { Manager } from './ts/manager';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from "./components/app";

let wrapper: HTMLDivElement = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

ReactDOM.render(<App />, wrapper);

window.addEventListener('load', () => {
    (function () {
        console.log('frontend loaded');
        // let manager = new Manager();
    })();
});