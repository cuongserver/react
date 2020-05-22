import * as React from 'react';
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, NavMenuGroup, ContextObject } from 'components/Header/HeaderContext'
import { Subscription } from 'rxjs';

type MenuGroup = NavMenuGroup & ContextObject & RouteComponentProps<{}>
class MenuGroupInMenuBar extends React.Component<MenuGroup, any> {
	get inDrawer() {
		return this.props.data.groupsInDrawer.find(item => item.id === this.props.id) !== undefined;
	}

    state = {
		dropdownShowed: false,
		subs: new Array<Subscription>()
	}


	handleClickAtHeader = () => {
		if (this.props.target) {
			this.handleClickToNavigate(this.props.target);
			this.props.method.switchGroup(this.props.groupName)
		}
		
		this.props.method.setCurrentDropDown(this.props.groupName)
		if (this.props.data.currentDropDown === this.props.groupName) {
			this.setState({
				dropdownShowed: !this.state.dropdownShowed
			})
		} else {
			this.setState({
				dropdownShowed: true
			})
        }
	}

	handleClickToNavigate = (target: string) => {
		this.props.history.push(target);
		this.props.method.switchGroup(this.props.groupName)
		this.setState({
			dropdownShowed: false
		})
	}

	componentDidMount() {
		this.setState({
			subs: this.state.subs.push(
				this.props.data.onDrawerExpand.asObservable().subscribe((val) => {
					this.setState({
						dropdownShowed: false
					});
				})
			)
		});	

		window.addEventListener('resize', this.handleWhenOffscreen);
		this.handleWhenOffscreen();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWhenOffscreen)
		this.state.subs.forEach(sub => sub.unsubscribe());
	}

	private handleWhenOffscreen = () => {
		let node = ReactDOM.findDOMNode(this) as HTMLElement;
		let parentNode2 = node.parentNode as HTMLElement;
		let parentNode1 = parentNode2.parentNode as HTMLElement;
		let parentNode = parentNode1.parentNode as HTMLElement;
		let parentWidth = parentNode.getBoundingClientRect().width - 35;
		let rectX = this.positionCalc;


		let obj: NavMenuGroup = {
			id: this.props.id,
			groupName: this.props.groupName,
			minWidthPx: this.props.minWidthPx,
			target: this.props.target,
			child: this.props.child
		}

		if (rectX >= parentWidth && this.inDrawer === false) {
			this.props.method.moveToDrawer(obj);
		}

		if (rectX < parentWidth && this.inDrawer === true) {
			this.props.method.removeFromDrawer(obj);
		}
	}


	get positionCalc() {
		let x = 0;
		this.props.data.groupMembers.filter(group => group.id <= this.props.id)
			.forEach(group => x += group.minWidthPx);
		return x;
    }

	public render() {
		return (
			<React.Fragment>
				<div className={`pos-relative h-full` +` ${this.inDrawer ? "dis-none--ovr" : ""}`} style={{ minWidth: this.props.minWidthPx + `px` }}>
					<div className={`menu-group hov-pointer flex-c-m h-full w-full fs-09-rem pos-relative`
						+ ` ${this.inDrawer ? "offscreen" : "onscreen"}`
						+ ` ${this.props.data.currentNavGroup == this.props.groupName ? "current-group" : ""}`}
						onClick={(e) => this.handleClickAtHeader()}>
						<div className={`${this.props.data.currentNavGroup == this.props.groupName ? "active pos-absolute" : "inactive"}`}></div>
						<a className="">{this.props.groupName}</a>
					</div>
					{
						this.props.child &&
						<div className={`menugroup-dropdown pos-absolute text-center fs-07-rem w-full` +
							` ${this.state.dropdownShowed && (this.props.data.currentDropDown === this.props.groupName) ? "flex-col-c-m" : "dis-none"}`
							+ ` ${this.inDrawer ? "dis-none--ovr" : ""}`}>
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

export const MenuGroupInMenuBarWithRouter = withRouter(MenuGroupInMenuBar)