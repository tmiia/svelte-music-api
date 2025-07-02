import axios from 'axios';

const playlistUrl = 'https://api.deezer.com/playlist/13283495863'
const artistUrlBase = 'https://api.deezer.com/artist/'
const axiosInstance = axios.create({
  timeout: 5000,
});

async function getData(url: string) {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error during data extraction', error);
    return null;
  }
}

export async function load() {
  const playlist = await getData(playlistUrl);

  if (!playlist) {
    return { playlist: null, artists: [] };
  }

  const uniqueArtistIds = Array.from(new Set(
    playlist.tracks.data.map((track: any) => track.artist.id as number)
  )).slice(0, 10) as number[];

  const artistPromises = uniqueArtistIds.map(async (artistId: number) => {
    const url = `${artistUrlBase}${artistId}`;
    return await getData(url);
  });

  const artistsResults = await Promise.all(artistPromises);

  const artists = artistsResults.filter(artist => artist !== null);

  return {
    playlist,
    artists,
  };
}
