import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
// import ContactModale from './ContactModale';
import ContactModal2 from './ContactModal2';
import ContactButton from './ContactButton';
// import { reduxForm } from 'redux-form';

class Contact extends Component {
    state = {
      modalIsOpen: false,
      contactsList: [],
      category: '',
      preferenceOfContact: 'SMS',
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
        preferenceOfContact,
      } = this.state;
      const {
        firstName,
        lastName,
      } = this.props;
      const contact = {
        firstName,
        lastName,
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
      console.log('The firstname is : ', firstName);
      console.log('The lastname is : ', lastName);
      console.log('The category is : ', category);
      console.log('The comPreference is : ', preferenceOfContact);
      this.handleClose();
    };

    handleCategory = (e) => {
      this.setState({ category: e.target.value });
    };

    handlePreferenceOfContact = (e) => {
      this.setState({ preferenceOfContact: e.target.value });
      console.log('handleCommunication: ');
    };

    render() {
      const {
        modalIsOpen,
        contactsList,
        category,
        preferenceOfContact,
      } = this.state;
      console.log('modalIsOpen :', modalIsOpen);
      return (
        <div>
          {contactsList.map(e => (
            <p key={e.id}>
              {e.firstName} {e.lastName}
            </p>))}
          <ContactButton handleClickOpen={this.handleClickOpen} />
          <ContactModal2
            handleClose={this.handleClose}
            handleValidation={this.handleValidation}
            modalIsOpen={modalIsOpen}
            category={category}
            handleCategory={this.handleCategory}
            preferenceOfContact={preferenceOfContact}
            handlePreferenceOfContact={this.handlePreferenceOfContact}
          />
        </div>
      );
    }
}

Contact.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  // formValueSelector allows to get fields in ContactModal named firstName
  firstName: formValueSelector('ContactModal2')(state, 'firstName'),
  lastName: formValueSelector('ContactModal2')(state, 'lastName'),
});

export default connect(mapStateToProps, null)(Contact);
