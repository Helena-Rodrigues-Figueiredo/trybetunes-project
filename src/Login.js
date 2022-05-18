import React from 'react';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    inputLenght: '',
  }

  // changeButtonState = () => {
  //   if(inputLenght > 3) {
  //     this.
  //   }
  // }

  render() {
    const { isButtonDisabled, inputLenght } = this.state;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          placeholder="Nome"
          type="text"
          nome="inputName"
          value={ inputLenght }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
