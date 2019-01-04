import React from 'react';
import axios from 'axios';

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.mail.value, e.target.password.value);
  axios.post('http://localhost:4243/auth/connexion', {
    mail: e.target.mail.value,
    password: e.target.password.value,
  }).then(res => {
    localStorage.setItem('token', res.headers['x-access-token']);
    console.log('token', localStorage.getItem('token'));
  });
};

const ConnexionPage = () => {
  return (
    <div>
        ConnexionPage
      <form onSubmit={handleSubmit}>
        <label for="mail">Mail: </label>
        <input type="email" name="mail"/>
        <label for="password">Mot de passe: </label>
        <input type="password" name="password"/>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default ConnexionPage;
