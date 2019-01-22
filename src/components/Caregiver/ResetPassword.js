import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import getServerAuthority from '../../config/getServerAuthority';

class ResetPassword extends React.Component {
  state ={
    password: '',
    passwordVerify: '',
    // passwordToSend: '',
  }

  recordPassword = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  changePassword = (e) => {
    e.preventDefault();
    const { password, passwordVerify } = this.state;
    const token = this.props.location.search.split('=')[1];
    console.log('-------------------', token);

    if (password === passwordVerify) {
      axios({
        method: 'PUT',
        url: `${getServerAuthority()}/auth/reset`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password },
      })
        .then((res) => {
          console.log('reeeeees', res);
        });
      return <Redirect to="/connexion" />;
    }
    alert('Les mots de passe ne correspondent pas, merci de rééssayer.')
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.changePassword}>
          <label>
          Mot de passe:
            <input type="password" name="password" onChange={this.recordPassword} />
          </label>
          <label>
          Vérification de mot de passe:
            <input type="password" name="passwordVerify" onChange={this.recordPassword} />
          </label>
          <button type="submit"> Valider </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
