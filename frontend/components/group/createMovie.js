import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { parseCookies } from 'nookies';

import { roomService, alertService } from '../../services';
import StyledDropzone from './uploadMovie'


const useStyles = makeStyles((theme) => ({
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
}));

export default function CreateMovie() {
  const classes = useStyles();
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    roomname: Yup.string()
        .required('Groupname is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, rest, formState } = useForm(formOptions);
  const { errors } = formState;
  
  function onSubmit(data) {
    return createRoom(data)
  }

  function createRoom(data) {
    let cookie = parseCookies()
    let uid = Number(cookie.userid)
    const { group_id } = router.query;
    var rid = Math.floor(Math.random()*10000)
    data["adminid"] = uid
    data["roomid"] = rid
    data["groupid"] = Number(group_id)
    return roomService.create(Number(group_id), data)
        .then(() => {
            alertService.success('Group added', { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
      動画登録
    </Button>
    <CssBaseline />
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">動画登録</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <DialogContent>
          <DialogContentText>
            動画ファイルをアップロードし、動画タイトルを入力したら、登録ボタンを押下します。
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="moviename"
            label="Movie Title"
            name="moviename"
            autoFocus
            {...register('name')}
          />
          <StyledDropzone />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClose}
          >
            登録
          </Button>
        </DialogActions>
        </form>
    </Dialog>
    </div>
  );
}