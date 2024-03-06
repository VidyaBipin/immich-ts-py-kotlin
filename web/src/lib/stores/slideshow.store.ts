import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export enum SlideshowState {
  PlaySlideshow = 'play-slideshow',
  StopSlideshow = 'stop-slideshow',
  None = 'none',
}

export enum SlideshowNavigation {
  Shuffle = 'shuffle',
  AscendingOrder = 'ascending-order',
  DescendingOrder = 'descending-order',
}

function createSlideshowStore() {
  const restartState = writable<boolean>(false);
  const stopState = writable<boolean>(false);

  const slideshowNavigation = persisted<SlideshowNavigation>(
    'slideshow-navigation',
    SlideshowNavigation.DescendingOrder,
  );
  const slideshowState = writable<SlideshowState>(SlideshowState.None);

  const showProgressBar = persisted<boolean>('slideshow-show-progressbar', true);
  const slideshowDelay = persisted<number>('slideshow-delay', 5, {});

  return {
    restartProgress: {
      subscribe: restartState.subscribe,
      set: (value: boolean) => {
        // Trigger an action whenever the restartProgress is set to true. Automatically
        // reset the restart state after that
        if (value) {
          restartState.set(true);
          restartState.set(false);
        }
      },
    },
    stopProgress: {
      subscribe: stopState.subscribe,
      set: (value: boolean) => {
        // Trigger an action whenever the stopProgress is set to true. Automatically
        // reset the stop state after that
        if (value) {
          stopState.set(true);
          stopState.set(false);
        }
      },
    },
    slideshowNavigation,
    slideshowState,
    slideshowDelay,
    showProgressBar,
  };
}

export const slideshowStore = createSlideshowStore();
