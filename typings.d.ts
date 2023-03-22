import { StaticImageData } from "next/image"

export interface Game {
  name: string
  background_image: StaticImport
  background_image_additional: StaticImport
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
  image: string
  guid: string
  data: Data
  max: string
  preview: string
  platforms: []
  results: []
  esrb_rating: esrbRating

}

export interface Data {
  max: string;
  480: string;
  data: Data;
}

export interface Movie {
  data: Data
  id: number
  preview: string
  name: string
  map: any
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

export interface Genres {
  id: number;
  name: string;
  games: Games
  games_count: number
  slug: string
  image_background: string
}

export interface Stores {
  store: any
  id: number
  name: string
  slug: string
}

export interface Games {
  id: number
  name: string
  background_image: string
  slug: string
  added: number
}
export interface esrbRating {
  id: number
  name: string
  slug: string
}

export interface Music {
  id: number
  name: string
}

export interface Platform {
  id: number
  name: string
  platform:  Platform
  
}

export interface Video {
  play: () => {};
  pause: () => {};
  currentTime: number;
  addEventListener: EventListenerObject;
  removeEventListener: EventListenerObject;
}