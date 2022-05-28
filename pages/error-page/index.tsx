import { useRouter } from 'next/router'
import React from 'react'

function ErrorPage() {
  const { push } = useRouter()
  return (
    <div className='direct flex h-screen flex-col items-center justify-center'>
      <div>Có lỗi xảy ra.</div>
      <div onClick={() => push('/home')}>
        <p className='cursor-pointer text-[#30ddb8] hover:underline '>
          Quay lại trang chủ
        </p>
      </div>
    </div>
  )
}

export default ErrorPage
