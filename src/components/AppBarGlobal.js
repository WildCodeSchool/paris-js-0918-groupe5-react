import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBarCaregiver from './AppBarCaregiver';
import AppBarReceiver from './AppBarReceiver';

const styles = {
  appBarGlobal: {
    position: 'sticky',
    top: 0,
    zIndex: 3,
  },
};

const AppBarGlobal = (props) => {
  const { classes } = props;
  return (
    <div className={classes.appBarGlobal}>
      <AppBarCaregiver />
      <AppBarReceiver />
    </div>
  );
};

// class AppBarGlobal extends Component {
//   render() {
//     const { classes } = this.props;
//     return (
//       <div className={classes.appBarGlobal}>
//         <AppBarCaregiver />
//       </div>
//     )
//   }
// }

AppBarGlobal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarGlobal);
