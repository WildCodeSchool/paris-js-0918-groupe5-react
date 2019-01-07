import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddContactModal from './AddContactModal';
import DisplayContactModal from './DisplayContactModal';
import ContactButton from './ContactButton';
// import { reduxForm } from 'redux-form';

class Contact extends Component {
    state = {
      addContactModalIsOpen: false,
      displayContactModalIsOpen: false,
      contactsList: [],
      category: '',
      // preferenceOfContact: 'SMS',
    }

    // loading the contacts list
    componentDidMount() {
      axios.get('http://localhost:4244/contacts')
        .then(console.log('componentdidmount !'))
        .then(res => this.setState({
          contactsList: res.data,
        }));
    }

    // generic function to open different modals
    handleClickOpen = modal => (event) => {
      this.setState({ [modal]: true });
    };

    handleClose = modal => (event) => {
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
      axios.post('http://localhost:4244/contacts', contact)
      // .then allows to execute code when a promise is solved
        .then((res) => {
          // res represents the response of the server (the contact transformed to json)
          console.log('ma data : ', res.data);
          contactsList.push(res.data);
          this.setState({ contactsList });
        });
      console.log('Je valide !');
      console.log('My firstname is : ', firstName);
      console.log('My title is : ', title);
      console.log('My category is : ', category);
      console.log('My comPreference is : ', preferenceOfContact);
      this.handleAlert();
      console.log(addContactModalIsOpen);
    };

    // handlePreferenceOfContact = (e) => {
    //   this.setState({ preferenceOfContact: e.target.value });
    //   console.log('handleCommunication: ');
    // };

    render() {
      const {
        addContactModalIsOpen,
        displayContactModalIsOpen,
        contactsList,
        // preferenceOfContact,
      } = this.state;
      // console.log('addContactModalIsOpen :', addContactModalIsOpen);
      return (
        <div>
          {contactsList.map(e => (
            <p key={e.id}>
              <Button onClick={this.handleClickOpen('displayContactModalIsOpen')}>
                {e.title} {e.firstName} {e.lastName}
              </Button>
            </p>))}
          <ContactButton handleClickOpen={this.handleClickOpen('addContactModalIsOpen')} />
          <AddContactModal
            handleClose={this.handleClose('addContactModalIsOpen')}
            handleValidation={this.handleValidation}
            addContactModalIsOpen={addContactModalIsOpen}
            // preferenceOfContact={preferenceOfContact}
            // handlePreferenceOfContact={this.handlePreferenceOfContact}
          />
          <DisplayContactModal
            contactsList={contactsList}
            displayContactModalIsOpen={displayContactModalIsOpen}
            handleClose={this.handleClose}
            handleValidation={this.handleValidation}
          />
        </div>
      );
    }
}

Contact.propTypes = {
  title: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  preferenceOfContact: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

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
