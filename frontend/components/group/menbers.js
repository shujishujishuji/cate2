import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { memberService, userService, alertService } from '../../services/';

async function getGroupMemberList(gid) {
    var memberlist = []
    const memberids = await memberService.getByGroupId(gid)

    for (const r in memberids) {
        await userService.getById(memberids[r]["userid"])
        .then(result => {
            memberlist.push(result)
        })
        .catch(alertService.error)
    };
    return memberlist
}

export default function Menbers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([])
    const router = useRouter();
    const { group_id } = router.query;

    useEffect(() => {
        getGroupMemberList(group_id)
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

    function onSubmit(data) {
        return deleteMember(data)
      }
    
    function deleteMember(uid) {
    const { group_id } = router.query;
    var gid = Number(group_id)
    return memberService.delete(gid, uid)
        .then(() => {
            alertService.success('Group added', { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
    }
    

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        console.log(items)
        return (
            <List>
                {items.map(item => (
                <ListItem>
                <ListItemIcon>
                <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                primary={`${item.firstname} ${item.lastname}`}
                />
                <Button
                type="submit"
                variant="outlined"
                onClick={() => onSubmit(Number(`${item.id}`))}
                color="primary"
                >
                削除
                </Button>
                </ListItem>
                ))}
            </List>
        )
    }
}