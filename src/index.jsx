import React from 'react';
import App from 'App';
import {
    BrowserRouter,
} from 'react-router-dom';

import './style.css'


const container = document.getElementById('root');
const root = createRoot(container);

const Index = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}
ReactDOM.render(<Index/>, document.getElementById('root'));

