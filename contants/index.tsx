/** //https://developers.themoviedb.org/3/getting-started/images */
export const BASE_URL = 'https://image.tmdb.org/t/p/original/'

export const metaTags = [
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:site',
    content: 'twitter site'
  },
  { name: 'twitter:title', content: 'twitter title' },
  { name: 'twitter:description', content: 'twitter description' },
  {
    name: 'twitter:creator',
    content: 'twitter creator'
  },
  { name: 'twitter:image:src', content: 'twitter img' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'og:title', content: 'og title' },
  { name: 'og:type', content: 'og type' },
  { name: 'og:url', content: 'og url' },
  { name: 'og:image', content: 'og image' },
  { name: 'og:description', content: 'og description' },
  {
    name: 'og:site_name',
    content: 'og site_name'
  },
  {
    name: 'og:published_time',
    content: new Date().toISOString()
  },
  {
    name: 'og:modified_time',
    content: new Date().toISOString()
  }
]
