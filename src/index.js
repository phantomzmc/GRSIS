import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import { Provider } from 'react-redux'
import Home from '../src/container/home';
import ShowImageEvent from '../src/container/showImage';
import StepControl from '../src/container/steper';
import Invoice from '../src/container/invoice-bill'
import Test from './test'

import SuggestEvent from '../src/component/form/sugestion/sug_amphoe'
import store from './store/store'

WebFont.load({
    google: {
        families: ['Kanit', 'sans-serif']
    }
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/showimage" component={ShowImageEvent} />
                <Route path="/stepcontrol" component={StepControl} />
                <Route path="/invoice" component={Invoice} />
                <Route path="/test" component={Test} />

            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
