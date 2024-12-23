export class Tracklist {
  currentTrack: Record<string, any> | null = $state(null);
  queueTrack: Record<string, any>[] = $state([]);
  isPlaying = $state(false);

  setCurrentTrack = (track: Record<string, any>) => {
    this.currentTrack = track;
    this.isPlaying = true;
  };

  togglePlayPause = () => {
    this.isPlaying = !this.isPlaying;
  };

  pause = () => {
    this.isPlaying = false;
  };

  addTrackToQueue = (track: Record<string, any>) => {
    this.queueTrack.push(track);
    this.playQueueTrack();
  };

  playQueueTrack = () => {
    if (this.queueTrack.length > 0) {
      this.setCurrentTrack(this.queueTrack[0]);
      this.queueTrack.splice(0);
    }
  };
}
