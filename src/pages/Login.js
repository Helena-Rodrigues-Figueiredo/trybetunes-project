import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    inputLenght: '',
    isLoading: false,
  }

  valueInput = (event) => {
    const { value } = event.target;
    this.setState({ inputLenght: value }, this.buttonState);
  }

  buttonState = () => {
    const { inputLenght } = this.state;
    const caracteresInput = 3;
    if (inputLenght.length >= caracteresInput) {
      return this.setState(() => ({ isButtonDisabled: false }));
    }
    return this.setState(() => ({ isButtonDisabled: true }));
  }

  saveName = () => {
    const { inputLenght } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: inputLenght });
      history.push('/search');
    });
  }

  render() {
    console.log(this.props);
    const { isButtonDisabled, inputLenght, isLoading } = this.state;
    return isLoading ? <Loading /> : (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          placeholder="Nome"
          type="text"
          name="inputName"
          onChange={ this.valueInput }
          value={ inputLenght }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
          onClick={ this.saveName }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
