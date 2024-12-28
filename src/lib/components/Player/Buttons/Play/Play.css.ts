import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    btn: 'rounded-full bg-transparentBlack/35 p-3 flex items-center justify-center hover:bg-transparentBlack/30 transition-color duration-300 disabled:cursor-no-drop'
  }
});
