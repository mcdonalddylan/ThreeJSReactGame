import react, { useRef, useEffect, MouseEventHandler } from 'react';
import loadImg from '../../assets/loadingImages/cc0youtubeload.gif';
import { generateLazyImageObserver } from '../../utils/internalPageUtils/internalPageUtils';

interface LazyImageProps {
    src: string,
    id?: string,
    onClick?: Function | MouseEventHandler<HTMLImageElement>,
    style?: react.CSSProperties,
    className?: string,
    alt?: string
}

export const LazyImage = (props: LazyImageProps) => {
    const imgRef = useRef<any>();

    useEffect(() => {
        const observer = generateLazyImageObserver();
        observer.observe(imgRef.current as Element);
    }, []);
    
    return ( <img ref={imgRef}
                  id={props?.id}
                  src={loadImg}
                  data-src={props.src}
                  alt={props?.alt}
                  style={props?.style}
                  className={props?.className}
                  loading='lazy'
                  data-testid={props.src}
                  onClick={props?.onClick as MouseEventHandler}></img>);
}
