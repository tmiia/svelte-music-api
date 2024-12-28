import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    btn: 'flex items-center justify-center hover:rounded-full hover:bg-transparentBlack/10 p-2 transition-all duration-300 disabled:cursor-no-drop'
  }
});
