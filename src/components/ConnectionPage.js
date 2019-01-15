import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import getServerAuthority from '../config/getServerAuthority';
import { displayAppBar } from '../actions/displayActions';
import CaregiversForm from './Caregiver/CaregiverForm';

class ConnectionPage extends Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const { displayAppBar } = this.props;
    displayAppBar(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    axios.post(`${getServerAuthority()}/auth/signin`, {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      const { displayAppBar } = this.props;
      localStorage.setItem('token', res.headers['x-access-token']);
      console.log('token', localStorage.getItem('token'));
      this.setState({ redirect: true }, displayAppBar(true));
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/tableau_de_bord" />
      );
    }
    return (
      <div>
          Connexion Page
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Mail:
            <input id="email" type="email" name="email" />
          </label>
          <label htmlFor="password">
            Mot de passe:
            <input type="password" name="password" />
          </label>
          <button type="submit">Valider</button>
          <CaregiversForm />
        </form>
      </div>
    );
  }
}

ConnectionPage.propTypes = {
  displayAppBar: PropTypes.func.isRequired,
};

export default connect(null, { displayAppBar })(ConnectionPage);
