import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class CguNews extends React.Component {
  state = {
    Cgu: true,
    newsletter: false,
    
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClickCGU = () => {
    if(this.state.Cgu === false){
      alert('veuiliez accepter les conditions général.')
    }
  }

  render() {
    const { classes } = this.props;
    const { Cgu, newsletter} = this.state;
    

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={Cgu} onChange={this.handleChange('Cgu')} value="gilad" />
              }
              label="Accepter les CGU*"
            />
            <FormControlLabel
              control={
                <Checkbox checked={newsletter} onChange={this.handleChange('newsletter')} value="jason" />
              }
              label="M’abonner à la newsletter"
            />
          
          </FormGroup>
          
        </FormControl>
        
      </div>
    );
  }
}

CguNews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CguNews);
