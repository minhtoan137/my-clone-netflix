import type { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: '/home'
    }
  }
}

const Base: NextPage = () => {
  return <div></div>
}

export default Base
