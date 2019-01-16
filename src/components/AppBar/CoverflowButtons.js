import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import Coverflow from 'react-coverflow';
import {
  Avatar,
  Fab,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon, Create as EditIcon, Clear as ClearIcon } from '@material-ui/icons';
import getServerAuthority from '../../config/getServerAuthority';
import { getReceivers } from '../../actions/infoActions';
import { displayDialogAddReceiver } from '../../actions/displayActions';
import DialogReceiver from './DialogReceiver';
import './CoverflowButtons.css';

const styles = theme => ({
  coverflow: {
    '&:focus': {
      outline: 'none',
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
});

class CoverflowButtons extends Component {
  state= {
    receiver: null,
  }

  handleClickAdd = () => {
    const { displayDialogAddReceiver } = this.props;
    this.setState({ receiver: null }, displayDialogAddReceiver(true));
  }

  getReceiver = (receiverId) => {
    const { displayDialogAddReceiver } = this.props;
    const token = localStorage.getItem('token');
    axios({
      method: 'GET',
      url: `${getServerAuthority()}/users/receiver/${receiverId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .then(receiver => (
        this.setState({ receiver }, displayDialogAddReceiver(true))
      ));
  }

  handleClickEdit = (receiverId) => {
    this.setState({ receiver: null }, () => this.getReceiver(receiverId));
  }

  handleClickClear = (receiverId) => {
    const { getReceivers } = this.props;

    const token = localStorage.getItem('token');
    axios({
      method: 'DELETE',
      url: `${getServerAuthority()}/users/receiver/${receiverId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => { getReceivers(); });
  }

  render() {
    const { classes, receivers, redux } = this.props;
    const { receiver } = this.state;
    console.log(redux.selectedReceiverId);
    return (
      <div className="CoverflowButtons">
        <Coverflow
          displayQuantityOfSide={2}
          enableHeading={false}
          enableScroll={false}
          active={1}
          className={classes.coverflow}
          currentFigureScale={1.2}
          otherFigureScale={0.7}
        >
          {receivers.map(receiver => (
            <div
              key={receiver.id}
              // onClick={() => fn()}
              // onKeyDown={() => fn()}
              tabIndex={receiver.id}
              role="menuitem"
            >
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton
                    onClick={() => this.handleClickEdit(receiver.id)}
                  >
                    <EditIcon className="iconCoverflow" fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => this.handleClickClear(receiver.id)}
                  >
                    <ClearIcon className="iconCoverflow" fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              <Avatar
                alt={`avatar ${receiver.firstName}`}
                src={receiver.avatar}
                classes={{ root: classes.avatarRoot, img: classes.avatarReceiver }}
              />
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom={false}
                classes={{
                  root: classes.typoRoot,
                }}
              >
                {receiver.firstName}
              </Typography>
            </div>
          ))}
          <div
            role="menuitem"
            tabIndex="0"
          >
            <Fab color="secondary" aria-label="Add" onClick={this.handleClickAdd}>
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
        {receiver !== null && <DialogReceiver receiver={receiver} />}
        {receiver === null && <DialogReceiver />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redux: {
    selectedReceiverId: state.info.selectedReceiverId,
  },
});

export default connect(
  mapStateToProps,
  { displayDialogAddReceiver, getReceivers },
)(withStyles(styles)(CoverflowButtons));
