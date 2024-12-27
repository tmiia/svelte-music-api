import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex items-end lg:items-center space-x-2 lg:space-x-4',
    cover: 'rounded-xl',
    textContainer: 'overflow-hidden text-ellipsis whitespace-nowrap',
    title: 'font-medium text-base text-white/85',
    artist: 'font-light text-sm text-white/75'
  }
});
