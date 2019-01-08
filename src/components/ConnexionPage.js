import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ConnexionPage extends Component {
  state = {
    redirect: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    axios.post('http://localhost:4244/auth/signin', {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      localStorage.setItem('token', res.headers['x-access-token']);
      console.log('token', localStorage.getItem('token'));
      this.setState({ redirect: true });
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
          ConnexionPage
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
        </form>
      </div>
    );
  }
}

export default ConnexionPage;