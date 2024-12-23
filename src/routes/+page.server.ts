import axios from 'axios';

async function getPlaylistData() {
  try {
    const response = await axios.get('https://api.deezer.com/playlist/13283495863');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return null;
  }
}

async function getArtistData(id: number) {
  try {
    const response = await axios.get(`https://api.deezer.com/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données de l'artiste ${id}:`, error);
    return null;
  }
}

export async function load() {
  const artistsId: number[] = [];
  const artists: any[] = [];

  const playlist = await getPlaylistData();

  if (!playlist) {
    return { playlist: null, artists: [] };
  }


  for (const track of playlist.tracks.data) {
    const artistId = track.artist.id;

    if (!artistsId.includes(artistId)) {
      artistsId.push(artistId);

      const artistData = await getArtistData(artistId);
      if (artistData) {
        artists.push(artistData);
      }
    }
  }

  return {
    playlist,
    artists,
  };
}
