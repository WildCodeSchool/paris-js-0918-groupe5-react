import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import axios from 'axios';
import { withStyles, Typography, Grid } from '@material-ui/core';
import getServerAuthority from '../../config/getServerAuthority';
import ContactModal from './ContactModal';
import DisplayContactModal from './DisplayContactModal';
import ContactCard from './ContactCard';
import AddContactButton from './AddContactButton';
import DeleteContactModal from './DeleteContactModal';

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
      displayContactModalIsOpen: false,
      deleteContactModalIsOpen: false,
      contactsList: [],
      displayedContact: null,
      selectedContact: null,
      selectedId: null,
    }

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
      this.setState({
        displayedContact: contactsList[id],
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
      const { contactsList } = this.state;
      const { reduxContact, dispatch } = this.props;
      console.log(this.props);
      const contact = { ...reduxContact };
      contact.title = reduxContact.title || 'Mme';
      contact.preferenceOfContact = reduxContact.preferenceOfContact || 'SMS';

      axios({
        method: 'POST',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then((res) => {
          // concatenation of contactsList and the new contact
          this.setState({ contactsList: [...contactsList, res.data] });
        })
        .then(this.handleClose('contactModalIsOpen'))
        .then(() => { dispatch(reset('contactModal')); });
    };

    handleSelectContact = (id) => {
      const { contactsList } = this.state;
      this.setState({
        selectedContact: contactsList[id],
        selectedId: id,
        contactModalIsOpen: true,
      });
    };

    handleEditContact = (id) => {
      const { contactsList } = this.state;
      const { reduxContact } = this.props;
      const contact = { ...reduxContact };

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


    handleDeleteContactModal = (id) => {
      const { contactsList } = this.state;
      this.setState({
        displayedContact: contactsList[id],
        deleteContactModalIsOpen: true,
        selectedId: id,
      });
    }

    handleDeleteContact = (id) => {
      const { contactsList } = this.state;
      const { reduxContact } = this.props;
      const contact = { ...reduxContact };

      axios({
        method: 'DELETE',
        url: `${getServerAuthority()}/contacts/${contactsList[id].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: contact,
      })
        .then(() => {
          const newContactsList = [...contactsList];
          newContactsList.splice(id, 1);
          this.setState({ contactsList: newContactsList });
        })
        .then(this.handleClose('deleteContactModalIsOpen'))
        .then(console.log(`Contact n° ${contactsList[id].id} (n° ${id} dans le tableau) supprimé`));
    }

    render() {
      const {
        contactModalIsOpen,
        displayContactModalIsOpen,
        deleteContactModalIsOpen,
        contactsList,
        displayedContact,
        selectedContact,
        selectedId,
      } = this.state;

      return (
        <div>
          <Typography variant="h4" component="h2">
            Mes contacts
          </Typography>

          <AddContactButton handleClickOpen={this.handleClickOpen('contactModalIsOpen')} />

          <Grid container spacing={16} justify="center">
            {contactsList.map((contact, index) => (
              <div key={contact.id}>
                <Grid item xs={12} sm={12}>
                  <ContactCard
                    contact={contact}
                    handleSelectContact={this.handleSelectContact}
                    handleDeleteContactModal={this.handleDeleteContactModal}
                    handleDisplayContact={this.handleDisplayContact}
                    index={index}
                  />
                </Grid>
              </div>
            ))}
          </Grid>

          {displayedContact !== null && (
          <DisplayContactModal
            handleClose={this.handleClose('displayContactModalIsOpen')}
            displayContactModalIsOpen={displayContactModalIsOpen}
            contactsList={contactsList}
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
            contactsList={contactsList}
            displayedContact={displayedContact}
            selectedId={selectedId}
            // index={index}
          />
          )}
        </div>
      );
    }
}


// récupérer le state qui est dans le store pour l'injecter dans les props de mon composant actuel
// grace à mapStateToProps on peut utiliser this.props.poulet par exemple
const mapStateToProps = state => ({
  reduxContact: {
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
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, null)(withStyles(styles)(Contact));
