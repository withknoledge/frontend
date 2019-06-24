import React, {useState} from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon, Timeline as TimelineIcon, Settings as SettingsIcon} from '@material-ui/icons'

const tabList = [
    {
        label: '실시간',
        value: 'timeline',
        Icon: TimelineIcon
    },
    {
        label: '기록피드',
        value: 'history',
        Icon: TimelineIcon
    },
    {
        label: '설정',
        value: 'settings',
        Icon: SettingsIcon
    }
];

export default function CustomBottomNavigation({onChange = undefined}) {
    const [label, setLabel] = useState(tabList[0].value);

    const onChangeBottomNavigation = (e, v) => {
        setLabel(v);
        onChange && onChange(v);
    }

    return (
        <BottomNavigation style ={bottomTab} value={label} onChange={onChangeBottomNavigation}>
            {tabList.map(item => <BottomNavigationAction label={item.label} value={item.value} icon={<item.Icon />} key={item.value}/>)}
        </BottomNavigation>
    )
}

const bottomTab = {
    boxShadow: '0 0 8px #d7d7d7'
}