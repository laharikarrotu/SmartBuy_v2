import React, { useState, useEffect } from 'react';
import { imageStats } from './ImageWithFallback';
import './ImageLoadMonitor.scss';

interface ImageLoadMonitorProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showOnlyOnDev?: boolean;
}

/**
 * A component that displays image loading statistics to help diagnose
 * image loading issues across the application.
 */
const ImageLoadMonitor: React.FC<ImageLoadMonitorProps> = ({
  position = 'bottom-right',
  showOnlyOnDev = true
}) => {
  const [stats, setStats] = useState({
    success: imageStats.success,
    failures: imageStats.failures,
    rate: imageStats.getSuccessRate()
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Don't show in production unless explicitly enabled
  if (showOnlyOnDev && process.env.NODE_ENV === 'production') {
    return null;
  }

  useEffect(() => {
    // Update stats every second
    const timer = setInterval(() => {
      setStats({
        success: imageStats.success,
        failures: imageStats.failures,
        rate: imageStats.getSuccessRate()
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`image-load-monitor ${position} ${isMinimized ? 'minimized' : ''}`}>
      {!isMinimized ? (
        <>
          <div className="monitor-header">
            <h3>Image Load Monitor</h3>
            <div className="monitor-controls">
              <button 
                onClick={() => setIsMinimized(true)}
                className="minimize-btn"
                title="Minimize"
              >
                −
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="close-btn"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>
          <div className="monitor-body">
            <div className="stat-row">
              <span className="stat-label">Success:</span>
              <span className="stat-value success">{stats.success}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Failures:</span>
              <span className="stat-value failures">{stats.failures}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Success Rate:</span>
              <span className={`stat-value rate ${stats.rate < 90 ? 'warning' : ''}`}>
                {stats.rate}%
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="minimized-view" onClick={() => setIsMinimized(false)}>
          <span className={`rate-indicator ${stats.rate < 90 ? 'warning' : ''}`}>
            {stats.rate}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageLoadMonitor; 