export interface Episode {
  info: infoEpisode
  results: resultEpisode[]

}

interface infoEpisode {
  count: number;
  pages: number;
  next: string;
  prev: string;

}
export interface resultEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}


//personajes
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}


//favoritos
export interface Favoritos {
  name: string;
  imagen: string;

  id_caracter: Number;
  observaciones: string;
  usuario: String

}
export interface markToFavorite {
  id_caracter: number;
  observaciones: string
}
export interface markToFavoriteResponse {
  description: string;
  Message:string;
  StatusCode:number
}
