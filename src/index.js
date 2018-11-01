import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import {store} from './store';
import registerServiceWorker from './registerServiceWorker';
const app = <Provider store= {store}><App/></Provider>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
