import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { HeaderCtx, HeaderContext } from 'components/Header/HeaderContext'
import TopNavMenu from 'components/Header/TopNavMenu'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'


class Header extends React.Component<RouteComponentProps<{}>>{
	switchGroup(action: (arg: string) => void, newState: string) {
		action(newState)
		this.props.history.push('/');
	}

	render() {
		return (
			<HeaderContext>
				<HeaderCtx.Consumer>
					{
						context =>
							context &&
							<React.Fragment>
								<div className="d-flex">
									<div className="brand-logo hov-pointer" onClick={() => this.switchGroup(context.method.switchGroup, `HOME`)}>
										<a className="">
											<img src="/assets/images/company-logo.png" alt="Tour Agent" height="60px" />
										</a>
									</div>
								</div>
								<TopNavMenu />
							</React.Fragment>
					}
				</HeaderCtx.Consumer>
			</HeaderContext>
		)
	}
}

export const Header_HOC = withRouter(Header);
