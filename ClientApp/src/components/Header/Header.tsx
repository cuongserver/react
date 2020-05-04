import * as React from 'react';
import { Route } from 'react-router';
import { HeaderCtx, HeaderContext } from 'components/Header/HeaderContext'
import TopNavMenu from 'components/Header/TopNavMenu'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'


export class Header extends React.Component{

	switchGroup(action: (arg: string) => void, newState: string) {
		action(newState)
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
									<div className="brand-logo hov-pointer" onClick={() => this.switchGroup(context.modAction.switchGroup, `HOME`)}>
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

