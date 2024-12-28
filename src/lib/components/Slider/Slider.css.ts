import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    slider: 'w-full overflow-scroll',
    sliderItems: 'w-fit flex gap-6 shrink-0'
  }
});
