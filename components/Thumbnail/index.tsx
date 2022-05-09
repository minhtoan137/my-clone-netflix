import Image from 'next/image'
import React from 'react'
import { BASE_URL } from '../../contants'
import { Movie } from '../../interface'

interface ThumbnailProps {
  movie: Movie
}

function Thumbnail({ movie }: ThumbnailProps) {
  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
      <Image
        layout='fill'
        alt='img-thumbnail'
        className='rounded-sm object-cover md:rounded'
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
      />
    </div>
  )
}

export default Thumbnail
