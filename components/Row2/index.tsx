import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Movie } from '../../interface'
import requests from '../../utils/request'
import Thumbnail from '../Thumbnail'

interface RowProps {
  title: string
  movies: Movie[]
}

enum IDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

function Row({ title, movies }: RowProps) {
  const { push } = useRouter()
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[] | null>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = () => {
    try {
      fetch(requests.fetchNowPlaying)
        .then((res) => {
          /** error fetch not exist */
          if (res.status === 404) {
            console.log('404 error')
            push('/error-page')
          }
          /** error fetch no data */
          if (res.status === 204) {
            console.log('204 error')
            push('/error-page')
          }
          if (res.status === 200) {
            return res.json()
          }
        })
        .then((res) => {
          if (res) {
            setNowPlayingMovies(res?.results)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.error(error, 'fetch')
          setIsLoading(false)
          push('/error-page')
        })
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.error(error, 'try catch')
    }
  }

  const handleClick = (direction: IDirection) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === IDirection.LEFT
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const onRefresh = () => {
    setIsLoading(true)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-72 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title} {''}
        <button
          className='rounded bg-blue-500 px-2 text-sm font-bold text-white hover:bg-blue-700'
          onClick={onRefresh}
        >
          Refresh
        </button>
      </h2>
      <div className='group relative md:-ml-2'>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <>
            <ChevronLeftIcon
              onClick={() => handleClick(IDirection.LEFT)}
              className={`absolute left-2 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
                !isMoved && 'hidden'
              }`}
            />

            <div
              ref={rowRef}
              className='flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2'
            >
              {nowPlayingMovies?.map((movie) => (
                <Thumbnail key={movie.id} movie={movie} />
              ))}
            </div>

            <ChevronRightIcon
              onClick={() => handleClick(IDirection.RIGHT)}
              className={`absolute right-2 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Row
