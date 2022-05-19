import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, player, trackId } = this.props;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ player } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <label htmlFor={ musicName }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ musicName }
            trackId={ trackId }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
