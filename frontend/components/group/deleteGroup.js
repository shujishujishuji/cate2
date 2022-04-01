import { useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { parseCookies } from 'nookies';

import { groupService, alertService } from '../../services';


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

export default function DeleteGroup() {
  const classes = useStyles();
  const router = useRouter();
  
  function onSubmit(data) {
    return deleteGroup(data)
  }

  function deleteGroup(data) {
    let cookie = parseCookies()
    let uid = Number(cookie.userid)
    data["adminid"] = uid
    const { group_id } = router.query;
    var gid = Number(group_id)

    return groupService.delete(gid)
        .then(() => {
            alertService.success('Group added', { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
  }

  return (
    <div>
        <Button
        type="submit"
        fullWidth
        variant="outlined"
        onClick={onSubmit}
        color="primary"
        >
        グループ削除
        </Button>
    </div>
  );
}