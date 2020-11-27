import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private URL = "https://pokeapi.co/api/v2/pokemon/"

  constructor(private httpClient: HttpClient) { }

  getPokemon(pokemon_current_id: number) {
    let pokemon = this.httpClient.get(this.URL + pokemon_current_id);
    return  pokemon;
  }

  getPokemonSpecies(URL: string) {
    let pokemonSpecie = this.httpClient.get(URL);
    return pokemonSpecie
  }

  getEnLanguageObjects(pokemon: any): any {
    let tempInfo = {}

    pokemon.flavor_text_entries.forEach((flavor_text: any) => {
      if (flavor_text.language.name.includes('en')) {
        tempInfo = { description: flavor_text.flavor_text }
      }
    })

    pokemon.genera.forEach((genus: any) => {
      if (genus.language.name.includes('en')) {
        tempInfo = { ...tempInfo, genus: genus.genus }
      }
    })

    return tempInfo
  }
}