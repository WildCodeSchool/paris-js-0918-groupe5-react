import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import axios from 'axios';
import getServerAuthority from '../../config/getServerAuthority';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddContactModal from './AddContactModal';
import DisplayContactModal from './DisplayContactModal';

import ContactButton from './ContactButton';

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
      displayContactModalIsOpen: false,
      contactsList: [],
      selectedContact: null,
    }

    // loading the contacts list
    componentDidMount() {
      axios({
        method: 'GET',
        url: `${getServerAuthority()}/contacts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => this.setState({
          contactsList: res.data,
        }));
    }

    // generic function to open different modals
    handleClickOpen = modal => (e) => {
      this.setState({ [modal]: true });
    };

    handleSelectingContact = (id) => {
      const { contactsList } = this.state;
      this.setState({ selectedContact: contactsList[id - 1] });
      this.setState({ displayContactModalIsOpen: true });
    }

    handleClose = modal => (e) => {
      this.setState({ [modal]: false });
    };

    // TEST FUNCTION!
    handleAlert = () => {
      this.setState({ addContactModalIsOpen: false });
    }

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
      // .post('http://localhost:4244/contacts', contact)
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      // // .then allows to execute code when a promise is solved
        .then((res) => {
          // res represents the response of the server (the contact transformed to json)
          console.log('ma data : ', res.data);
          contactsList.push(res.data);
          this.setState({ contactsList });
        })
        .then(this.handleClose('addContactModalIsOpen'));
    };

    render() {
      const { classes } = this.props;

      const {
        addContactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        selectedContact,
      } = this.state;

      return (
        <div>
          <h2>Mes contacts</h2>
          {contactsList.map(e => (
            <p key={e.id}>
              <Button
                onClick={() => this.handleSelectingContact(e.id)}
                className={classes.displayContactButton}
              >
                {`${e.title} ${e.firstName} ${e.lastName}`}
                <br />
                {`${e.category}`}
              </Button>
            </p>))}

          {selectedContact !== null && (
          <DisplayContactModal
            handleClose={this.handleClose('displayContactModalIsOpen')}
            displayContactModalIsOpen={displayContactModalIsOpen}
            contactsList={contactsList}
            selectedContact={selectedContact}
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
