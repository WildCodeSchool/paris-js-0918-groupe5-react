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
import { getReceivers, getSelectedReceiver } from '../../actions/infoActions';
import { displayDialogReceiver } from '../../actions/displayActions';
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
    selectedReceiverId: 0,
  }

  componentDidMount() {
    const { redux } = this.props;
    // this.getReceiverTabIndex(redux.selectedReceiverId);
    this.selectReceiver(redux.selectedReceiverId);
  }

  // getReceiverTabIndex = (receiverId) => {
  //   const { receivers } = this.props;
  //   const { selectedReceiverId } = this.state;

  //   if (receivers.length) {
  //     for (let i = 0; i < receivers.length; i++) {
  //       const receiver = receivers[i];
  //       if (receiver.id === receiverId) {
  //         if (selectedReceiverId !== i) {
  //           this.setState({ selectedReceiverId: i }, () => this.selectReceiver(receiver.id));
  //         }
  //         break;
  //       }
  //     }
  //   }
  // }

  selectReceiver = (receiverId) => {
    const { getSelectedReceiver } = this.props;
    getSelectedReceiver(receiverId);
  }

  handleClickAdd = () => {
    const { displayDialogReceiver } = this.props;
    this.setState({ receiver: null }, displayDialogReceiver(true));
  }

  getReceiverInfos = (receiverId) => {
    const { displayDialogReceiver } = this.props;
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
        this.setState({ receiver }, displayDialogReceiver(true))
      ));
  }

  handleClickEdit = (receiverId) => {
    this.setState({ receiver: null }, () => this.getReceiverInfos(receiverId));
  }

  handleClickClear = (receiverId) => {
    const { redux, getReceivers } = this.props;
    const token = localStorage.getItem('token');
    axios({
      method: 'DELETE',
      url: `${getServerAuthority()}/users/receiver/${receiverId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => { getReceivers(); })
      .then(() => {
        if (redux.receivers) {
          // this.setState({
          //   selectedReceiverId: 0,
          // });
          // } else {
          // this.getReceiverTabIndex(redux.selectedReceiverId);
          this.selectReceiver(redux.selectedReceiverId);
        }
      })
      .then(() => {
        window.location.reload();
      });
  }

  handleClickSelect = (receiverId) => {
    // this.getReceiverTabIndex(receiverId);
    const { getSelectedReceiver } = this.props;
    getSelectedReceiver(receiverId);
  }

  render() {
    const { classes, receivers, selectedReceiverTab } = this.props;
    const { receiver } = this.state;
    console.log(selectedReceiverTab);
    return (
      <div className="CoverflowButtons">
        <Coverflow
          displayQuantityOfSide={2}
          enableScroll={false}
          enableHeading={false}
          active={selectedReceiverTab}
          className={classes.coverflow}
          currentFigureScale={1.2}
          otherFigureScale={0.7}
        >
          {receivers.map((receiver, index) => (
            <div
              key={receiver.id}
              onClick={() => this.handleClickSelect(receiver.id)}
              tabIndex={index}
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
            tabIndex={receivers.length}
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
  { displayDialogReceiver, getReceivers, getSelectedReceiver },
)(withStyles(styles)(CoverflowButtons));
