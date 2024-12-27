import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex items-center justify-end gap-x-2',
    listBtn: 'relative',
    dot: 'absolute -right-2 -top-2 p-0.5 px-1.5 text-xs font-light bg-violet-800/65 rounded-full'
  }
});
