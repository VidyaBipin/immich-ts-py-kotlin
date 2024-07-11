let observer: ResizeObserver;

let callbacks: WeakMap<Element, (element: Element) => void>;

/**
 * Installs a resizeObserver on the given element - when the element changes size, invokes a callback
 * function with the width/height. Intended as a replacement for bind:clientWidth and
 * bind:clientHeight in svelte4 which use an iframe to measure the size of the element, which can be
 * bad for performance and memory usage. In svelte5, they adapted bind:clientHeight and
 * bind:clientWidth to use an internal resize observer.
 *
 * TODO: When svelte5 is ready, go back to bind:clientWidth and bind:clientHeight.
 */
export function resizeObserver(element: Element, onResize: (element: Element) => void) {
  if (!observer) {
    callbacks = new WeakMap();
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const onResize = callbacks.get(entry.target);
        if (onResize) {
          onResize(entry.target);
        }
      }
    });
  }

  callbacks.set(element, onResize);
  observer.observe(element);

  return {
    destroy: () => {
      callbacks.delete(element);
      observer.unobserve(element);
    },
  };
}
