import * as React from 'react';
import { Route } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, HeaderContext } from 'components/Header/HeaderContext'
import { MenuGroupInMenuBar } from 'components/Header/MenuGroupInMenuBar'


class TopNavMenu extends React.Component {
	render() {
		return (
			<HeaderCtx.Consumer>
				{context => context &&
					<React.Fragment>
						<div className="top-nav-menu w-full flex-m m-t-10">
								{
								context.stateData.groupsInMenuBar.map(group => {
									return <MenuGroupInMenuBar {...group} {...context.modAction} {...context.stateData}/>
								})
								}
						</div>
						{
							context.stateData.groupsInDrawer.map(group => {
								return <div>{group.groupName}</div>
							})
						}

					</React.Fragment>
				}
			</HeaderCtx.Consumer>
		)
    }
}

export default TopNavMenu
