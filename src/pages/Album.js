import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musicas: [],
    artistName: '',
    albumName: '',
    image: '',
    isLoading: false,
    checked: [],
  }

  componentDidMount = () => {
    this.listOfMusics();
  }

  listOfMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    const excludesFirstElement = musics.filter((track) => track.trackId);
    const name = musics[0].artistName;
    const album = musics[0].collectionName;
    const imageAlbum = musics[0].artworkUrl100;
    this.setState({
      musicas: excludesFirstElement,
      artistName: name,
      albumName: album,
      image: imageAlbum,
    });
  }

  favoriteSong = async (event) => {
    const { musicas } = this.state;
    const trackIdChecked = event.target.attributes.trackId.value;
    const stringToNumber = parseInt(trackIdChecked, 10);
    const objectTrackId = musicas.filter((track) => track.trackId === stringToNumber);
    this.setState({
      isLoading: true,
    });
    await addSong(objectTrackId);
    this.setState((prevState) => ({
      isLoading: false,
      checked: [...prevState.checked, stringToNumber],
    }));
  }

  render() {
    const { musicas, artistName, albumName, image, isLoading, checked } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <br />
        <img src={ image } alt={ albumName } />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{ albumName }</p>
        {isLoading ? <Loading /> : (
          musicas.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              key={ trackId }
              musicName={ trackName }
              player={ previewUrl }
              trackId={ trackId }
              onClick={ this.favoriteSong }
              checked={ checked.includes(trackId) }
            />
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};

export default Album;
