import React from 'react';
import axios from 'axios';


class ResetPassword extends React.Component {
  state ={
    password: '',
    passwordVerify: '',
    // passwordToSend: '',
  }

  recordPassword = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

changePassword = () => {
  const { password, passwordVerify } = this.state;
  const token = req.params.token;
  console.log('-------------------', token);
  if (password === passwordVerify){
		
  axios({
    method: 'PUT',
    url: `${getServerAuthority()}/auth/resetPassword`,
    headers: {
				Authorization: `Bearer ${token}`,
			},
			data: password,
  })
			.then((res) => {
				console.log(res.data);
			});
		}
	}

    render() {
			console.log(this.state.passwordVerify)
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
