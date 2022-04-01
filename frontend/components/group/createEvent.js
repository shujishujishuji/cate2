import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'date-fns';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { eventService, alertService } from '../../services';


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

export default function CreateEvent() {
  const classes = useStyles();
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('title is required'),
    contents: Yup.string()
        .required('contents is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, rest, formState } = useForm(formOptions);
  const { errors } = formState;
  
  function onSubmit(data) {
    console.log(data)
    return createEvent(data)
  }

  function createEvent(data) {
    const { group_id } = router.query;
    var eid = Math.floor(Math.random()*10000)
    data["eventid"] = eid
    data["groupid"] = Number(group_id)
    return eventService.create(Number(group_id), data)
        .then(() => {
            alertService.success('Event added', { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
      イベント登録
    </Button>
    <CssBaseline />
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">イベント登録</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <DialogContent>
          <DialogContentText>
            タイトルと内容を入力したら、登録ボタンを押下します。
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="タイトル"
            name="title"
            autoFocus
            {...register('title')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contents"
            label="内容"
            name="contents"
            autoFocus
            {...register('contents')}
          />
          <TextField
            id="datetime-local"
            label="日付"
            type="datetime-local"
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...register('starttime')}
          />
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