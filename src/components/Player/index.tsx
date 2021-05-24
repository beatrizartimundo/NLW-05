import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import {useMediaQuery} from '../../utils/mediaQuery'

export  function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0)

    const {
        episodeList,
        currentEpisodeIndex, 
        isPlaying,
        isLooping,
        isShuffling,
        toggleSuffle,
        togglePlay,
        toggleLoop,
        setPlayingState,
        playNext,
        playPrevious,
        clearPlayerState,
        hasNext,
        hasPrevious
    } = usePlayer()

    useEffect(() => {
        if(!audioRef.current){
            return
        }
        if(isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime =0

        audioRef.current.addEventListener('timeupdate', event => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }
    function handleSeek(amount:number){
        audioRef.current.currentTime = amount
        setProgress(amount)
    }

    function handleEpisodeEnded(){
        if(hasNext){
           playNext() 
        }else{
            clearPlayerState
        }
    }
    const episode = episodeList[currentEpisodeIndex]
    
    let isPageWide = useMediaQuery('(max-width: 720px)')
    let isPage = useMediaQuery('(min-width: 721px)')

  return(
      <div className={styles.playerContainer} data-test="player">
        <header className={styles.header}>
            <img src="/playing.svg" alt="Tocando agora"/>
            <strong data-test="playerHead">Tocando agora</strong>
        </header>

                
        { episode && isPage ? (
            <div className={styles.currentEpisode}>
                <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                objectFit="cover"
                
                />
                  <strong>{episode.title}</strong>
                  <span>{episode.members}</span>  
                               

            </div>
        ):episode && isPageWide?(
            <div className={styles.currentEpisode}>
                  <strong>{episode.title}</strong>
                  
                               

            </div>
        ):(

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

        )} 

        <footer className={styles.empty} data-test="playerFooter">
            <div className={styles.progress}>
                <span>{convertDurationToTimeString(progress)}</span>
                <div className={styles.slider}>
                    { episode ? (
                        <Slider
                        max={episode.duration}
                        value={progress}
                        onChange={handleSeek}
                        trackStyle={{backgroundColor:'#04d361'}}
                        railStyle={{backgroundColor:'#9f75ff'}}
                        handleStyle={{borderColor:'#04d361'}}
                        />
                    ):(
                        <div className={styles.emptySlider}/>

                    )}
                </div>
                <span data-test="sliderTimeEnd">{convertDurationToTimeString(episode?.duration ?? 0)}</span>            
            </div>

            { episode && (
                <audio
                src={episode.url}
                ref={audioRef}
                autoPlay
                loop={isLooping}
                onEnded={handleEpisodeEnded}
                onLoadedMetadata={setupProgressListener}
                onPlay={() => setPlayingState(true)}
                onPause={()=> setPlayingState(false)}
                />

                
            )}
            <div className={styles.buttons}>
                <button 
                    type="button" 
                    disabled={!episode || episodeList.length === 1}
                    onClick={toggleSuffle}
                    className={isShuffling ? styles.isActive : ''}
                    data-test="playerShuffleBtn"
                >
                    <img src="/shuffle.svg" alt="Embaralhar"/>
                </button>

                <button type="button" 
                    disabled={!episode || !hasPrevious} 
                    onClick={playPrevious}
                    data-test="playerPreviousBtn"
                    >
                    <img src="/play-previous.svg" alt="Tocar anterior"/>
                </button>

                <button type="button" 
                   className={styles.playButton} 
                   disabled={!episode}
                   onClick={togglePlay}
                   data-test="playerPlayBtn"
                   >
                { isPlaying
                  ?<img src="/pause.svg" alt="Tocar" data-test="playerPause"/>
                  :<img src="/play.svg" alt="Tocar"data-test="playerPlay"/>
                }
                </button>
                <button type="button" 
                    disabled={!episode || !hasNext} 
                    onClick={playNext}
                    data-test="playerNextBtn"
                    >
                    <img src="/play-next.svg" alt="Tocar proxima"/>
                </button>
                <button type="button" 
                disabled={!episode}
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}
                data-test="playerRepeatBtn"
                >
                    <img src="/repeat.svg" alt="Repetir"/>
                </button>

            </div>
        </footer>
      </div>
  )
    
}