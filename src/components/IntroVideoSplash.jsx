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
  const [isMuted, setIsMuted] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [needUserGesture, setNeedUserGesture] = useState(false);

  const triggerFadeOut = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onFinish();
    }, 700);
  }, [isFading, onFinish]);

  // Preload video into in-memory Blob URL for 100% stutter-free instant mobile & desktop playback
  useEffect(() => {
    let isMounted = true;
    let activeBlobUrl = null;
    const video = videoRef.current;
    if (!video) return;

    // Apply strict hardware DOM properties
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5-page');
    video.setAttribute('x5-video-player-fullscreen', 'true');
    video.setAttribute('preload', 'auto');
    video.setAttribute('disablePictureInPicture', 'true');
    video.setAttribute('disableRemotePlayback', 'true');

    // 1. Start immediate stream playback
    const startPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) {
              setIsBuffering(false);
              setNeedUserGesture(false);
              setIsPaused(false);
            }
          })
          .catch((err) => {
            console.warn('Autoplay waiting for touch:', err);
            if (isMounted) {
              setIsBuffering(false);
              setNeedUserGesture(true);
              setIsPaused(true);
            }
          });
      }
    };

    // 2. Concurrently load full video into RAM Blob (1.4MB) to eliminate mobile CDN range stalls
    fetch('/gemini_generated_video_b10a9b8b.mp4', { cache: 'force-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('Blob fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (!isMounted) return;
        activeBlobUrl = URL.createObjectURL(blob);
        // If video is still in early stage or buffering, swap to zero-latency memory Blob
        if (video && (video.currentTime < 1 || video.paused)) {
          const currentTime = video.currentTime;
          video.src = activeBlobUrl;
          video.currentTime = currentTime;
          startPlay();
        }
      })
      .catch(() => {
        // Fallback to direct path
        if (video && !video.src) {
          video.src = '/gemini_generated_video_b10a9b8b.mp4';
          startPlay();
        }
      });

    startPlay();

    // Anti-stuck watchdog: detect if video stalls on low-end mobile CPU
    let lastTime = 0;
    let stuckSeconds = 0;
    const progressWatchdog = setInterval(() => {
      if (video && !video.paused && !video.ended) {
        if (video.currentTime === lastTime && video.currentTime > 0) {
          stuckSeconds += 0.5;
          if (stuckSeconds >= 2.0) {
            console.warn('Nudging mobile video playback...');
            video.play().catch(() => {});
            stuckSeconds = 0;
          }
        } else {
          stuckSeconds = 0;
          lastTime = video.currentTime;
          setIsBuffering(false);
        }
      }
    }, 500);

    // Safety timeout: If video never progresses within 5.5s, gracefully transition to login
    const initialSafetyTimeout = setTimeout(() => {
      if (video && video.currentTime === 0 && !video.ended) {
        console.warn('Initial video load safety transition to login');
        triggerFadeOut();
      }
    }, 5500);

    return () => {
      isMounted = false;
      clearInterval(progressWatchdog);
      clearTimeout(initialSafetyTimeout);
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
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
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => {
            setIsPaused(false);
            setNeedUserGesture(false);
          })
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleContainerClick = () => {
    if (needUserGesture && videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setNeedUserGesture(false);
          setIsPaused(false);
        })
        .catch(() => {
          triggerFadeOut();
        });
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
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
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
            className="intro-glass-btn sound-btn"
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

        {/* Play / Un-pause prompt for mobile touch policies */}
        {(isPaused || needUserGesture) && (
          <button
            className="intro-play-overlay-btn"
            onClick={togglePlay}
            title="Putar Video"
            aria-label="Putar Video"
          >
            <HiOutlinePlay />
          </button>
        )}

        {isBuffering && !isPaused && !needUserGesture && (
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

