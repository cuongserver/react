import * as React from 'react';
import { Route } from 'react-router';
import TopNavMenu from 'components/Header/TopNavMenu'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'

export interface NavMenuGroupProps {
    id: number,
    groupName: string,
    minWidthPx: number,
    target?: string
    child?: {
        target: string,
        caption: string
    }[]
}


export interface StateData {
    currentNavGroup: string,
    currentDropDown: string,
    groupsInMenuBar: NavMenuGroupProps[],
    groupsInDrawer: NavMenuGroupProps[]
}

export interface ModAction {
    switchGroup: (arg: string) => void,
    moveToDrawer: (arg: NavMenuGroupProps) => void,
    removeFromDrawer: (arg: NavMenuGroupProps) => void,
    setCurrentDropDown: (arg: string) => void
}

type HeaderState = {
    stateData: StateData,
    modAction: ModAction
}

export const HeaderCtx = React.createContext<HeaderState | undefined>(undefined);

export class HeaderContext extends React.Component{
    switchGroup = (groupName: string): void => {
        this.setState((state: StateData) => ({
            currentNavGroup: groupName,
            currentDropDown: ''
        }), () => {});       
    }    

    moveToDrawer = (group: NavMenuGroupProps): void => {
        this.setState((state: StateData) => {
            var _groupsInDrawer = [...state.groupsInDrawer];
            _groupsInDrawer.push(group);
            _groupsInDrawer.sort((a, b) => {
                return a.id - b.id
            })
            return {
                groupsInDrawer: _groupsInDrawer
            }
        }, () => { });
    }

    removeFromDrawer = (group: NavMenuGroupProps): void => {     
        this.setState((state: StateData) => {
            var _groupsInDrawer = [...state.groupsInDrawer];
            _groupsInDrawer.shift();
            return {
                groupsInDrawer: _groupsInDrawer
            }
        }, () => { });
    }

    setCurrentDropDown = (groupName: string): void => {
        this.setState((state: StateData) => ({
            currentDropDown: groupName
        }), () => { });     
    }


    state = {
        currentNavGroup: 'HOME',
        currentDropDown: 'XXX',
        groupsInMenuBar: [...groupMenuMembers].sort((a, b) => {return a.id - b.id }),
        groupsInDrawer: []
    }
    modAction = {
        switchGroup: this.switchGroup,
        moveToDrawer: this.moveToDrawer,
        removeFromDrawer: this.removeFromDrawer,
        setCurrentDropDown: this.setCurrentDropDown
    }


    render() {
        return (
            <HeaderCtx.Provider value={{ stateData: this.state, modAction: this.modAction }}>
                {this.props.children}
            </HeaderCtx.Provider>
        )
    }
}


const groupMenuMembers: NavMenuGroupProps[] = [
    {
        id: 1, groupName: 'HOME', minWidthPx: 100, target: '/home'
    },
    {
        id: 2, groupName: 'COUNTER', minWidthPx: 100, child: [
            {
                target: '/counter',
                caption: 'COUNTER1'
            },
            {
                target: '/counter',
                caption: 'COUNTER2'
            },
            {
                target: '/counter',
                caption: 'COUNTER3'
            },

        ]
    },
    {
        id: 3, groupName: 'FETCH DATA', minWidthPx: 100, child: [
            {
                target: '/fetch-data',
                caption: 'FETCH DATA 1'
            },
            {
                target: '/fetch-data',
                caption: 'FETCH DATA 2'
            },
            {
                target: '/fetch-data',
                caption: 'FETCH DATA 3'
            },

        ]
    }
]

