import * as React from 'react';
import { Route } from 'react-router';
import {Header} from 'components/Header/Header'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'



const AppLayout = (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <div className="app-outer-box">
            <div className="app-inner-box p-t-10 p-b-10 p-l-10 p-r-10">
                <Header />
            </div>
        </div>
    </React.Fragment>
);

export default AppLayout
