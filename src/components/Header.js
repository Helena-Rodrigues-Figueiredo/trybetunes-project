import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
    state = {
      isLoading: true,
      userName: '',
    }

    componentDidMount() {
      this.exhibitName();
    }

    exhibitName = () => {
      getUser().then(({ name }) => {
        this.setState({
          userName: name, isLoading: false });
      });
    }

    render() {
      const { isLoading, userName } = this.state;
      return (
        <>
          <div id="header">
            { isLoading
              ? <Loading /> : (
                <header data-testid="header-component">
                  <div data-testid="header-user-name">
                    <span>TrybeTunes</span>
                    <span id="userName">{ `Olá, ${userName}` }</span>
                  </div>
                </header>
              ) }
          </div>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Pesquisar</Link>
        </>
      );
    }
}

export default Header;
