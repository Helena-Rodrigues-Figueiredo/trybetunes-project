import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import dancingPeople from '../images/peopleDancing.webp';
import dancingPerson from '../images/Music_Flatline.svg';
import '../styles/Login.css';

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
    const { isButtonDisabled, inputLenght, isLoading } = this.state;
    return isLoading ? <Loading /> : (
      <>
        <h1 id="login-trybetunes" className="login-title">TrybeTunes</h1>
        <div data-testid="page-login" id="login-page">
          <img src={ dancingPerson } alt="person dancing" width={ 300 } />
          <label htmlFor="login-input">
            <input
              id="login-input"
              data-testid="login-name-input"
              placeholder="Nome"
              type="text"
              name="inputName"
              onChange={ this.valueInput }
              value={ inputLenght }
              autoComplete="off"
            />
          </label>
          <button
            id="login-button"
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.saveName }
          >
            Entrar
          </button>
          <img
            src={ dancingPeople }
            alt="person dancing"
            width={ 250 }
            id="dancing-people-img"
          />
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
