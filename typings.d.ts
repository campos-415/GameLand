
export interface Game {
  name: string
  background_image: string
  background_image_additional: string
  genres: []
  id: number
  metacritic: number
  rating: number
  released: string
  review_count: number
  score: number
  stores: []
  short_screenshots: []
  tags: []
  slug: string
  games: [] 
  image_background: string
  description_raw: string
  image: any
  guid: string
  data: any
  max: string
  preview: string
}

export interface Tags {
  id: number
  name: string
  slug: string
  language: string
  game_count: number
  image_background: string

}

export interface Screenshots {
  id: number
  image: string
}

export interface Genre {
  id: number;
  name: string;
}

export interface Stores {
  id: number
  name: string
  slug: string
}

export interface Games {
  id: number
  name: string
  background_image: string
  slug: string
}

export interface Music {
  id: number
  name: string
}