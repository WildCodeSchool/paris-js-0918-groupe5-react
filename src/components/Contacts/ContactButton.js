import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  addContactButton: {
    margin: theme.spacing.unit,
    backgroundColor: '#FFD694',
    border: '1px solid #FFD694',
    '&:hover': {
      backgroundColor: '#FFE7C0',
    }
  },

});

const ContactButton = (props) => {

  const { handleClickOpen } = props;
  const { classes } = props;

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className={classes.addContactButton}
      >
        Ajouter un contact
      </Button>
    </div>
  );
};

ContactButton.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContactButton);
