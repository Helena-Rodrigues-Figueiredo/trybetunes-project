import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
state = {
  userData: null,
}

componentDidMount = async () => {
  const retornoApi = await getUser();
  this.setState({
    userData: retornoApi,
  });
}

render() {
  const { userData } = this.state;
  return (
    <>
      <div data-testid="page-profile">
        <Header />
      </div>
      { userData === null
        ? <Loading />
        : (
          <div>
            <img
              src={ userData.image }
              alt="foto-usuario"
              data-testid="profile-image"
            />
            <h1>{ userData.name }</h1>
            <p>{ userData.email }</p>
            <p>{ userData.description }</p>
          </div>
        )}
      <Link to="/profile/edit">Editar perfil</Link>
    </>
  );
}
}

export default Profile;
