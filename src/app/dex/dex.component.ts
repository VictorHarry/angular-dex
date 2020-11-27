import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import {
  trigger,
  state,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css'],
  animations: [
    trigger('openClose', [
      state('descriptionOpen', style({
        width: '100%',
        opacity: 1,
      })),
      state('descriptionClose', style({
        width: '0',
        opacity: 0,
      })),
      state('rightCenterInfoOpen', style({
        left: '0',
      })),
      state('rightCenterInfoClose', style({
        left:'300px',
      })),
    ])
  ]
})

export class DexComponent implements OnInit {
  pokemon;
  pokemon_current_id: number = 1;
  openScreenInfo = false;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {
    this.setFormatedPokemon();
  }

  showContentInfo() {
    this.openScreenInfo = true;
  }

  hideContentInfo() {
    this.openScreenInfo = false;
    this.pokemon = {};
  }

  setFormatedPokemon() {
    this.pokemonService.getPokemon(this.pokemon_current_id).subscribe((pokemon: any) => {
      this.pokemonService.getPokemonSpecies(pokemon.species.url).subscribe((pokemon_specie: any) => {
        this.showContentInfo()
        this.pokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          sprite: pokemon.sprites.front_default,
          description: this.pokemonService.getEnLanguageObjects(pokemon_specie).description,
          genus: this.pokemonService.getEnLanguageObjects(pokemon_specie).genus,
        }
      })
    })
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
}
