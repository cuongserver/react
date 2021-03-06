import * as React from 'react';
import { Route } from 'react-router';
import 'components/Header/TopNavMenu.css';
import 'shared/css/utilities.css'
import { HeaderCtx, HeaderContext } from 'components/Header/HeaderContext';
import { MenuGroupInDrawerWithRouter } from 'components/Header/MenuGroupInDrawer';


class Drawer extends React.Component {
	render() {
		return (
			<HeaderCtx.Consumer>
				{context =>
					context &&
					<React.Fragment>
						<div className={`zone-drawer w-full pos-absolute`
							+ ` ${context.data.groupsInDrawer.length > 0 ? "drawer-enabled" : "dis-none"}`
							+ ` ${context.data.isDrawerExpand ? "drawer-expand" : "drawer-collapse"}`}
						>
							{
								context.data.groupsInDrawer.map(group => {
									return <MenuGroupInDrawerWithRouter {...group} {...context} />
								})
							}
						</div>
					</React.Fragment>
				}
			</HeaderCtx.Consumer>
		)
    }
}

export default Drawer
