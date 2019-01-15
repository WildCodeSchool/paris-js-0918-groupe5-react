import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles, IconButton } from '@material-ui/core';
import getServerAuthority from '../../config/getServerAuthority';
import ContactModal from './ContactModal';
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
      contactModalIsOpen: false,
      // editContactModalIsOpen: false,
      displayContactModalIsOpen: false,
      contactsList: [],
      selectedContact: null,
      selectedEditContact: null,
      // inputValue: '',
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

    handleDisplayContact = (id) => {
      const { contactsList } = this.state;
      this.setState({ selectedContact: contactsList[id - 1] });
      this.setState({ displayContactModalIsOpen: true });
    }

    // eslint-disable-next-line no-unused-vars
    handleClose = modal => (e) => {
      this.setState({
        [modal]: false,
        selectedEditContact: null,
      });
    };

    handleAddContact = () => {
      console.log('handleAddContact !');
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
          // concatenation
          this.setState({ contactsList: [...contactsList, res.data] });
        })
        .then(this.handleClose('contactModalIsOpen'));
    };

    handleSelectContact = (id) => {
      const {
        contactsList,
      } = this.state;

      console.log(contactsList[id - 1]);

      this.setState({ selectedEditContact: contactsList[id - 1], contactModalIsOpen: true });
      // this.setState({ contactModalIsOpen: true });
    };

    handleEditContact = (id) => {
      console.log('handleEditContact !', id);
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

      axios({
        method: 'PUT',
        url: `${getServerAuthority()}/contacts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then((res) => {
          contactsList[id - 1] = res.data;
          this.setState({ contactsList });
        })
        .then(this.handleClose('contactModalIsOpen'));
    }

    render() {
      const { classes } = this.props;

      const {
        contactModalIsOpen,
        // editContactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        selectedContact,
        selectedEditContact,
      } = this.state;

      return (
        <div>
          <h2>Mes contacts</h2>
          {contactsList.map(contact => (
            <p key={contact.id}>
              <Button
                onClick={() => this.handleDisplayContact(contact.id)}
                className={classes.displayContactButton}
              >
                {`${contact.title} ${contact.firstName} ${contact.lastName}`}
                <br />
                {`${contact.category}`}
              </Button>
              <IconButton onClick={() => this.handleSelectContact(contact.id)}>
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
          <ContactButton handleClickOpen={this.handleClickOpen('contactModalIsOpen')} />
          <ContactModal
            handleClose={this.handleClose('contactModalIsOpen')}
            handleAddContact={this.handleAddContact}
            handleSelectContact={this.handleSelectContact}
            handleEditContact={this.handleEditContact}
            contactModalIsOpen={contactModalIsOpen}
            selectedEditContact={selectedEditContact}
          />
        </div>
      );
    }
}


// récupérer le state qui est dans le store pour l'injecter dans les props de mon composant actuel
// grace à mapStateToProps on peut utiliser this.props.poulet par exemple
const mapStateToProps = state => ({
  // formValueSelector allows to get fields in contactModal named firstName
  title: formValueSelector('contactModal')(state, 'title'),
  firstName: formValueSelector('contactModal')(state, 'firstName'),
  lastName: formValueSelector('contactModal')(state, 'lastName'),
  category: formValueSelector('contactModal')(state, 'category'),
  email: formValueSelector('contactModal')(state, 'email'),
  phone: formValueSelector('contactModal')(state, 'phone'),
  preferenceOfContact: formValueSelector('contactModal')(state, 'preferenceOfContact'),
  comment: formValueSelector('contactModal')(state, 'comment'),
  editTitle: formValueSelector('EditContactModal')(state, 'title'),
  editFirstName: formValueSelector('EditContactModal')(state, 'firstName'),
  editLastName: formValueSelector('EditContactModal')(state, 'lastName'),
  editCategory: formValueSelector('EditContactModal')(state, 'category'),
  editEmail: formValueSelector('EditContactModal')(state, 'email'),
  editPhone: formValueSelector('EditContactModal')(state, 'phone'),
  editPreferenceOfContact: formValueSelector('EditContactModal')(state, 'preferenceOfContact'),
  editComment: formValueSelector('EditContactModal')(state, 'comment'),
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, null)(withStyles(styles)(Contact));
