import React from 'react'

function FadeIn() {
  const handleFadeIn = () => {
    const image = document.getElementById('img')
    image?.classList.toggle('fade')
  }

  return (
    <div className='direct flex h-screen flex-col items-center justify-center'>
      <img
        className='transition-opacity duration-700 ease-in-out'
        id='img'
        alt=''
        src='/logo.jpg'
        width={500}
        height={200}
      />
      <button
        onClick={handleFadeIn}
        className='mt-5 rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700'
      >
        Fade Effect
      </button>
    </div>
  )
}

export default FadeIn
