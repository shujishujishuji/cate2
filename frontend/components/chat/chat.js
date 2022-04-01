import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { messageService, alertService } from '../../services';

const useStyles = makeStyles((theme) => ({
    chatContainer: {
        width: '40%',
        height: '98%',
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    ul: {
      fontSize: '1.1rem',
      padding: '2px'
    }
  }));

  let socket = new WebSocket("ws://127.0.0.1:1323/api/v1/ws");
  console.log("connection up")  
  //接続確立時 
  socket.onopen = () => {
    console.log("Successfully Connected");
  };
  //接続がcloseに変わった時
  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };
  //接続エラーが発生した時
  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
  
  export default function Chat() {
      //サーバからメッセージが届いた時
      socket.onmessage = msg => {
        let data = JSON.parse(msg.data)
        console.log({data})
        console.log("Action is", data.action)
        if (data.action === "broadcast") {
          let message = data.message
          let username = setUsername
          if (message.indexOf(username) > 0) {
            message = message.replace("replace", "me")
          } else {
            message = message.replace("replace", "other")
          }
          let messageList = document.getElementById("message-list")   
          messageList.innerHTML = messageList.innerHTML + message
        }
      };
      
      const classes = useStyles();
      const router = useRouter();
  
      const { register, handleSubmit, rest, formState } = useForm();
      const { errors } = formState;
  
      const [username, setUsername] = useState('')
      const [message, setMessage] = useState('')
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([])

      let cookie = parseCookies()
      let rid = Number(cookie.roomid)
      useEffect(() => {
        messageService.getByRoomId(rid)
            .then((result) => {
                setIsLoaded(true);
                setItems(result);
                console.log(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
  
      // ページから離脱時に発生
      window.onbeforeunload = function() {
        console.log("User Leaving")
        let jsonData = {}
        jsonData["action"] = "left"
        socket.send(JSON.stringify(jsonData))
      }

      // メッセージ送信
      function onSubmit(data) {
          const currentUser = parseCookies();
          console.log(currentUser)
          data["action"] = "broadcast"
          data["roomid"] = Number(currentUser.roomid)
          data["userid"] = Number(currentUser.userid)
          return socket.send(JSON.stringify(data))
      }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {items.map(item => (
            <li class='replace'><strong>{item.username}</strong>: {item.message}</li>
            ))}
            <ul className={classes.ul} id="message-list">
            </ul>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    name="username"
                    autoFocus
                    {...register('username')}>
                </TextField>
                  <Container>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        name="message"
                        autoFocus
                        {...register('message')}>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={formState.isSubmitting}>
                    send
                    </Button>
                </Container>
            </form>
        </Container>
    )
}
