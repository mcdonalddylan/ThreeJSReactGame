import react, { useRef, useEffect } from 'react';
import loadImg from '../../assets/loadingImages/cc0youtubeload.gif';

interface LazyImageProps {
    src: string,
    style?: react.CSSProperties,
    className?: string,
    alt?: string
}

export const LazyImage = (props: LazyImageProps) => {
    const imgRef = useRef<any>();

    useEffect(() => {
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
        observer.observe(imgRef.current as Element);
    }, []);
    
    return ( <img ref={imgRef}
                  src={loadImg}
                  data-src={props.src}
                  alt={props?.alt}
                  style={props?.style}
                  className={props?.className}
                  loading='lazy'></img>);
}
