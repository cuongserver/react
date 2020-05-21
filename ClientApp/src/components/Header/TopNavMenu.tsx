import * as React from 'react';
import { Route } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, HeaderContext } from 'components/Header/HeaderContext'
import { MenuGroupInMenuBarWithRouter } from 'components/Header/MenuGroupInMenuBar'
import { Toggle } from 'components/Header/Toggle'

class TopNavMenu extends React.Component {
	render() {
		return (
			<HeaderCtx.Consumer>
				{context =>
					context &&
					<React.Fragment>
						<div className={`flex-m top-nav-background m-t-10`}>
							<div className="top-nav-menu-container">
								<div className="top-nav-menu w-full flex-m">
									{
										context.data.groupsInMenuBar.map(group => {
											return <MenuGroupInMenuBarWithRouter {...group} {...context} />
										})
									}
								</div>
							</div>
							<div>
								<Toggle {...context} />
							</div>
						</div>
					</React.Fragment>
				}
			</HeaderCtx.Consumer>
		)
    }
}

export default TopNavMenu
