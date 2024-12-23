export class Tracklist {
  currentTrack: Record<string, any> | null = $state(null);

  setCurrentTrack = (track: Record<string, any>) => {
    this.currentTrack = track;
  };
}
