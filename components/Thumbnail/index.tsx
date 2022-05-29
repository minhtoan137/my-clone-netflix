import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState, viewState } from '../../atoms/modalAtom'
import { Movie } from '../../interface'

interface ThumbnailProps {
  movie: Movie
}

function Thumbnail({ movie }: ThumbnailProps) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [view] = useRecoilState(viewState)

  return (
    <>
      {view === 'list' ? (
        <div
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
          className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
        >
          <Image
            layout='fill'
            loading='lazy'
            objectFit='fill'
            decoding='async'
            alt='img-thumbnail'
            className='img rounded-sm object-cover transition-opacity duration-700 ease-in-out md:rounded'
            src={`https://image.tmdb.org/t/p/w500${
              movie?.backdrop_path || movie?.poster_path
            }`}
          />
        </div>
      ) : (
        <div>
          <div
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
            className='md:[50vw] relative mb-7 h-[50vh] w-[50vw] cursor-pointer transition duration-200 ease-out md:h-[50vh] md:hover:scale-105'
          >
            <Image
              layout='fill'
              loading='lazy'
              objectFit='fill'
              decoding='async'
              alt='img-thumbnail'
              className='img rounded-sm object-cover transition-opacity duration-700 ease-in-out md:rounded'
              src={`https://image.tmdb.org/t/p/w500${
                movie?.backdrop_path || movie?.poster_path
              }`}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Thumbnail
