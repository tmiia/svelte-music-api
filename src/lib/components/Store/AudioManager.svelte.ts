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
  public currentTrack: Track | null = $state(null);
  public queueTrack: Track[] = $state([]);
  /** Previously played tracks */
  public history: Track[] = $state([]);

  public isPlaying = $state(false);

  /** Maximum number of tracks to keep in history */
  private readonly MAX_HISTORY_SIZE = 50;

  /**
   * Sets the current track and play it
   * @param track - The track to play
   * @throws Error if track is invalid or missing required properties
   */
  public setCurrentTrack = (track: Track) => {
    if (!track?.id || !track?.preview) {
      throw new Error('Invalid track: missing required properties');
    }

    this.currentTrack = track;
    this.isPlaying = true;
    this.addTrackToHistory(track)
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
   * Adds a track to the history list if not already present
   * @param track - The track to add
   */
  public addTrackToHistory = (track: Track) => {
    const isTrackInHistory = this.history.some(
      (existingTrack) => existingTrack.id === track.id
    );

    if (!isTrackInHistory) {
      this.history.push(track);
    }
  };

  /**
   * Play the first track of the queue list
   */
  public playQueueTrack = () => {
    if (this.queueTrack.length > 0) {
      this.setCurrentTrack(this.queueTrack[0]);
      this.queueTrack.shift();
    }
  };

  /**
   * Play the last track of the history list
   */
  public playHistoryTrack = () => { // TODO : fix how it work
    if (this.history.length > 0) {
      const lastTrack = this.history[this.history.length - 2];
      console.log(lastTrack);
      this.history.pop();
      this.history.unshift(lastTrack);
      this.setCurrentTrack(lastTrack);
    }
  };

}


export const audioManager = new AudioManager();
