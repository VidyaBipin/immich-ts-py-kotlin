<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let once = false;
  export let top = '0px';
  export let bottom = '0px';
  export let left = '0px';
  export let right = '0px';
  export let root: HTMLElement | null = null;

  export let intersecting = false;
  let container: HTMLDivElement;
  const dispatch = createEventDispatcher<{
    hidden: HTMLDivElement;
    intersected: {
      container: HTMLDivElement;
    };
  }>();

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = `${top} ${right} ${bottom} ${left}`;

      const observer = new IntersectionObserver(
        (entries) => {
          // If the body of the IntersectionObserver component has multiple nodes, there
          // will be an entry for each of them in entries, look for the entry that is actually
          // intersecting.
          const intersectingEntry = entries.find((entry) => entry.isIntersecting);
          intersecting = intersectingEntry ? true : false;
          if (!intersectingEntry) {
            dispatch('hidden', container);
          }

          if (intersectingEntry && once) {
            observer.unobserve(container);
          }

          if (intersectingEntry) {
            dispatch('intersected', {
              container,
            });
          }
        },
        {
          rootMargin,
          root,
        },
      );

      observer.observe(container);
      return () => observer.unobserve(container);
    }
  });
</script>

<div bind:this={container}>
  <slot {intersecting} />
</div>
