//SPA
//SSR
//SSG

// import { useEffect } from "react"
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styles from './home.module.scss'
import Link from 'next/link'
import { usePlayer } from '../contexts/PlayerContext'
import React from 'react'
import Head from 'next/head'

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {

  //SPA
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }, [])
  //SSR
  //console.log(props.episodes)

const { playList } = usePlayer()

const episodeList = [... latestEpisodes, ...allEpisodes]

  return (
    //SSR e SSG
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <Head>
          <title>Home | Podcastr</title>
        </Head>
        <h2>Últimos lançamentos</h2>
{/* add data test */}
        <ul data-test="lastEpisode">
          {latestEpisodes.map((episode,index) => {
            return(
              //identificação importante para o react saber em episodio qual esta
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  objectFit="cover"
                  className={styles.mobileImg}
                  />
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" 
                onClick={()=> playList(episodeList,index)}>
                  <img src="/play-green.svg" alt="Tocar episodio"/>
                </button>
              </li>
          )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
              <th className={styles.mobile}></th>
              <th>Podcast</th>
              <th className={styles.mobileSmall}>Integrantes</th>
              <th>Data - Duração</th>
              {/* <th>Duração</th> */}
              <th></th>

              </tr>
                
            </thead>
            <tbody>
              {allEpisodes.map((episode,index) =>{
                return(
                  <tr key={episode.id} data-test="allEpisodes">
                    <td  className={styles.mobile} style={{width:72}}>
                      <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                      
                      />
                    </td>
                    <td>
                    <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                    </Link>
                    </td>
                    <td className={styles.mobileSmall}>{episode.members}</td>
                    <td style={{width:100}}><span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span></td>
                    {/* <td>{episode.durationAsString}</td> */}
                    <td>
                      <button type="button" 
                      onClick={() => playList(episodeList,index + latestEpisodes.length)}>
                        <img src="/play-green.svg" alt="Tocar episodio"/>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
      </section>

    </div >
  )
}
//SSR
//export async function getServerSideProps() {
//SSG  
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    //gera uma nova versão da pagina a cada 8 horas
    revalidate: 60 * 60 * 8
  }
}