import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative min-w-[10rem] rounded-3xl overflow-hidden',
    cover: 'w-full h-full aspect-[7/8] object-cover',
    info: 'absolute z-50 bottom-0 left-0 p-6 flex gap-1 items-center justify-between w-full text-white',
    artistInfo: 'flex flex-col gap-0.25',
    artistName: 'font-thin text-sm opacity-85',
    artistFan: 'font-semibold text-xl',
    layer: 'absolute z-10 top-0 left-0 w-full h-full bg-slate-900 opacity-45'
  }
});
