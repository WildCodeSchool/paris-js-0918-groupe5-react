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

// eslint-disable-next-line no-undef
const token = localStorage.getItem('token');

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
    }

    componentDidMount() {
      const { getContacts } = this.props;
      getContacts();
    }

    handleChangeCategoryOfContact = (event) => {
      this.setState({ categoryOfContact: event.target.value });
    };

    // generic function to open different modals
    // eslint-disable-next-line no-unused-vars
    handleClickOpen = modal => (e) => {
      this.setState({ [modal]: true });
    };

    handleDisplayContact = (id) => {
      const { redux } = this.props;
      const { categoryOfContact } = this.state;

      const contactsFiltered = redux.contacts.filter(contact => contact.category === categoryOfContact || categoryOfContact === 'Toutes catégories');
      this.setState({
        displayedContact: contactsFiltered[id],
        displayContactModalIsOpen: true,
      });
    }

    // eslint-disable-next-line no-unused-vars
    handleClose = modal => (e) => {
      this.setState({
        [modal]: false,
        selectedContact: null,
      });
    };

    handleAddContact = () => {
      const { redux, getContacts, reset } = this.props;
      console.log(this.props);
      const contact = { ...redux.contact };
      contact.title = redux.contact.title || 'Mme';
      contact.preferenceOfContact = redux.contact.preferenceOfContact || 'SMS';

      axios({
        method: 'POST',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => { getContacts(); })
        .then(this.handleClose('contactModalIsOpen'))
        .then(() => { reset('contactModal'); });
    };

    handleSelectContact = (id) => {
      const { redux } = this.props;
      const { categoryOfContact } = this.state;

      const contactsFiltered = redux.contacts.filter(contact => contact.category === categoryOfContact || categoryOfContact === 'Toutes catégories');

      this.setState({
        selectedContact: contactsFiltered[id],
        selectedId: id,
        contactModalIsOpen: true,
      });
    };

    handleEditContact = (id) => {
      const { redux, getContacts } = this.props;
      const contact = { ...redux.contact };

      axios({
        method: 'PUT',
        url: `${getServerAuthority()}/contacts/${redux.contacts[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => { getContacts(); })
        .then(this.handleClose('contactModalIsOpen'));
    }

    handleDeleteContactModal = (id) => {
      const { redux } = this.props;
      const { categoryOfContact } = this.state;

      const contactsFiltered = redux.contacts.filter(contact => contact.category === categoryOfContact || categoryOfContact === 'Toutes catégories');
      this.setState({
        displayedContact: contactsFiltered[id],
        deleteContactModalIsOpen: true,
        selectedId: id,
      });
    }

    handleDeleteContact = (id) => {
      const { getContacts, redux } = this.props;
      const contact = { ...redux.contact };

      axios({
        method: 'DELETE',
        url: `${getServerAuthority()}/contacts/${redux.contacts[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => { getContacts(); })
        .then(this.handleClose('deleteContactModalIsOpen'))
        .then(() => { console.log(`Contact n° ${redux.contacts[id].id} (n° ${id} dans le tableau) supprimé`); });
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

      const {
        classes,
      } = this.props;

      const contactsFiltered = redux.contacts.filter(contact => contact.category === categoryOfContact || categoryOfContact === 'Toutes catégories');

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
            {redux.contacts && contactsFiltered.map((contact, index) => (
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

