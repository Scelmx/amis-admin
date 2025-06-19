import React, { useState, useRef, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'amis';
import './style.css';

interface DefaultMusic {
  id: string;
  originalName: string;
  url: string;
}

const MusicPlayer: React.FC = observer(() => {
  // 状态管理
  const [currentMusic, setCurrentMusic] = useState<DefaultMusic | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayConfirm, setShowPlayConfirm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // 默认音乐配置
  const defaultMusic: DefaultMusic = {
    id: 'default',
    originalName: '简单爱',
    url: '/music/easy_love.mp3',
  };

  // 音频元素引用
  const audioRef = useRef<HTMLAudioElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 格式化时间
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // 音频事件处理
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleError = useCallback(() => {
    toast.error('音频播放出错');
    setIsPlaying(false);
  }, []);

  // 播放默认音乐
  const playDefaultMusic = useCallback(() => {
    setCurrentMusic(defaultMusic);
    if (audioRef.current) {
      audioRef.current.src = defaultMusic.url;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          console.log('音乐播放成功');
        }).catch((error) => {
          console.error('播放失败:', error);
          toast.error('播放失败，请检查音频文件');
        });
      }
    }
  }, []);

  // 确认播放
  const confirmPlay = useCallback(() => {
    setShowPlayConfirm(false);
    playDefaultMusic();
  }, [playDefaultMusic]);

  // 取消播放
  const cancelPlay = useCallback(() => {
    setShowPlayConfirm(false);
    setCurrentMusic(defaultMusic);
  }, []);

  // 切换播放/暂停
  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // 如果音频还没有加载，先加载默认音乐
        if (!audioRef.current.src && defaultMusic) {
          audioRef.current.src = defaultMusic.url;
          audioRef.current.load();
        }
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.error('播放失败:', error);
            toast.error('播放失败，请检查音频文件');
          });
        }
      }
    }
  }, [isPlaying]);

  // 进度条控制
  const handleSeek = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = parseFloat(event.target.value);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // 音量控制
  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  }, []);

  // 轮播控制
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % 2); // 只有2页
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2); // 只有2页
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // 触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // 滑动阈值
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, startX, currentX, nextSlide, prevSlide]);

  // 鼠标拖拽事件处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, startX, currentX, nextSlide, prevSlide]);

  // 初始化播放器
  const initializePlayer = () => {
    // 使用 requestAnimationFrame 确保 DOM 完全渲染
    requestAnimationFrame(() => {
      // 再次使用 requestAnimationFrame 确保所有样式和布局都已完成
      requestAnimationFrame(() => {
        console.log('界面完全加载，开始初始化播放器...');
        
        // 设置音频属性
        if (audioRef.current) {
          audioRef.current.volume = volume;
          audioRef.current.preload = 'auto';
        }
        
        // 设置加载完成状态
        setTimeout(() => {
          setIsLoading(false);
          // 显示播放确认弹窗
          setShowPlayConfirm(true);
        }, 1000);
      });
    });
  };

  // 组件挂载时的初始化
  useEffect(() => {
    console.log('音乐播放器组件挂载，开始初始化...');
    
    // 初始化音频事件监听
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
    }
    
    // 初始化播放器
    initializePlayer();
    
    // 清理函数
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      }
    };
  }, []);

  return (
    <div className="music-player-container">
      {/* 加载状态指示器 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">正在加载音乐播放器...</div>
        </div>
      )}

      {/* 播放确认弹窗 */}
      {showPlayConfirm && (
        <div className="play-confirm-overlay">
          <div className="play-confirm-modal">
            <div className="modal-icon">🎵</div>
            <h3 className="modal-title">准备播放音乐</h3>
            <p className="modal-description">
              是否要播放《{defaultMusic.originalName}》？
            </p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={confirmPlay}>
                开始播放
              </button>
              <button className="btn btn-secondary" onClick={cancelPlay}>
                稍后播放
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="player-wrapper">
        {/* 头部区域 */}
        <header className="player-header">
          <h1 className="player-title">🎵 定制音乐播放器</h1>
          <p className="player-subtitle">享受美妙的音乐时光</p>
        </header>

        {/* 主播放器区域 */}
        <div className="player-main">
          {/* 音乐封面区域 */}
          <div className="music-cover-section">
            <div className={`music-cover ${isPlaying ? 'playing' : ''}`}>
              <div className="cover-inner">
                <span className="music-icon">🎵</span>
              </div>
              {isPlaying && <div className="playing-indicator"></div>}
            </div>
          </div>

          {/* 轮播区域 */}
          <div className="carousel-section">
            {/* 轮播指示器 - 放在顶部 */}
            <div className="carousel-indicators top">
              <button
                className={`indicator ${currentSlide === 0 ? 'active' : ''}`}
                onClick={() => goToSlide(0)}
                aria-label="切换到音乐标题"
              />
              <button
                className={`indicator ${currentSlide === 1 ? 'active' : ''}`}
                onClick={() => goToSlide(1)}
                aria-label="切换到音乐信息"
              />
            </div>
            
            <div 
              className="carousel-container"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentSlide * (100 + 8)}%)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
              >
                {/* 第一页：音乐标题 */}
                <div className="carousel-slide">
                  <div className="music-info">
                    <h2 className="music-title">{defaultMusic.originalName}</h2>
                    <p className="music-subtitle">周杰伦 - 范特西</p>
                    <p className="music-year">2001年发行</p>
                  </div>
                </div>

                {/* 第二页：音乐详情 */}
                <div className="carousel-slide">
                  <div className="music-details-content">
                    <h3 className="details-subtitle">🎼 音乐信息</h3>
                    <div className="details-list">
                      <div className="detail-item">
                        <span className="detail-label">🎵 歌曲名称：</span>
                        <span className="detail-value">{defaultMusic.originalName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🎤 演唱者：</span>
                        <span className="detail-value">郑雲芯</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📀 专辑：</span>
                        <span className="detail-value">爱的进行曲</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📅 发行年份：</span>
                        <span className="detail-value">2025年</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🎼 歌曲类型：</span>
                        <span className="detail-value">流行音乐</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📝 简介：</span>
                        <span className="detail-value">这首歌，就是我想对你说的全部</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 状态提示 */}
          {!currentMusic && (
            <div className="status-message info">
              <span>🎵 点击播放按钮开始欣赏《{defaultMusic.originalName}》</span>
            </div>
          )}
          {/* 进度条 */}
          {currentMusic && (
            <div className="progress-section">
              <div className="time-display">
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="total-time">{formatTime(duration)}</span>
              </div>
              <div className="progress-bar-container">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="progress-bar"
                />
              </div>
            </div>
          )}

          {/* 控制按钮 */}
          <div className="controls-section">
            <button
              onClick={togglePlayPause}
              className={`play-button ${isPlaying ? 'paused' : 'playing'}`}
              aria-label={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 隐藏的音频元素 */}
      <audio 
        ref={audioRef} 
        preload="auto"
        muted={false}
        controls={false}
        style={{ display: 'none' }}
      />
    </div>
  );
});

export default MusicPlayer; 