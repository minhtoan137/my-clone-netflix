import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import { metaTags } from '../contants'
import useAuth from '../custom-hooks/useAuth'
import { Movie } from '../interface'
import requests from '../utils/request'

interface HomeProps {
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
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries
}: HomeProps) => {
  const { loading } = useAuth()

  const [showModal, setShowModal] = useRecoilState(modalState)

  if (loading) return null

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
        <link rel='canonical' href='https://my-clone-netflix.vercel.app/' />
      </Head>

      <Header />

      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />

        <section className='md:space-y-24'>
          <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Thrillers' movies={actionMovies} />
          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Scary Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries' movies={documentaries} />
        </section>
      </main>

      {showModal && <Modal />}

      <footer className='flex h-24 w-full items-center justify-center border-t'></footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json())
  ])

  return {
    props: {
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
}

export default Home
