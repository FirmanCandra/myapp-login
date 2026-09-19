import { useState, useRef, useEffect, useCallback } from 'react';
import {
  HiOutlineArrowRight,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlinePlay,
} from 'react-icons/hi';
import FinoraLogo from './FinoraLogo';
import './IntroVideoSplash.css';

const BUFFER_GRACE_MS = 1500; // 1.5 second buffer grace period

const IntroVideoSplash = ({ onFinish }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const graceTimerRef = useRef(null);
  const isUnmountedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false); // Default sound is ON!
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true); // NEW: loading state

  const triggerFadeOut = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    // Clear any pending grace timer when skipping
    if (graceTimerRef.current) {
      clearTimeout(graceTimerRef.current);
      graceTimerRef.current = null;
    }
    setTimeout(() => {
      onFinish();
    }, 700);
  }, [isFading, onFinish]);

  // Video Autoplay & Sound Initialization — with buffer-first strategy
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    isUnmountedRef.current = false;

    // Mobile hardware video attributes
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('preload', 'auto');

    // Do NOT autoplay yet — we want to buffer first
    video.pause();
    video.muted = true; // start muted to allow preload on mobile
    video.volume = 1.0;
    video.currentTime = 0;

    // Force the browser to start downloading
    video.load();

    const startPlayback = async () => {
      if (isUnmountedRef.current) return;
      setIsBuffering(false);

      // Try unmuted first (sound ON by default)
      video.muted = false;
      setIsMuted(false);

      try {
        await video.play();
        setIsPaused(false);
      } catch (err) {
        // Autoplay policy: fallback to muted play + auto-unmute on first touch
        console.warn('Autoplay with sound blocked, falling back to muted:', err);
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPaused(false);
        } catch {
          setIsPaused(true);
        }

        // On very first touch/click anywhere, automatically unmute!
        const handleFirstTouchUnmute = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            setIsMuted(false);
            videoRef.current.play().catch(() => {});
          }
          window.removeEventListener('touchstart', handleFirstTouchUnmute);
          window.removeEventListener('click', handleFirstTouchUnmute);
        };

        window.addEventListener('touchstart', handleFirstTouchUnmute, { passive: true, once: true });
        window.addEventListener('click', handleFirstTouchUnmute, { passive: true, once: true });
      }
    };

    // Strategy: Wait for `canplaythrough` (browser says it can play without stopping),
    // THEN wait an additional grace period to build extra buffer.
    let hasStarted = false;

    const onCanPlayThrough = () => {
      if (hasStarted) return;
      hasStarted = true;
      video.removeEventListener('canplaythrough', onCanPlayThrough);

      // Grace period: let the buffer fill a bit more
      graceTimerRef.current = setTimeout(() => {
        graceTimerRef.current = null;
        startPlayback();
      }, BUFFER_GRACE_MS);
    };

    video.addEventListener('canplaythrough', onCanPlayThrough);

    // Fallback: if canplaythrough never fires (slow network), start after 4s anyway
    const fallbackTimer = setTimeout(() => {
      if (!hasStarted) {
        hasStarted = true;
        video.removeEventListener('canplaythrough', onCanPlayThrough);
        startPlayback();
      }
    }, 4000);

    // Safety timeout: transition to login if video is completely blocked after 8s
    const safetyTimer = setTimeout(() => {
      if (video && video.currentTime === 0 && !video.ended) {
        console.warn('Video load safety fallback -> login');
        triggerFadeOut();
      }
    }, 8000);

    return () => {
      isUnmountedRef.current = true;
      if (graceTimerRef.current) clearTimeout(graceTimerRef.current);
      clearTimeout(fallbackTimer);
      clearTimeout(safetyTimer);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
    };
  }, [triggerFadeOut]);

  // Direct DOM update: 0 React re-renders on every frame!
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.width = `${pct}%`;
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current
          .play()
          .then(() => setIsPaused(false))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleContainerClick = () => {
    // If still buffering, skip immediately
    if (isBuffering) {
      triggerFadeOut();
      return;
    }
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current
        .play()
        .then(() => setIsPaused(false))
        .catch(() => triggerFadeOut());
    } else {
      triggerFadeOut();
    }
  };

  return (
    <div
      className={`intro-splash-container ${isFading ? 'fade-out' : 'fade-in'}`}
      onClick={handleContainerClick}
    >
      <video
        ref={videoRef}
        src="/gemini_generated_video_b10a9b8b.mp4"
        className="intro-video-element"
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerFadeOut}
        onPlaying={() => setIsPaused(false)}
        onError={() => {
          console.warn('Video element error, skipping to login');
          triggerFadeOut();
        }}
      />

      <div className="intro-gradient-overlay" />

      {/* Loading Indicator — shown while buffering */}
      {isBuffering && (
        <div className="intro-loading-overlay">
          <div className="intro-loading-spinner" />
          <p className="intro-loading-text">Mempersiapkan video...</p>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="intro-top-bar" onClick={(e) => e.stopPropagation()}>
        <FinoraLogo
          size="sm"
          variant="white"
          showTagline={true}
          customTagline="Your Financial Intelligence"
        />

        <div className="intro-top-actions">
          <button
            className={`intro-glass-btn sound-btn ${isMuted ? 'muted' : 'active'}`}
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          <button
            className="intro-glass-btn skip-btn"
            onClick={triggerFadeOut}
            title="Lewati Video & Masuk ke Login"
          >
            <span>Lewati</span>
            <HiOutlineArrowRight />
          </button>
        </div>
      </div>

      {/* Center Hero Overlay Content */}
      <div className="intro-center-caption">
        <h1 className="intro-tagline-hero">
          Your Financial <span className="gradient-highlight">Intelligence</span>
        </h1>
        <p className="intro-sub-text">
          Autonomous Cashflow Scenario Simulator & Dual-Mode Financial Operating System
        </p>

        {isPaused && !isBuffering && (
          <button
            className="intro-play-overlay-btn"
            onClick={togglePlay}
            title="Putar Video dengan Suara"
            aria-label="Putar Video"
          >
            <HiOutlinePlay />
          </button>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="intro-bottom-bar" onClick={(e) => e.stopPropagation()}>
        <div className="intro-progress-track">
          <div ref={progressBarRef} className="intro-progress-fill" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
};

export default IntroVideoSplash;


