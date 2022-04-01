import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { eventService, alertService } from '../../services';


export default function Events() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([])
    const router = useRouter();
    const { group_id } = router.query;
    let regexp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

    useEffect(() => {
        eventService.getByGroupId(group_id)
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
        return deleteEvent(data)
      }
    
    function deleteEvent(eid) {
    const { group_id } = router.query;
    var gid = Number(group_id)
    return eventService.delete(gid, eid)
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
                primary={`${item.title} ${item.contents} ${item.starttime}`.replace(regexp, '　$1年$2月$3日　$4時$5分開始')}
                />
                <Button
                type="submit"
                variant="outlined"
                onClick={() => onSubmit(Number(`${item.eventid}`))}
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