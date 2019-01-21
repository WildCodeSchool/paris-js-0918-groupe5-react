import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getReceivers } from '../../actions/infoActions';
import CoverflowButtons from './CoverflowButtons';
import CoverflowAdd from './CoverflowAdd';
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

class AppBarReceiver extends Component {
  componentDidMount() {
    const { getReceivers } = this.props;
    getReceivers();
  }

  render() {
    const { classes, redux } = this.props;
    return (
      <div className={classes.AppBarReceiver}>
        <div className={classes.slider}>
          {redux.receivers && <CoverflowButtons receivers={redux.receivers} />}
          {!redux.receivers && <CoverflowAdd />}
        </div>
        <div className={classes.sectionDesktop}>
          <ButtonsBar />
        </div>
        <div className={classes.sectionMobile}>
          <MenuBar />
        </div>
      </div>
    );
  }
}

AppBarReceiver.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  redux: {
    receivers: state.info.receivers,
  },
});

export default connect(
  mapStateToProps,
  { getReceivers },
)(withStyles(styles)(AppBarReceiver));
