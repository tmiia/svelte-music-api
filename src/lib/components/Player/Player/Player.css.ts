import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container:
      'z-50 fixed bottom-0 left-0 bg-slate-950/95 w-full py-2 px-4 grid grid-cols-6 gap-x-2 lg:grid-cols-8 lg:gap-x-3 items-center text-white',
    playerInfo: 'col-span-2',
    playerTimeline: 'w-full',
    main: 'col-span-3 col-start-3 lg:col-span-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4 w-full',
    additionalActions: 'col-span-1 col-start-6 lg:col-span-2 lg:col-start-7 flex gap-x-2',
    audioPlayer: 'hidden'
  }
});
