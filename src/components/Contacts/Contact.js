import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ContactModal from './ContactModal';
import ContactButton from './ContactButton';
// import { reduxForm } from 'redux-form';

class Contact extends Component {
    state = {
      addContactModalIsOpen: false,
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

    handleClose = () => {
      this.setState({ addContactModalIsOpen: false });
    };

    handleValidation = () => {
      const {
        contactsList,
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
      this.handleClose();
    };

    // handlePreferenceOfContact = (e) => {
    //   this.setState({ preferenceOfContact: e.target.value });
    //   console.log('handleCommunication: ');
    // };

    render() {
      const {
        addContactModalIsOpen,
        contactsList,
        // preferenceOfContact,
      } = this.state;
      // console.log('addContactModalIsOpen :', addContactModalIsOpen);
      return (
        <div>
          {contactsList.map(e => (
            <p key={e.id}>
              <Button onClick={this.handleClickOpen('addContactModalIsOpen')}>
                {e.title} {e.firstName} {e.lastName}
              </Button>
            </p>))}
          <ContactButton handleClickOpen={this.handleClickOpen('addContactModalIsOpen')} />
          <ContactModal
            handleClose={this.handleClose}
            handleValidation={this.handleValidation}
            addContactModalIsOpen={addContactModalIsOpen}
            handleCategory={this.handleCategory}
            // preferenceOfContact={preferenceOfContact}
            // handlePreferenceOfContact={this.handlePreferenceOfContact}
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
  // formValueSelector allows to get fields in ContactModal named firstName
  title: formValueSelector('ContactModal')(state, 'title'),
  firstName: formValueSelector('ContactModal')(state, 'firstName'),
  lastName: formValueSelector('ContactModal')(state, 'lastName'),
  category: formValueSelector('ContactModal')(state, 'category'),
  email: formValueSelector('ContactModal')(state, 'email'),
  phone: formValueSelector('ContactModal')(state, 'phone'),
  preferenceOfContact: formValueSelector('ContactModal')(state, 'preferenceOfContact'),
  comment: formValueSelector('ContactModal')(state, 'comment'),
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, null)(Contact);
