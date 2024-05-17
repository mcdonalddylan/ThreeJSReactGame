/**
 * loadLazyImagesFromObserver() - Lazy image loading 
 * @param observer 
 * @param querySelectorString 
 */
export const loadLazyImagesFromObserver = (querySelectorString: string): void => {
    document.addEventListener("DOMContentLoaded", () => {
        const lazyImages = [].slice.call(document.querySelectorAll(querySelectorString));;

        if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
          const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const lazyImage = entry.target;
                const src = lazyImage.getAttribute('data-src');

                lazyImage.setAttribute('src', src || '');
                lazyImage.classList.add('fade-in-img');

                lazyImageObserver.unobserve(lazyImage);
                observer.disconnect();
              }
            });
          });
      
          lazyImages.forEach((lazyImage) => {
            lazyImageObserver.observe(lazyImage);
          });
        }
      });
}