import { useState, useRef, useEffect, useCallback } from 'react';
import {
  HiOutlineArrowRight,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlinePlay,
} from 'react-icons/hi';
import FinoraLogo from './FinoraLogo';
import './IntroVideoSplash.css';

const IntroVideoSplash = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Default sound is ON!
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const triggerFadeOut = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onFinish();
    }, 700);
  }, [isFading, onFinish]);

  // Video Autoplay & Sound Initialization (Default Sound ON)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set mobile attributes
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('preload', 'auto');

    // Default to Sound ON (unmuted)
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);

    const tryStartPlayback = async () => {
      try {
        await video.play();
        setIsPaused(false);
        setIsBuffering(false);
        setIsMuted(false);
      } catch (err) {
        // If mobile browser policy requires user touch before playing audio:
        console.warn('Browser policy requires touch for sound, playing and queuing unmute:', err);
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPaused(false);
          setIsBuffering(false);
        } catch {
          setIsPaused(true);
        }

        // On very first touch or click anywhere, automatically unmute!
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

    tryStartPlayback();

    // Anti-stuck watchdog
    let lastTime = 0;
    let stuckCount = 0;
    const progressWatchdog = setInterval(() => {
      if (video && !video.paused && !video.ended) {
        if (video.currentTime === lastTime && video.currentTime > 0) {
          stuckCount += 1;
          if (stuckCount >= 3) {
            console.warn('Playback stalled, nudging video...');
            video.play().catch(() => {});
            stuckCount = 0;
          }
        } else {
          stuckCount = 0;
          lastTime = video.currentTime;
          setIsBuffering(false);
        }
      }
    }, 500);

    // Safety timeout: transition to login if video is completely blocked after 5s
    const initialSafetyTimeout = setTimeout(() => {
      if (video && video.currentTime === 0 && !video.ended) {
        console.warn('Video load safety fallback -> login');
        triggerFadeOut();
      }
    }, 5000);

    return () => {
      clearInterval(progressWatchdog);
      clearTimeout(initialSafetyTimeout);
    };
  }, [triggerFadeOut]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
      setIsBuffering(false);
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
        autoPlay
        playsInline
        muted={isMuted}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerFadeOut}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPaused(false);
        }}
        onCanPlay={() => setIsBuffering(false)}
        onError={() => {
          console.warn('Video element error, skipping to login');
          triggerFadeOut();
        }}
      />

      <div className="intro-gradient-overlay" />

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

        {isPaused && (
          <button
            className="intro-play-overlay-btn"
            onClick={togglePlay}
            title="Putar Video dengan Suara"
            aria-label="Putar Video"
          >
            <HiOutlinePlay />
          </button>
        )}

        {isBuffering && !isPaused && (
          <div className="intro-buffering-indicator">
            <div className="buffering-spinner" />
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="intro-bottom-bar" onClick={(e) => e.stopPropagation()}>
        <div className="intro-progress-track">
          <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default IntroVideoSplash;

