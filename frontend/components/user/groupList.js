import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';
import { parseCookies } from 'nookies';
import { memberService, groupService, alertService } from '../../services';

export function ListItemLink(props) {
    return <ListItem button component="a" {...props} />
  }

//ログインユーザのグループリストを作成
async function getUserGroupList(uid) {
    var grouplist = []
    const groupids = await memberService.getByUserId(uid)

    for (const r in groupids) {
        await groupService.getById(groupids[r]["groupid"])
        .then(result => {
            grouplist.push(result)
        })
        .catch(alertService.error);
    };
    return grouplist
}

export default function GroupList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([])
    const uid = parseCookies().userid

    useEffect(() => {
        getUserGroupList(uid)
        .then((result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        console.log(items)
        return (
            <List>
                <ListSubheader inset>所属グループ</ListSubheader>
                {items.map(item => (
                <ListItemLink href={`/group/${item.groupid}`}>
                <ListItem>
                <ListItemIcon>
                <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                primary={item.groupname}
                />
                </ListItem>
                </ListItemLink>
                ))}
            </List>
        )
    }
}