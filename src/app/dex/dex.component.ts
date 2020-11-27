import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from '../pokemon.service'

import {
  trigger,
  state,
  style,
} from '@angular/animations';

interface PokemonInterface {
  id: number,
  name: string,
  types: [],
  height: number,
  weight: number,
  sprite: string,
  description: string,
  genus: string,
}

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '100%',
        opacity: 1,
      })),
      state('close', style({
        width: '0',
        opacity: 0,
      })),
    ])
  ]
})

export class DexComponent implements OnInit {
  pokemon:PokemonInterface = {
    id: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
    sprite: '',
    description: '',
    genus: ''
  };

  pokemon_current_id: number = 1;
  isOpen = false;

  constructor(
    private PokemonService: PokemonService,
  ) { }

  ngOnInit() {
    this.setFormatedPokemon();
  }

  showContentInfo() {
    this.isOpen = true;
  }

  hideContentInfo() {
    this.isOpen = false;
  }

  setFormatedPokemon() {
    this.PokemonService.getPokemon(this.pokemon_current_id).subscribe((pokemon: any) => {
      this.PokemonService.getPokemonSpecies(pokemon.species.url).subscribe((pokemon_specie: any) => {
        this.showContentInfo()
        this.pokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          sprite: pokemon.sprites.front_default,
          description: this.getEnLanguageObject(pokemon_specie).description,
          genus: this.getEnLanguageObject(pokemon_specie).genus,
        }
      })
    })
  }

  getEnLanguageObject(pokemon: any): any {
    let tempInfo = {}
    pokemon.flavor_text_entries.forEach((item: any) => {
      if (item.language.name.includes('en')) {
        tempInfo = { description: item.flavor_text }
      }
    })

    pokemon.genera.forEach((item: any) => {
      if (item.language.name.includes('en')) {
        tempInfo = { ...tempInfo, genus: item.genus }
      }
    })
    return tempInfo
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        // implement sprite change
        break;
      case 'ArrowRight':
        // implement sprite change
        break
      case 'ArrowUp':
        this.hideContentInfo()
        this.pokemon_current_id += 1;
        this.setFormatedPokemon();
        break;
      case 'ArrowDown':
        this.hideContentInfo()
        this.pokemon_current_id == 1 ? this.pokemon_current_id = 1 : this.pokemon_current_id -= 1;
        this.setFormatedPokemon();
        break
    }
  }

  test(pokemon) {
    console.log(pokemon)
  }
}
