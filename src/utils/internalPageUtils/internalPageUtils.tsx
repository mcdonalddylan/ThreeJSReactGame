
/**
 * generateLazyImageObserver() - Returns an interaction observer which will fade in any lazily loaded images
 */
export const generateLazyImageObserver = (): IntersectionObserver => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");

        img.setAttribute("src", src || '');
        img.classList.add("fade-in-img");

        observer.disconnect();
      }
    });
  });
  return observer;
}

/**
 * viewImg() - Displays the selected image on a new tab in full resolution
 * @param imageSrc 
 */
export const viewImg = (imageSrc: string) => {
  window.open(imageSrc, '_blank');
}
