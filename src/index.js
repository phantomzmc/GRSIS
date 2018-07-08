import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import WebFont from 'webfontloader';

import Home from '../src/container/home';
import ShowImageEvent from '../src/container/showImage';
import StepControl from '../src/container/steper';
import Invoice from '../src/container/invoice-bill'

WebFont.load({
    google: {
        families: ['Kanit', 'sans-serif']
    }
});

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/showimage" component={ShowImageEvent} />
            <Route path="/stepcontrol" component={StepControl} />
            <Route path="/invoice" component={Invoice} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
