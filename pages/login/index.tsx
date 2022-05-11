import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../../custom-hooks/useAuth'

type Inputs = {
  email: string
  password: string
}

interface LoginProps {}

function Login({}: LoginProps) {
  const [login, setLogin] = useState<boolean>(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>My Netflix</title>
        <meta media='' content='My netflix' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image
        layout='fill'
        alt='img-login'
        objectFit='cover'
        src='https://rb.gy/p2hphi'
        className='-z-10 !hidden opacity-60 sm:!inline'
      />

      <div className='absolute left-4 top-4 h-12 w-36 cursor-pointer md:left-10 md:top-6'>
        <Image
          layout='fill'
          alt='netflix-logo'
          objectFit='contain'
          src='https://rb.gy/ulxxee'
          loader={({ width, quality }) =>
            `https://rb.gy/ulxxee?w=${width}&q=${quality || 75}`
          }
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
      >
        <h1 className='text-4xl font-semibold'>Sign in</h1>

        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className='loginInput'
              {...register('email', { required: true })}
            />

            {errors.email && (
              <span className='p1 text-[13px] font-light text-orange-500'>
                Please enter a email.
              </span>
            )}
          </label>

          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='********'
              className='loginInput'
              {...register('password', { required: true })}
            />

            {errors.password && (
              <span className='p1 text-[13px] font-light text-orange-500'>
                Please enter a password.
              </span>
            )}
          </label>
        </div>

        <button
          onClick={() => setLogin(true)}
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
        >
          Sign in
        </button>

        <div className='text-[gray]'>
          New to Netflix {''}
          <button
            type='submit'
            onClick={() => setLogin(false)}
            className='text-white hover:underline'
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
