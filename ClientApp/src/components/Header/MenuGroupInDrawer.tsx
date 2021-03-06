import * as React from 'react';
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, NavMenuGroup, ContextObject } from 'components/Header/HeaderContext'

type MenuGroup = NavMenuGroup & ContextObject & RouteComponentProps<{}>

class MenuGroupInDrawer extends React.Component<MenuGroup, any> {

    handleClickToNavigate = (e: React.MouseEvent) => {
        let target = e.currentTarget.getAttribute('data-target') || '/';
        this.props.history.push(target);
        this.props.method.switchGroup(this.props.groupName)
    }

    public render() {
        let links;
        if (this.props.child && this.props.child.length > 0) {
            links = this.props.child.map(item =>
                <h6 className={`hov-pointer`} onClick={this.handleClickToNavigate} data-target={item.target}>{item.caption}</h6>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <h5>
                        {this.props.groupName}
                    </h5>
                    {
                        links
                    }                 
                </div>
            </React.Fragment>
        )
    }
}
export const MenuGroupInDrawerWithRouter = withRouter(MenuGroupInDrawer)
/*
export const MenuGroupInMenuBarWithRouter = withRouter(MenuGroupInMenuBar)
*/