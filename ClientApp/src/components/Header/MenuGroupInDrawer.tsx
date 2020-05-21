import * as React from 'react';
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, NavMenuGroup, ContextObject } from 'components/Header/HeaderContext'

type MenuGroup = NavMenuGroup & ContextObject & RouteComponentProps<{}>
/*
class MenuGroupInMenuBar extends React.Component<MenuGroup, any> {

	private handleWhenOffscreen = () => {
		let node = ReactDOM.findDOMNode(this) as HTMLElement;
		let parentNode2 = node.parentNode as HTMLElement;
		let parentNode1 = parentNode2.parentNode as HTMLElement;
		let parentNode = parentNode1.parentNode as HTMLElement;
		let parentWidth = parentNode.getBoundingClientRect().left + parentNode.clientWidth - 35;
		let rectX = node.getBoundingClientRect().left + this.props.minWidthPx


		let obj: NavMenuGroup = {
			id: this.props.id,
			groupName: this.props.groupName,
			minWidthPx: this.props.minWidthPx,
			target: this.props.target,
			child: this.props.child
		}

		if (rectX >= parentWidth && !this.state.offScreen) {
			this.props.method.moveToDrawer(obj)
			this.setState({
				inDrawer: true
			})
		}

		if (rectX < parentWidth && this.state.offScreen) {
			this.props.method.removeFromDrawer(obj)
			this.setState({
				inDrawer: false
			})
		}

		if ((rectX >= parentWidth) !== this.state.offScreen) {
			this.setState({
				offScreen: rectX >= parentWidth
			})
		}
	}

	get positionCalc() {
		let x = 0;
		let groups = this.props.data.groupMembers.filter(group => group.id <= this.props.id)
			.forEach(group => x += group.minWidthPx);
		return x;
    }

	public render() {
		return (
			<React.Fragment>
				<div className={`pos-relative h-full`} style={{ minWidth: this.props.minWidthPx + `px` }}>
					<div className={`menu-group hov-pointer flex-c-m h-full w-full fs-09-rem pos-relative`
						+ ` ${this.state.offScreen ? "offscreen" : "onscreen"}`
						+ ` ${this.props.data.currentNavGroup == this.props.groupName ? "current-group" : ""}`}
						onClick={(e) => this.handleClickAtHeader()}>
						<div className={`${this.props.data.currentNavGroup == this.props.groupName ? "active pos-absolute" : "inactive"}`}></div>
						<a className="">{this.props.groupName}</a>
					</div>
					{
						this.props.child &&
						<div className={`menugroup-dropdown pos-absolute text-center fs-07-rem w-full` +
							` ${this.state.dropdownShowed && (this.props.data.currentDropDown === this.props.groupName) ? "flex-col-c-m" : "dis-none"}`
							+ ` ${this.state.inDrawer ? "dis-none--ovr" : ""}`}>
							<div className={`menugroup-dropdown-inner w-full m-t-2`}>
								{
									this.props.child.map(groupMember =>
										<div className={`w-full hov-pointer`}
											onClick={() => this.handleClickToNavigate(groupMember.target)}	>
											{groupMember.caption}
										</div>
									)
								}
							</div>
						</div>
					}
				</div>
			</React.Fragment>
		)
	}
}

export const MenuGroupInMenuBarWithRouter = withRouter(MenuGroupInMenuBar)*/