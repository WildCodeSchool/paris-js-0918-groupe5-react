import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


const ContactButton = (props) => {
  const { handleClickOpen } = props;
  return (
    <div>
      <Button onClick={handleClickOpen}>Ajouter un contact</Button>
    </div>
  );
};

ContactButton.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default ContactButton;
