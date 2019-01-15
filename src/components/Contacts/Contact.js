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
      selectedId: null,
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
      this.setState({ selectedContact: contactsList[id], displayContactModalIsOpen: true });
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
      console.log(id);
      const {
        contactsList,
      } = this.state;

      this.setState({
        selectedEditContact: contactsList[id],
        contactModalIsOpen: true,
        selectedId: id,
      });
      console.log(contactsList);
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
        url: `${getServerAuthority()}/contacts/${contactsList[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then((res) => {
          const newContactsList = [...contactsList];
          newContactsList[id] = res.data;
          this.setState({ contactsList: newContactsList });
        })
        .then(this.handleClose('contactModalIsOpen'));
    }

    render() {
      const { classes } = this.props;

      const {
        contactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        selectedContact,
        selectedEditContact,
        selectedId,
      } = this.state;

      return (
        <div>
          <h2>Mes contacts</h2>
          {contactsList.map((contact, index) => (
            <p key={contact.id}>
              <Button
                onClick={() => this.handleDisplayContact(index)}
                className={classes.displayContactButton}
              >
                {`${contact.title} ${contact.firstName} ${contact.lastName}`}
                <br />
                {`${contact.category}`}
              </Button>
              <IconButton onClick={() => this.handleSelectContact(index)}>
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
            selectedId={selectedId}
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
