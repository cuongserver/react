import * as React from 'react';
import { Route } from 'react-router';
import {Header_HOC} from 'components/Header/Header'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'
import Home from 'components/Home'
import Counter from 'components/Counter'
import FetchData from 'components/FetchData'


const AppLayout = (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <div className="app-outer-box">
            <div className="app-inner-box p-t-10 p-b-10 p-l-10 p-r-10">
                <Header_HOC />
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
            </div>
        </div>
    </React.Fragment>
);

export default AppLayout
