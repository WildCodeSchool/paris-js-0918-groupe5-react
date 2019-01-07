import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import ContactModal from './ContactModal';
import ContactButton from './ContactButton';
// import { reduxForm } from 'redux-form';

class Contact extends Component {
    state = {
      modalIsOpen: false,
      contactsList: [],
      category: '',
      // preferenceOfContact: 'SMS',
    }

    // loading the contacts list
    componentDidMount() {
      axios.get('http://localhost:4243/contacts')
        .then(console.log('componentdidmount !'))
        .then(res => this.setState({
          contactsList: res.data,
        }));
    }

    handleClickOpen = () => {
      this.setState({ modalIsOpen: true });
    };

    handleClose = () => {
      this.setState({ modalIsOpen: false });
    };

    handleValidation = () => {
      const {
        contactsList,
        category,
        // preferenceOfContact,
      } = this.state;
      const {
        title,
        firstName,
        lastName,
        email,
        phone,
        comment,
        preferenceOfContact,
      } = this.props;
      const contact = {
        title,
        firstName,
        lastName,
        email,
        phone,
        comment,
        preferenceOfContact,
        category,
      };
      // posting the infos on the database
      axios.post('http://localhost:4243/contacts', contact)
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

    handleCategory = (e) => {
      this.setState({ category: e.target.value });
    };

    // handlePreferenceOfContact = (e) => {
    //   this.setState({ preferenceOfContact: e.target.value });
    //   console.log('handleCommunication: ');
    // };

    render() {
      const {
        modalIsOpen,
        contactsList,
        category,
        // preferenceOfContact,
      } = this.state;
      // console.log('modalIsOpen :', modalIsOpen);
      return (
        <div>
          {contactsList.map(e => (
            <p key={e.id}>
              {e.title} {e.firstName} {e.lastName} {e.email} {e.phone} {e.preferenceOfContact} {e.comment}
            </p>))}
          <ContactButton handleClickOpen={this.handleClickOpen} />
          <ContactModal
            handleClose={this.handleClose}
            handleValidation={this.handleValidation}
            modalIsOpen={modalIsOpen}
            category={category}
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
  email: formValueSelector('ContactModal')(state, 'email'),
  phone: formValueSelector('ContactModal')(state, 'phone'),
  preferenceOfContact: formValueSelector('ContactModal')(state, 'preferenceOfContact'),
  comment: formValueSelector('ContactModal')(state, 'comment'),
});

// connect permet de connecter ton composant au store (actions, store ....)
export default connect(mapStateToProps, null)(Contact);
