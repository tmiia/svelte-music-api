/**
 * Represents a track from the Deezer API
 * @see https://developers.deezer.com/api/track
 */
export interface Track {
  id: number;
  title: string;
  duration: number;
  /** URL to the 30-second preview */
  preview: string;

  album: {
    id: number;
    title: string;
    cover: string;
    cover_big: string;
    cover_small: string;
  };

  artist: {
    id: number;
    name: string;
    picture_medium: string;
    nb_fan: number;
  };

  link?: string;
  rank?: number;
  explicit_lyrics?: boolean;
}

/**
 * Manages the play / pause state and track queue for the audio player
 */
export class AudioManager {
  public queueTrack: Track[] = $state([]);
  public currentIndex: number = $state(0);
  public currentTrack: Track | null = $derived(this.queueTrack[this.currentIndex] ?? null);
  public isPlaying = $state(false);

  /**
   * Sets the current track and play it
   * @param track - The track to play
   * @throws Error if track is invalid or missing required properties
   */
  public setCurrentTrack = (track: Track) => {
    if (!track?.id || !track?.preview) {
      throw new Error('Invalid track: missing required properties');
    }

    this.currentIndex = this.queueTrack.length
    this.isPlaying = true;
    this.addTrackToQueue(track)
  };

  /**
   * Toggles between play and pause states
   */
  public togglePlayPause = () => {
    this.isPlaying = !this.isPlaying;
  };

  /**
   * Change the states of isPlaying to false
   */
  public pause = () => {
    this.isPlaying = false;
  };

  /**
   * Adds a track to the queue list if not already present
   * @param track - The track to add
   */
  public addTrackToQueue = (track: Track) => {
    const isTrackInQueue = this.queueTrack.some(
      (existingTrack) => existingTrack.id === track.id
    );

    if (!isTrackInQueue) {
      this.queueTrack.push(track);
    }
  };

  /**
   * Play the previous track.
   */
  public playPrevTrack = () => {
    if (this.currentIndex - 1 >= 0 ) {
      this.currentIndex -= 1
    }
  };

  /**
   * Play the next track.
   */
  public playNextTrack = () => {
    if (this.currentIndex + 1 < this.queueTrack.length) {
      this.currentIndex += 1
    }
  };
}


export const audioManager = new AudioManager();
