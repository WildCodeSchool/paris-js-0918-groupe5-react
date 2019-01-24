import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import axios from 'axios';
import { withStyles, Grid } from '@material-ui/core';
import getServerAuthority from '../../config/getServerAuthority';
import ContactModal from './ContactModal';
import DisplayContactModal from './DisplayContactModal';
import ContactCard from './ContactCard';
import AddContactButton from './AddContactButton';
import DeleteContactModal from './DeleteContactModal';
import { getContacts } from '../../actions/infoActions';
import ChooseCategoryOfContact from './ChooseCategoryOfContact';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const styles = theme => ({
  displayContactButton: {
    margin: theme.spacing.unit,
    textTransform: 'capitalize',
  },
  selectCategoryOfContact: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addContactButton: {
    display: 'flex',
    alignItems: 'center',
  },
});


class Contact extends Component {
    state = {
      contactModalIsOpen: false,
      displayContactModalIsOpen: false,
      deleteContactModalIsOpen: false,
      displayedContact: null,
      selectedContact: null,
      selectedId: null,
      categoryOfContact: 'Toutes catégories',
      preferenceOfContact: null,
    }

    componentDidMount() {
      const { getContacts } = this.props;
      getContacts();
    }

    handleChangeCategoryOfContact = (event) => {
      this.setState({ categoryOfContact: event.target.value });
    };

    handleSelectContact = (id) => {
      this.setState({
        selectedContact: this.contactsFiltered()[id],
        selectedId: id,
        contactModalIsOpen: true,
      });
    };

    handleClickOpen = modal => (e) => {
      this.setState({ [modal]: true });
    };

    handleClose = modal => (e) => {
      this.setState({
        [modal]: false,
        selectedContact: null,
      });
    };

    handleDisplayContact = (id) => {
      this.setState({
        displayedContact: this.contactsFiltered()[id],
        displayContactModalIsOpen: true,
      });
    }

    handleAddContact = () => {
      const { redux, getContacts, reset } = this.props;
      const contact = { ...redux.contact };
      contact.title = redux.contact.title || 'Mme';
      contact.preferenceOfContact = redux.contact.preferenceOfContact || 'SMS';
      const token = localStorage.getItem('token');
      axios({
        method: 'POST',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(console.log('data : ', contact))
        .then(() => { getContacts(); })
        .then(this.handleClose('contactModalIsOpen'))
        .then(() => { reset('contactModal'); });
    };

    handleEditContact = (id) => {
      const { redux, getContacts, reset } = this.props;
      const contact = { ...redux.contact };
      const token = localStorage.getItem('token');

      axios({
        method: 'PUT',
        url: `${getServerAuthority()}/contacts/${this.contactsFiltered()[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => { reset('contactModal'); })
        .then(() => { getContacts(); })
        .then(this.handleClose('contactModalIsOpen'))
        .then(console.log(`Contact n° ${id} dans le tableau édité`))
        .then(console.log('data : ', { contact }))
        // .then(() => { reset('contactModal'); });
    }

    handleDeleteContactModal = (id) => {
      this.setState({
        displayedContact: this.contactsFiltered()[id],
        deleteContactModalIsOpen: true,
        selectedId: id,
      });
    }

    handleDeleteContact = (id) => {
      const { getContacts, redux } = this.props;
      const contact = { ...redux.contact };
      const token = localStorage.getItem('token');

      axios({
        method: 'DELETE',
        url: `${getServerAuthority()}/contacts/${this.contactsFiltered()[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => { getContacts(); })
        .then(this.handleClose('deleteContactModalIsOpen'))
        .then(() => { console.log(`Contact n° ${this.contactsFiltered()[id].id} (n° ${id} dans le tableau) supprimé`); });
    }

    contactsFiltered() {
      const { redux } = this.props;
      const { categoryOfContact } = this.state;

      return redux.contacts.filter(contact => contact.category === categoryOfContact || categoryOfContact === 'Toutes catégories').sort((a, b) => {
        const x = a.lastName.toLowerCase();
        const y = b.lastName.toLowerCase();
        if (x < y) { return -1; }
        if (y > x) { return 1; }
        return 0;
      });
    }

    render() {
      const {
        contactModalIsOpen,
        displayContactModalIsOpen,
        deleteContactModalIsOpen,
        displayedContact,
        selectedContact,
        selectedId,
        categoryOfContact,
      } = this.state;
      const { redux } = this.props;
      const { classes } = this.props;
      return (
        <div>
          <Grid container spacing={16} justify="center">
            <Grid item xs={6} className={classes.selectCategoryOfContact}>
              <ChooseCategoryOfContact
                categoryOfContact={categoryOfContact}
                handleChangeCategoryOfContact={this.handleChangeCategoryOfContact}
              />
            </Grid>
            <Grid item xs={6} className={classes.addContactButton}>
              <AddContactButton handleClickOpen={this.handleClickOpen('contactModalIsOpen')} />
            </Grid>
            {redux.contacts && this.contactsFiltered().map((contact, index) => (
              <div key={contact.id}>
                <Grid item xs={12} sm={12}>
                  <ContactCard
                    contact={contact}
                    handleSelectContact={this.handleSelectContact}
                    handleDeleteContactModal={this.handleDeleteContactModal}
                    handleDisplayContact={this.handleDisplayContact}
                    index={index}
                    categoryOfContact={categoryOfContact}
                  />
                </Grid>
              </div>
            ))}
          </Grid>

          {displayedContact !== null && (
          <DisplayContactModal
            handleClose={this.handleClose('displayContactModalIsOpen')}
            displayContactModalIsOpen={displayContactModalIsOpen}
            contactsList={redux.contacts}
            displayedContact={displayedContact}
          />)}

          <ContactModal
            handleClose={this.handleClose('contactModalIsOpen')}
            handleAddContact={this.handleAddContact}
            handleSelectContact={this.handleSelectContact}
            handleEditContact={this.handleEditContact}
            selectedContact={selectedContact}
            selectedId={selectedId}
            contactModalIsOpen={contactModalIsOpen}
          />

          {displayedContact !== null && (
          <DeleteContactModal
            handleClose={this.handleClose('deleteContactModalIsOpen')}
            handleDeleteContact={this.handleDeleteContact}
            deleteContactModalIsOpen={deleteContactModalIsOpen}
            contactsList={redux.contacts}
            displayedContact={displayedContact}
            selectedId={selectedId}
          />
          )}
        </div>
      );
    }
}


// récupérer le state qui est dans le store pour l'injecter dans les props de mon composant actuel
// grace à mapStateToProps on peut utiliser this.props.poulet par exemple
const mapStateToProps = state => ({
  redux: {
    contact: {
      title: formValueSelector('contactModal')(state, 'title'),
      firstName: formValueSelector('contactModal')(state, 'firstName'),
      lastName: formValueSelector('contactModal')(state, 'lastName'),
      category: formValueSelector('contactModal')(state, 'category'),
      profession: formValueSelector('contactModal')(state, 'profession'),
      address: formValueSelector('contactModal')(state, 'address'),
      email: formValueSelector('contactModal')(state, 'email'),
      phone: formValueSelector('contactModal')(state, 'phone'),
      preferenceOfContact: formValueSelector('contactModal')(state, 'preferenceOfContact'),
      comment: formValueSelector('contactModal')(state, 'comment'),
    },
    contacts: state.info.contacts,
  },
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, { getContacts, reset })(withStyles(styles)(Contact));
