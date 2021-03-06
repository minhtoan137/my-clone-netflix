import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, viewState } from '../../atoms/modalAtom'
import Banner from '../../components/Banner'
import Header from '../../components/Header'
import Row from '../../components/Row'
import Row2 from '../../components/Row2'
import { metaTags } from '../../contants'
import useAuth from '../../custom-hooks/useAuth'
import { Movie } from '../../interface'
import requests from '../../utils/request'

const Modal = dynamic(() => import('../../components/Modal'))

interface HomeProps {
  nowPlayingMovies: Movie[]
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  nowPlayingMovies,
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries
}: HomeProps) => {
  // const { loading } = useAuth()
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [view, changeView] = useRecoilState(viewState)
  // console.log('🚀 ~ file: index.tsx ~ line 28 ~ Row ~ view', view)

  // if (loading) return null

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Home - My Netflix</title>
        <meta name='description' content='My netflix description.' />
        <meta name='keywords' content='HTML, CSS, JavaScript' />
        <meta name='author' content='Author' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {metaTags.map(({ name, content }) => (
          <meta key={name} name={name} content={content} />
        ))}
        <link rel='icon' href='/favicon.ico' />
        <link href='https://my-clone-netflix.vercel.app/' rel='canonical' />
      </Head>

      <Header />

      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />

        {/* <div className='flex flex-col space-y-2 py-4 md:space-y-4 lg:h-[5vh] lg:justify-end lg:pb-12' /> */}

        <section className='md:space-y-24'>
          <div className='flex items-center justify-center'>
            <button
              onClick={() => changeView('list')}
              className={`mr-5 inline-block rounded-lg ${
                view === 'list' ? 'bg-[#4fa2eb]' : 'bg-transparent'
              } py-4 px-4 text-center text-sm font-medium ${
                view === 'list' ? 'text-white' : 'text-gray-500'
              } hover:bg-[#4fa2eb] hover:text-white `}
            >
              List View
            </button>
            <button
              onClick={() => changeView('grid')}
              className={`rounded-lg py-4 px-4 text-center text-sm font-medium
            ${view === 'grid' ? 'bg-[#4fa2eb]' : 'bg-transparent'}
            ${view === 'grid' ? 'text-white' : 'text-gray-500'}
            hover:bg-[#4fa2eb] hover:text-white `}
            >
              Grid View
            </button>
          </div>

          <Row2 title='Now Playing' movies={[]} />
          {/* <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Thrillers' movies={actionMovies} />
          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Scary Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries' movies={documentaries} /> */}
        </section>
      </main>

      {showModal && <Modal />}

      {/* <footer className='flex h-24 w-full items-center justify-center border-t'></footer> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [
      nowPlayingMovies,
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries
    ] = await Promise.all([
      fetch(requests.fetchNowPlaying).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchNetflixOriginals)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          }
          return null
        })
        .catch((error) => console.log(error, 'toan 1')),
      fetch(requests.fetchTrending).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchTopRated).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchActionMovies).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchComedyMovies).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchHorrorMovies).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchRomanceMovies).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      }),
      fetch(requests.fetchDocumentaries).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return null
      })
    ])

    return {
      props: {
        nowPlayingMovies: nowPlayingMovies.results,
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error), '🚀 ~ file:')
    return {
      redirect: { destination: '/error-page', permanent: false }
    }
  }
}

export default Home
