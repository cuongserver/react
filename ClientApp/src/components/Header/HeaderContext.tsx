import * as React from 'react';
import { Route } from 'react-router';
import TopNavMenu from 'components/Header/TopNavMenu'
import 'components/AppLayout/AppLayout.css';
import 'shared/css/utilities.css'

export interface NavMenuGroup {
    id: number,
    groupName: string,
    minWidthPx: number,
    target?: string
    child?: {
        target: string,
        caption: string
    }[]
}


export interface ContextData {
    groupMembers: NavMenuGroup[],
    currentNavGroup: string,
    currentDropDown: string,
    groupsInMenuBar: NavMenuGroup[],
    groupsInDrawer: NavMenuGroup[],
    isDrawerExpand: boolean,
    menuWidth: number
}

export interface ContextMethod {
    switchGroup: (arg: string) => void,
    moveToDrawer: (arg: NavMenuGroup) => void,
    removeFromDrawer: (arg: NavMenuGroup) => void,
    setCurrentDropDown: (arg: string) => void, 
    expandDrawer: () => void
}

export interface ContextObject {
    data: ContextData,
    method: ContextMethod
}

export const HeaderCtx = React.createContext<ContextObject | undefined>(undefined);

export class HeaderContext extends React.Component{
    switchGroup = (groupName: string): void => {
        this.setState((state: ContextData) => ({
            currentNavGroup: groupName,
            currentDropDown: ''
        }), () => {});       
    }    

    moveToDrawer = (group: NavMenuGroup): void => {
        this.setState((state: ContextData) => {
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

    removeFromDrawer = (group: NavMenuGroup): void => {     
        this.setState((state: ContextData) => {
            var _groupsInDrawer = [...state.groupsInDrawer];
            _groupsInDrawer.shift();
            return {
                groupsInDrawer: _groupsInDrawer
            }
        }, () => { });
    }

    setCurrentDropDown = (groupName: string): void => {
        this.setState((state: ContextData) => ({
            currentDropDown: groupName
        }), () => { });     
    }

    expandDrawer = () => {
        this.setState((state: ContextData) => {
            return {
                isDrawerExpand: !this.state.isDrawerExpand
            }
        }, () => { });
    }

    state = {
        groupMembers: groupMenuMembers,
        currentNavGroup: 'HOME',
        currentDropDown: 'XXX',
        groupsInMenuBar: [...groupMenuMembers].sort((a, b) => {return a.id - b.id }),
        groupsInDrawer: [],
        isDrawerExpand: false,
        menuWidth: 960,
    } as ContextData
    action = {
        switchGroup: this.switchGroup,
        moveToDrawer: this.moveToDrawer,
        removeFromDrawer: this.removeFromDrawer,
        setCurrentDropDown: this.setCurrentDropDown,
        expandDrawer: this.expandDrawer
    } as ContextMethod


    render() {
        return (
            <HeaderCtx.Provider value={{ data: this.state, method: this.action }}>
                {this.props.children}
            </HeaderCtx.Provider>
        )
    }
}


const groupMenuMembers: NavMenuGroup[] = [
    {
        id: 1, groupName: 'HOME', minWidthPx: 100, target: '/'
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
    },
    {
        id: 4, groupName: 'ABOUT', minWidthPx: 100, target: ''
    },
    {
        id: 5, groupName: 'CONTACT', minWidthPx: 100, target: ''
    },
    {
        id: 6, groupName: 'SUPPORT', minWidthPx: 100, target: ''
    }
]

