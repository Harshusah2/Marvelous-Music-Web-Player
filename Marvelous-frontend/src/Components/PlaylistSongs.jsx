import React from 'react'

const PlaylistSongs = ({ playlistName, songs }) => {
  return (
    <div>
       <h2>{playlistName}</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <p>{song.name}</p>
            <button onClick={() => handlePlaySong(song)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlaylistSongs
