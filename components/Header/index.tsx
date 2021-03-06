import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import useAuth from '../../custom-hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { logOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleFadeIn = () => {
    const image = document.querySelectorAll('.img')
    image?.forEach((item) => {
      item?.classList.toggle('fade')
    })
  }

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        {/* <img
          width={100}
          height={100}
          src='https://rb.gy/ulxxee'
          className='cursor-pointer object-contain'
        /> */}

        <div className='relative h-8 w-24 cursor-pointer'>
          <Image
            layout='fill'
            loading='lazy'
            decoding='async'
            alt='netflix-logo'
            objectFit='contain'
            src='https://rb.gy/ulxxee'
            loader={({ width, quality }) =>
              `https://rb.gy/ulxxee?w=${width}&q=${quality || 75}`
            }
          />
        </div>

        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>New & Popular</li>
          <li className='headerLink'>My List</li>
          <li className='headerLink'>
            <button
              onClick={handleFadeIn}
              className='rounded bg-blue-500 px-2 py-0.5 text-sm font-bold text-white hover:bg-blue-700'
            >
              Fade Effect
            </button>
          </li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-light'>
        <SearchIcon className='sm hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6' />

        {/* <Link href='/account'> */}
        <div onClick={logOut} className='relative h-6 w-6'>
          <Image
            layout='fill'
            alt='account-img'
            objectFit='contain'
            src='https://rb.gy/g1pwyx'
            className='cursor-pointer rounded'
          />
        </div>
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
