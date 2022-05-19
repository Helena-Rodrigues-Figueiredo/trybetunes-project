import React from 'react';
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
      const funcao = async () => {
        await getUser();
      };
      console.log(funcao);
      const { isLoading, userName } = this.state;
      return (
        isLoading ? <Loading /> : (
          <header data-testid="header-component">
            <div data-testid="header-user-name">
              <p>{ userName }</p>
            </div>
          </header>
        )
      );
    }
}

export default Header;
