import * as React from 'react';
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'
import { HeaderCtx, NavMenuGroup, ContextObject } from 'components/Header/HeaderContext'

export class Toggle extends React.Component<ContextObject, any> {

    toggleDrawer = (e: React.MouseEvent) => {
        this.props.method.expandDrawer();
    }


    public render() {
        return (
            <React.Fragment>
                <div className={`flex-col-c-m toggle-button p-t-3 p-b-3 p-l-3 p-r-3 m-r-5`
                    + ` ${this.props.data.isDrawerExpand ? "drawer-open" : ""}`
                    + ` ${this.props.data.groupsInDrawer.length > 0 ? "" : "deactivated"}`} onClick={this.toggleDrawer}>
                    <div className={`bar first-bar m-b-3`}></div>
                    <div className={`bar second-bar`}></div>
                    <div className={`bar third-bar m-t-3`}></div>
                </div>
            </React.Fragment>
        )
    }
}

