import React, {useState, useEffect} from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';

import Members from './menbers'
import Rooms from './rooms';
import Events from './events'
import { groupService } from '../../services';
import CreateRoom from './createRoom';
import CreateEvent from './createEvent';
import CreateMember from './createMember';
import CreateMovie from './createMovie';
import DeleteGroup from './deleteGroup';
import MyCalendar from './myCalendar';
import Movies from './movies';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 600,
  },
}));

const videoJsOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  sources: [{
    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    type: 'video/mp4'
  }]
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function GroupTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { group_id } = router.query;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([])

  useEffect(() => {
    groupService.getById(group_id)
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
        <div>
          <Box display="flex">
          <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
            {items.groupname}
          </Typography>
          <CreateMember />
          <CreateRoom />
          <CreateEvent />
          <CreateMovie />
          <DeleteGroup />
          </Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="メンバー" {...a11yProps(0)} />
              <Tab label="ルーム" {...a11yProps(1)} />
              <Tab label="イベント" {...a11yProps(2)} />
              <Tab label="スケジュール" {...a11yProps(3)} />
              <Tab label="動画" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Members />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Rooms />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Events />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MyCalendar />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Movies />
          </TabPanel>
        </div>
      );
  }
}