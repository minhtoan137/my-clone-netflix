import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../interface'

export const modalState = atom<boolean>({
  key: 'modalState',
  default: true
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null
})
