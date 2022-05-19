import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  state = {
    musicas: [],
    artistName: '',
    albumName: '',
    image: '',
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

  render() {
    const { musicas, artistName, albumName, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <br />
        <img src={ image } alt={ albumName } />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{ albumName }</p>
        {musicas.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackId }
            musicName={ trackName }
            player={ previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};

export default Album;
