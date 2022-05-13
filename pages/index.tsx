import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { metaTags } from '../contants'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { permanent: true, destination: '/home' }
})

const Base: NextPage = () => (
  <div>
    <Head>
      <title>My Netflix</title>
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
  </div>
)

export default Base
