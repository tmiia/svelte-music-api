export class Tracklist {
  currentTrack: Record<string, any> | null = $state(null);
  queueTrack: Record<string, any>[] = $state([]);
  history: Record<string, any>[] = $state([]);
  isPlaying = $state(false);

  setCurrentTrack = (track: Record<string, any>) => {
    this.currentTrack = track;
    this.isPlaying = true;
    this.addTrackToHistory(track)
  };

  togglePlayPause = () => {
    this.isPlaying = !this.isPlaying;
  };

  pause = () => {
    this.isPlaying = false;
  };

  addTrackToQueue = (track: Record<string, any>) => {
    const isTrackInQueue = this.queueTrack.some(
      (existingTrack) => existingTrack.id === track.id
    );

    if (!isTrackInQueue) {
      this.queueTrack.push(track);
    }
  };

  addTrackToHistory = (track: Record<string, any>) => {
    const isTrackInHistory = this.history.some(
      (existingTrack) => existingTrack.id === track.id
    );

    if (!isTrackInHistory) {
      this.history.push(track);
    }
  };

  playQueueTrack = () => {
    if (this.queueTrack.length > 0) {
      this.setCurrentTrack(this.queueTrack[0]);
      this.queueTrack.shift();
    }
  };

  playHistoryTrack = () => { // TODO : fix how it work
    if (this.history.length > 0) {
      const lastTrack = this.history[this.history.length - 2];
      console.log(lastTrack);
      this.history.pop();
      this.history.unshift(lastTrack);
      this.setCurrentTrack(lastTrack);
    }
  };

}
