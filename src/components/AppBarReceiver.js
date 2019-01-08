import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Coverflow from 'react-coverflow';
// import { StyleRoot } from 'radium';
// import {
//   Avatar,
//   Fab,
//   Typography,
// } from '@material-ui/core';
// import { Add as AddIcon } from '@material-ui/icons';
// import avatarOldMan from '../assets/avatar_old_man.png';
// import avatarOldWoman from '../assets/avatar_old_woman.png';
import './AppBarReceiver.css';
import ButtonsBar from './ButtonsBar';
import MenuBar from './MenuBar';

const styles = theme => ({
  AppBarReceiver: {
    background: '#65CDE2',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '70vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw',
    },
  },
  typoRoot: {
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  avatarRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
    [theme.breakpoints.up('md')]: {
      width: '90px',
      height: '90px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '120px',
      height: '120px',
    },
  },
  avatarReceiver: {
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
    [theme.breakpoints.up('md')]: {
      width: '90px',
      height: '90px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '120px',
      height: '120px',
    },
  },
  buttonRoot: {
    backgroundColor: 'white',
    color: 'black',
    bottom: '-24px',
    width: '159px',
  },
  sectionDesktop: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const AppBarReceiver = (props) => {
  const { classes } = props;
  return (
    <div className={classes.AppBarReceiver}>
      <div className={classes.slider}>
        {/* <StyleRoot>
          <Coverflow
            displayQuantityOfSide={2}
            infiniteScroll
            enableHeading={false}
            active={0}
          >
            <div
              // onClick={() => fn()}
              // onKeyDown={() => fn()}
              role="menuitem"
            >
              <Avatar alt="avatar" src={avatarOldWoman} classes={{ root: classes.avatarRoot, img: classes.avatarReceiver }} />
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom={false}
                classes={{
                  root: classes.typoRoot,
                }}
              >
              Mauricette
              </Typography>
            </div>
            <div
              // onClick={() => fn()}
              // onKeyDown={() => fn()}
              role="menuitem"
            >
              <Avatar alt="avatar" src={avatarOldMan} classes={{ root: classes.avatarRoot, img: classes.avatarReceiver }} />
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom={false}
                classes={{
                  root: classes.typoRoot,
                }}
              >
              Maurice
              </Typography>
            </div>
            <div
              role="menuitem"
            >
              <Fab color="secondary" aria-label="Add" className={classes.fab}>
                <AddIcon />
              </Fab>
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom={false}
                classes={{
                  root: classes.typoRoot,
                }}
              >
              Ajouter
              </Typography>
            </div>
          </Coverflow>
        </StyleRoot> */}
      </div>
      <div className={classes.sectionDesktop}>
        <ButtonsBar />
      </div>
      <div className={classes.sectionMobile}>
        <MenuBar />
      </div>
    </div>
  );
};

AppBarReceiver.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarReceiver);