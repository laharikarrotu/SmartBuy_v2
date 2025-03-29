import React, { useState, useEffect } from 'react';
import './ImageWithFallback.scss';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  onFallbackLoad?: () => void;
  enableMonitoring?: boolean;
}

// Global monitoring counter to track image loading performance
const imageStats = {
  success: 0,
  failures: 0,
  getSuccessRate: () => {
    const total = imageStats.success + imageStats.failures;
    return total > 0 ? Math.round((imageStats.success / total) * 100) : 100;
  }
};

/**
 * A reusable image component that automatically handles loading errors
 * by displaying a fallback image when the original source fails to load.
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder-product.svg',
  onFallbackLoad,
  enableMonitoring = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset the image source and error state when the src prop changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(src);
      setIsLoading(true);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
      
      if (enableMonitoring) {
        imageStats.failures++;
        console.warn(`Image failed to load: ${src}`);
        console.info(`Image loading success rate: ${imageStats.getSuccessRate()}%`);
      }
      
      if (onFallbackLoad) {
        onFallbackLoad();
      }
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    
    if (enableMonitoring && !hasError) {
      imageStats.success++;
    }
  };

  return (
    <div className={`image-with-fallback ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="image-loading-indicator"></div>}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
        className={`${props.className || ''} ${hasError ? 'fallback-image' : ''}`}
      />
    </div>
  );
};

// Export component and stats for monitoring
export { imageStats };
export default ImageWithFallback; 