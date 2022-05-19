import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    inputArtistLenght: '',
  }

  valueInputArtist = (event) => {
    const { value } = event.target;
    this.setState({ inputArtistLenght: value }, this.buttonArtistState);
  }

  buttonArtistState = () => {
    const { inputArtistLenght } = this.state;
    const caracteresInput = 2;
    if (inputArtistLenght.length >= caracteresInput) {
      return this.setState(() => ({ isButtonDisabled: false }));
    }
    return this.setState(() => ({ isButtonDisabled: true }));
  }

  render() {
    const { inputArtistLenght, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.valueInputArtist }
            value={ inputArtistLenght }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
