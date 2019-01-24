import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getReceivers } from '../../actions/infoActions';
import CoverflowButtons from './CoverflowButtons';
import ButtonsBar from './ButtonsBar';
import MenuBar from './MenuBar';
import logo from '../../assets/logoKaliService.png';

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
  logo: {
    position: 'absolute',
    left: '60px',
    top: '30px',
    maxWidth: '125px',
    height: 'auto',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

class AppBarReceiver extends Component {
  componentDidMount() {
    console.log('getReceivers AppBarReceiver componentDidMount');
    const { getReceivers } = this.props;
    getReceivers();
  }

  render() {
    const { classes, redux } = this.props;
    return (
      <div className={classes.AppBarReceiver}>
        <img className={classes.logo} src={logo} alt="Logo Kalify" />
        <div className={classes.slider}>
          {redux.receivers
            && (
            <CoverflowButtons
              receivers={redux.receivers}
              selectedReceiverTab={redux.selectedReceiverTab}
            />)
          }
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
    selectedReceiverTab: state.info.selectedReceiverTab,
    selectedReceiver: state.info.selectedReceiver,
    appBarIsDisplayed: state.display.appBarIsDisplayed,
  },
});

export default connect(
  mapStateToProps,
  { getReceivers },
)(withStyles(styles)(AppBarReceiver));
