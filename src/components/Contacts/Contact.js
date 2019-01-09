import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddContactModal from './AddContactModal';
import DisplayContactModal from './DisplayContactModal';
import ContactButton from './ContactButton';

class Contact extends Component {
    state = {
      addContactModalIsOpen: false,
      displayContactModalIsOpen: false,
      contactsList: [],
      selectedContact: null,
    }

    // loading the contacts list
    componentDidMount() {
      axios.get('http://localhost:4244/contacts')
        .then(res => this.setState({
          contactsList: res.data,
        }));
    }

    // generic function to open different modals
    handleClickOpen = modal => (e) => {
      console.log('modale ouverte : ', modal);
      this.setState({ [modal]: true });
      console.log('state of selected contact : ', this.state.selectedContact);
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
        addContactModalIsOpen,
        // category,
        // preferenceOfContact,
      } = this.state;
      /* eslint-disable react/prop-types */
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
      /* eslint-enable react/prop-types */
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
      axios.post('http://localhost:4244/contacts', contact)
      // .then allows to execute code when a promise is solved
        .then((res) => {
          // res represents the response of the server (the contact transformed to json)
          console.log('ma data : ', res.data);
          contactsList.push(res.data);
          this.setState({ contactsList });
        });
      this.handleAlert();
      console.log('addContactModalIsOpen state : ', addContactModalIsOpen);
    };

    render() {
      console.log('state of displayContactModalIsOpen : ', this.state.displayContactModalIsOpen);
      const {
        addContactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        selectedContact,
      } = this.state;

      return (
        <div>
          {contactsList.map(e => (
            <p key={e.id}>
              <Button onClick={() => this.handleSelectingContact(e.id)}>
                {`${e.title} ${e.firstName} ${e.lastName} ${e.id}`}
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
export default connect(mapStateToProps, null)(Contact);
