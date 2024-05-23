import React, { MouseEventHandler, useEffect } from 'react';

interface IPreloadImageProps {
    src: string,
    id?: string,
    onClick?: Function | ((this: GlobalEventHandlers, ev: MouseEvent) => any),
    className?: string,
    alt?: string,
    animationSpeed?: number
}

export const PreloadImage: React.FC<IPreloadImageProps> = (props: IPreloadImageProps)  => {
    
    const preloadImage = (imgSrc: string) => {
        let img = new Image();
        img.src = imgSrc;
        img.setAttribute('data-testid', imgSrc);
        img.alt = props?.alt || 'preloaded-img';
        if (props?.onClick) {
            img.onclick = props.onClick as ((this: GlobalEventHandlers, ev: MouseEvent) => any);
        }
        if (props?.id) {
            img.id = props.id;
        }
        if (props?.className) {
            img.className = props.className;
        }
        if (props?.animationSpeed) {
            img.style.animationDuration = `${props.animationSpeed + 1}s`;
        }
        else {
            img.style.animationDuration = '3s';
        }
      }

    useEffect(() => {
        preloadImage(props.src);
    });

    return (
        <></>
    );
}