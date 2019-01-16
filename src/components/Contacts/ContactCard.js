import React from 'react';
import {
  Typography,
  withStyles,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import Icons from '../Icons';


const styles = theme => ({
  root: {
    maxWidth: 300,
    margin: 30,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  contactName: {
  },
});

const ContactCard = (props) => {
  const {
    classes,
    contact,
    handleSelectContact,
    handleDeleteContact,
    handleDisplayContact,
    index,
  } = props;

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <div>
      <Card className={classes.root}>
        <a onClick={() => handleDisplayContact(index)}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h3" className={classes.contactName}>
                {`${contact.title} ${contact.firstName} ${contact.lastName} ${contact.id}`}
              </Typography>
              <Typography component="p">
                {`${contact.category}
                ${contact.phone !== null ? contact.phone : ''}
                ${contact.email !== null ? contact.email : ''}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
        <IconButton onClick={() => handleSelectContact(index)} color="secondary">
          <Icons name="EditIcon" />
        </IconButton>
        <IconButton onClick={() => handleDeleteContact(index)} color="secondary">
          <Icons name="DeleteForeverIcon" />
        </IconButton>
      </Card>

      {/* <Dialog
        open={ContactCardIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`${displayedContact.title} ${displayedContact.firstName} ${displayedContact.lastName}`}
        </DialogTitle>
        <DialogContent>
          {displayedContact.category !== null && (<h4>Catégorie</h4>)}
          <p>{displayedContact.category}</p>
          {displayedContact.email !== null && (<h4>Email</h4>)}
          <p>{displayedContact.email}</p>
          {displayedContact.phone !== null && (<h4>Téléphone</h4>)}
          <p>{displayedContact.phone}</p>
          {displayedContact.preferenceOfContact !== null && (<h4>Préférence de contact</h4>)}
          <p>{displayedContact.preferenceOfContact}</p>
          {displayedContact.comment !== null && (<h4>Comment</h4>)}
          <p>{displayedContact.comment}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default withStyles(styles)(ContactCard);
