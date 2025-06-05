// utils/deviceDetection.ts
"use client";

export function getDeviceType() {
    // Safe check for browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return {
            isMac: false,
            isWindows: false,
            isHighRefreshRate: false,
            isHighPerformance: false
        };
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';

    // Multiple ways to detect Mac for better accuracy
    const isMac = /macintosh|mac os x|macintel/.test(userAgent) ||
        /mac|iphone|ipad|ipod/.test(platform) ||
        navigator.platform?.includes('Mac') || false;

    const isWindows = /windows|win32|win64/.test(userAgent) ||
        /win/.test(platform);

    const isHighRefreshRate = window.screen &&
        (window.screen.colorDepth > 24 ||
            window.devicePixelRatio > 1.5);

    return {
        isMac,
        isWindows,
        isHighRefreshRate,
        isHighPerformance: isMac || (window.devicePixelRatio > 1 && window.innerWidth > 1920)
    };
}

export function addDeviceSpecificStyles() {
    // Safe check for browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    const device = getDeviceType();


    const existingStyles = document.getElementById('device-specific-styles');
    if (existingStyles) {
        existingStyles.remove();
    }

    if (device.isMac) {
        const style = document.createElement('style');
        style.id = 'device-specific-styles';
        style.textContent = `
      /* MacBook Performance Optimization */
      .smooth-sections-container {
        will-change: auto !important;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      .smooth-section {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        perspective: 1000px;
        -webkit-perspective: 1000px;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
      
      /* Reduce hardware acceleration impact */
      .smooth-section * {
        will-change: auto;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
      
      /* Limit animation speeds on Mac */
      @media (prefers-reduced-motion: no-preference) {
        .smooth-sections-container * {
          animation-duration: 0.8s !important;
          transition-duration: 0.8s !important;
          animation-timing-function: ease-out !important;
          transition-timing-function: ease-out !important;
        }
      }
      
      /* Optimize scrolling */
      .smooth-sections-container {
        -webkit-overflow-scrolling: auto;
        scroll-behavior: auto;
      }
    `;


        try {
            document.head.appendChild(style);
            console.log('MacBook optimization styles applied');
        } catch (error) {
            console.warn('Could not apply device-specific styles:', error);
        }
    }
}

// Helper function to detect if running on high-performance Mac
export function isHighPerformanceMac() {
    const device = getDeviceType();
    return device.isMac && (
        window.devicePixelRatio >= 2 ||
        window.innerWidth >= 1920 ||
        navigator.hardwareConcurrency >= 8
    );
}