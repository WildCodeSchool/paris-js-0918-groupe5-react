import React, { Component } from 'react';
import axios from 'axios';
// import ContactModale from './ContactModale';
import ContactModal2 from './ContactModal2';
import ContactButton from './ContactButton';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class Contact extends Component {
    state = {
      modalIsOpen: false,
      contactsList: [],
      firstName: '',
      lastName: '',
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
        firstName,
        lastName,
        category,
        preferenceOfContact,
      } = this.state;
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

    handleChangeFirstName = (e) => {
      this.setState({ firstName: e.target.value });
    };

    handleChangeLastName = (e) => {
      this.setState({ lastName: e.target.value });
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
        firstName,
        lastName,
        category,
        preferenceOfContact,
      } = this.state;
      console.log('modalIsOpen :', modalIsOpen);
      return (
        <div>
          {contactsList.map(e => <p key={e.id}>{e.firstName}</p>)}
          <ContactButton handleClickOpen={this.handleClickOpen} />
          <ContactModal2
            handleClose={this.handleClose}
            handleValidation={this.handleValidation}
            modalIsOpen={modalIsOpen}
            firstName={firstName}
            handleChangeFirstName={this.handleChangeFirstName}
            lastName={lastName}
            handleChangeLastName={this.handleChangeLastName}
            category={category}
            handleCategory={this.handleCategory}
            preferenceOfContact={preferenceOfContact}
            handlePreferenceOfContact={this.handlePreferenceOfContact}
          />
        </div>
      );
    }
}

export default (Contact);
