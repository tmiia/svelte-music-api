export class Tracklist {
  currentTrack: Record<string, any> | null = $state(null);
  isPlaying = $state(false)

  setCurrentTrack = (track: Record<string, any>) => {
    this.currentTrack = track;
  };
}
