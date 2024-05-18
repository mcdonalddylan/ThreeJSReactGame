
/**
 * viewImg() - Displays the selected image on a new tab in full resolution
 * @param imageSrc 
 */
export const viewImg = (imageSrc: string) => {
  window.open(imageSrc, '_blank');
}
