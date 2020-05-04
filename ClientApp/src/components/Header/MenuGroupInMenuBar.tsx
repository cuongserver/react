import * as React from 'react';
import ReactDOM from "react-dom";
import { Route } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, NavMenuGroupProps, ModAction } from 'components/Header/HeaderContext'

type MenuGroup = NavMenuGroupProps & ModAction
export class MenuGroupInMenuBar extends React.Component<MenuGroup, any> {
    state = {
		offScreen: false,
		dropdownShowed: false,
	}

	handleClick = () => {
		this.props.switchGroup(this.props.groupName)
		if (!this.state.offScreen)
			this.setState({
				dropdownShowed: !this.state.dropdownShowed
			})
	}

	onMouseOver = (enterOrLeave: boolean) => {
		
	}
	componentDidMount() {
		window.addEventListener('resize', this.handleWhenOffscreen);
		this.handleWhenOffscreen();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWhenOffscreen)
	}

	private handleWhenOffscreen = () => {
		let node = ReactDOM.findDOMNode(this) as HTMLElement;
		let parentNode = node.parentNode as HTMLElement;
		let parentWidth = parentNode.getBoundingClientRect().left + parentNode.clientWidth;
		let rectX = node.getBoundingClientRect().left + this.props.minWidthPx

		let obj: NavMenuGroupProps = {
			id: this.props.id,
			groupName: this.props.groupName,
			minWidthPx: this.props.minWidthPx,
			target: this.props.target,
			child: this.props.child
		}

		if (rectX >= parentWidth && !this.state.offScreen) {
			this.props.moveToDrawer(obj)
		}

		if (rectX < parentWidth && this.state.offScreen) {
			this.props.removeFromDrawer(obj)
		}

		if ((rectX >= parentWidth) !== this.state.offScreen) {
			this.setState({
				offScreen: rectX >= parentWidth
			})
		}



	}

	public render() {
		return (
			<HeaderCtx.Consumer>
				{
					context =>
						context &&
						<div className={`pos-relative h-full`} style={{ minWidth: this.props.minWidthPx + `px` }}>
							<div className={`menu-group hov-pointer flex-c-m h-full w-full fs-09-rem pos-relative`
								+ ` ${this.state.offScreen ? "offscreen" : "onscreen"}`
								+ ` ${context.stateData.currentNavGroup == this.props.groupName ? "current-group" : ""}`}
								onClick={(e) => this.handleClick()}>
								<div className={`${context.stateData.currentNavGroup == this.props.groupName ? "active pos-absolute" : "inactive"}`}></div>
								<a className="">{this.props.groupName}</a>
							</div>
							{
								this.props.child &&
								<div className={`menugroup-dropdown pos-absolute text-center fs-07-rem w-full` +
									` ${this.state.dropdownShowed ? "flex-col-c-m" : "dis-none"}`}>
									<div className={`menugroup-dropdown-inner w-90 m-t-2`}>
										{
											this.props.child.map(groupMember =>
												<div className={`w-full`}>
													{groupMember.caption}
												</div>
											)
										}
									</div>
								</div>
							}
						</div>
				}
			</HeaderCtx.Consumer>			
		)
	}
}
