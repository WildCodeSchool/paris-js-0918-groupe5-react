import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
 
const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#F2EFEA', 
  },
};

class NavBarCareGiver1 extends React.Component {
  state = {
    value: 0,
    open: false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  handleSubTab = () => {
    this.setState({ open : !this.state.open})
    console.log(this.state.open)
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Mes aidés" onMouseEnter={this.handleSubTab}/>
          <Tab label="Gérer mes notifications" />
          <Tab label="Mes contacts d'urgence" />
          <Tab label="Mon compte" />
          <Tab label="Déconnexion" />
        </Tabs>
      </Paper>
      
      </div>
    );
  }
}

NavBarCareGiver1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBarCareGiver1);