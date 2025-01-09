import axios from 'axios';

const playlistUrl = 'https://api.deezer.com/playlist/13283495863'
const artistUrlBase = 'https://api.deezer.com/artist/'

async function getData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error during data extraction', error);
    return null;
  }
}

export async function load() {
  const artistsId: number[] = [];
  const artists: any[] = [];

  const playlist = await getData(playlistUrl);

  if (!playlist) {
    return { playlist: null, artists: [] };
  }


  for (const track of playlist.tracks.data) {
    const artistId = track.artist.id;

    if (!artistsId.includes(artistId)) {
      artistsId.push(artistId);

      let url = `${artistUrlBase}${artistId}`

      const artistData = await getData(url);
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
