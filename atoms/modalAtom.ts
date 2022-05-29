import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../interface'

export const viewState = atom<string>({
  key: 'viewState',
  default: 'list'
})

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null
})
