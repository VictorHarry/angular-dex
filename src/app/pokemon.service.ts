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
}