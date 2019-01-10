import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles, IconButton } from '@material-ui/core';
import getServerAuthority from '../../config/getServerAuthority';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import DisplayContactModal from './DisplayContactModal';
import Icons from '../Icons';

import ContactButton from './ContactButton';

// eslint-disable-next-line no-undef
const token = localStorage.getItem('token');

const styles = theme => ({
  displayContactButton: {
    margin: theme.spacing.unit,
    textTransform: 'capitalize',
  },

});


class Contact extends Component {
    state = {
      addContactModalIsOpen: false,
      editContactModalIsOpen: false,
      displayContactModalIsOpen: false,
      contactsList: [],
      selectedContact: null,
      selectedEditContact: null,
    }

    // loading the contacts list
    componentDidMount() {
      axios({
        method: 'GET',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(
        res => this.setState({
          contactsList: res.data,
        }),
      );
    }

    // generic function to open different modals
    // eslint-disable-next-line no-unused-vars
    handleClickOpen = modal => (e) => {
      this.setState({ [modal]: true });
    };

    handleEditContact = (modal, id) => (e) => {
      const { contactsList } = this.state;
      this.setState({ selectedEditContact: contactsList[id - 1] });
      this.setState({ [modal]: true });
    }

    handleDisplayContact = (id) => {
      const { contactsList } = this.state;
      this.setState({ selectedContact: contactsList[id - 1] });
      this.setState({ displayContactModalIsOpen: true });
    }

    // eslint-disable-next-line no-unused-vars
    handleClose = modal => (e) => {
      this.setState({ [modal]: false });
    };

    handleValidation = () => {
      const {
        contactsList,
      } = this.state;

      const {
        title,
        firstName,
        lastName,
        category,
        email,
        phone,
        preferenceOfContact,
        comment,
      } = this.props;

      const contact = {
        title,
        firstName,
        lastName,
        category,
        email,
        phone,
        preferenceOfContact,
        comment,
      };
      // posting the infos on the database
      axios({
        method: 'POST',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then((res) => {
          // res represents the response of the server (the contact transformed to json)
          contactsList.push(res.data);
          this.setState({ contactsList });
        })
        .then(this.handleClose('addContactModalIsOpen'));
    };

    render() {
      const { classes } = this.props;

      console.log('this.state.editContactModalIsOpen : ', this.state.editContactModalIsOpen);

      const {
        addContactModalIsOpen,
        editContactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        selectedContact,
        selectedEditContact,
      } = this.state;

      return (
        <div>
          <h2>Mes contacts</h2>
          {contactsList.map(e => (
            <p key={e.id}>
              <Button
                onClick={() => this.handleDisplayContact(e.id)}
                className={classes.displayContactButton}
              >
                {`${e.title} ${e.firstName} ${e.lastName}`}
                <br />
                {`${e.category}`}
              </Button>
              <IconButton onClick={this.handleEditContact('editContactModalIsOpen', e.id)}>
                <Icons name="EditIcon" />
              </IconButton>
              <IconButton>
                <Icons name="DeleteForeverIcon" />
              </IconButton>
            </p>))}

          {selectedContact !== null && (
          <DisplayContactModal
            handleClose={this.handleClose('displayContactModalIsOpen')}
            displayContactModalIsOpen={displayContactModalIsOpen}
            contactsList={contactsList}
            selectedContact={selectedContact}
          />)}
          {selectedEditContact !== null && (
            <EditContactModal
              handleClose={this.handleClose('editContactModalIsOpen')}
              handleValidation={this.handleValidation}
              editContactModalIsOpen={editContactModalIsOpen}
              contactsList={contactsList}
              selectedEditContact={selectedEditContact}
            />)}
          <ContactButton handleClickOpen={this.handleClickOpen('addContactModalIsOpen')} />
          <AddContactModal
            handleClose={this.handleClose('addContactModalIsOpen')}
            handleValidation={this.handleValidation}
            addContactModalIsOpen={addContactModalIsOpen}
          />
        </div>
      );
    }
}


// récupérer le state qui est dans le store pour l'injecter dans les props de mon composant actuel
// grace à mapStateToProps on peut utiliser this.props.poulet par exemple
const mapStateToProps = state => ({
  // formValueSelector allows to get fields in AddContactModal named firstName
  title: formValueSelector('AddContactModal')(state, 'title'),
  firstName: formValueSelector('AddContactModal')(state, 'firstName'),
  lastName: formValueSelector('AddContactModal')(state, 'lastName'),
  category: formValueSelector('AddContactModal')(state, 'category'),
  email: formValueSelector('AddContactModal')(state, 'email'),
  phone: formValueSelector('AddContactModal')(state, 'phone'),
  preferenceOfContact: formValueSelector('AddContactModal')(state, 'preferenceOfContact'),
  comment: formValueSelector('AddContactModal')(state, 'comment'),
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, null)(withStyles(styles)(Contact));
