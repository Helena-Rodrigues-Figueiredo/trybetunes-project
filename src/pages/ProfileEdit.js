import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
state = {
  isLoading: true,
  userData: null,
  editData: {
    name: '',
    email: '',
    description: '',
  },
}

componentDidMount = async () => {
  const result = await getUser();
  this.setState({
    userData: result,
  });
}

render() {
  return (
    <div data-testid="page-profile-edit">
      <Header />
      <form>
        <label htmlFor="nome">
          Nome
          <input type="text" data-testid="edit-input-name" placeholder="nome" id="nome" />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            data-testid="edit-input-email"
            placeholder="email"
            id="nome"
          />
        </label>
        <label htmlFor="descricao">
          Descrição
          <textarea
            type="text"
            data-testid="edit-input-name"
            placeholder="Escreva sobre você"
            id="descricao"
          />
        </label>
        <label htmlFor="image">
          Alterar imagem
          <input
            type="file"
            data-testid="edit-input-image"
            placeholder="imagem"
            id="image"
          />
        </label>
        <button type="button" data-testid="edit-button-save">
          Salvar
        </button>
      </form>
    </div>
  );
}
}

export default ProfileEdit;
