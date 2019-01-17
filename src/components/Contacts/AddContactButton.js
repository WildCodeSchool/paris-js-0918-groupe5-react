import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  addContactButton: {
    margin: theme.spacing.unit,
    // backgroundColor: '#FFD694',
    // border: '1px solid #FFD694',
    // '&:hover': {
    //   backgroundColor: '#FFE7C0',
    // },
  },

});

const AddContactButton = (props) => {
  const { handleClickOpen } = props;
  const { classes } = props;

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className={classes.addContactButton}
        color="primary"
      >
        Ajouter un contact
      </Button>
    </div>
  );
};

AddContactButton.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddContactButton);
