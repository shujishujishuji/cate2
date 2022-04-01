import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Offcanvas from 'react-bootstrap/Offcanvas'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { roomService, alertService } from '../../services';
import { setCookie } from 'nookies';
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('../chat/chat'), { ssr: false });

export default function Rooms(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([])
    const router = useRouter();
    const { group_id } = router.query;

    useEffect(() => {
        roomService.getByGroupId(group_id)
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

    const [show, setShow] = useState(false);
    const [state, setState] = useState(props)

    const handleClose = () => {
      setShow(false);
    }
    const toggleShow = (roomid, roomname) => {
      setCookie(null, 'roomid', roomid, { maxAge: 60 * 60 });
      setState({...state, roomid: roomid, roomname: roomname})
      setShow((s) => !s);
    }

    function onSubmit(data) {
      return deleteRoom(data)
    }
  
    function deleteRoom(rid) {
    return roomService.delete(rid)
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
            <>
            <List>
                {items.map(item => (
                <ListItem>
                <ListItemText
                button onClick={() => toggleShow(item.roomid, item.roomname)} className="me-2"
                primary={item.roomname}
                />
                <Button
                type="submit"
                variant="outlined"
                onClick={() => onSubmit(Number(`${item.roomid}`))}
                color="primary"
                >
                削除
                </Button>
                </ListItem>
                ))}
            </List>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.roomname}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Chat />
                  </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
}

Rooms.defaultProps = 
{
  roomname: '',
  scroll: true,
  backdrop: false,
  placement: 'end',
  roomid: 0
};