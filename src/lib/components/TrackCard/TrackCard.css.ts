import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container:
      'relative min-w-[18rem] lg:min-w-[22rem] rounded-3xl overflow-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-900 after:opacity-45',
    cover: 'w-full h-full aspect-[7/8] object-cover',
    info: 'absolute z-50 bottom-0 left-0 p-6 flex gap-1 items-center justify-between w-full text-white',
    artist: 'font-thin text-sm opacity-85',
    trackTitle: 'font-semibold text-xl',
    playBtn: 'absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    queueBtn: 'absolute z-10 top-[1rem] right-[1rem]'
  }
});
