import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from '../pokemon.service';
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
        opacity: '0',
      })),

      state('tinyInfoOpen', style({
        opacity: 1,
        left: '0',
      })),
      state('tinyInfoClose', style({
        opacity: 0,
        left:'300px',
      })),

      state('typesOpen', style({
        opacity: 1,
        left: '0',
      })),
      state('typesClose', style({
        opacity: 0,
        left:'300px',
      })),

      state('pokemonPropsOpen', style({
        opacity: 1,
        left: '0',
      })),
      state('pokemonPropsClose', style({
        opacity: 0,
        left:'300px',
      })),

      state('pokemonSpriteOpen', style({
        opacity: 1,
      })),
      state('pokemonSpriteClose', style({
        opacity: 0,
      })),
    ])
  ]
})

export class DexComponent implements OnInit {
  pokemon;
  currentSprite;
  pokemon_sprites = ['front_default','back_default','front_shiny','back_shiny'];
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

  resetContent() {
    this.openScreenInfo = false;
    this.pokemon = {};
  }

  setFormatedPokemon() {
    this.pokemonService.getPokemon(this.pokemon_current_id).subscribe((pokemon: any) => {
      this.pokemonService.getPokemonSpecies(pokemon.species.url).subscribe((pokemon_specie: any) => {
        this.currentSprite = 'front_default';
        this.pokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          sprite: pokemon.sprites,
          genus: this.pokemonService.getEnLanguageObjects(pokemon_specie).genus,
        }
        setTimeout(() => {
          this.showContentInfo()
          this.pokemon = {...this.pokemon, description: this.pokemonService.getEnLanguageObjects(pokemon_specie).description,}
        }, 500);
      })
    })
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.changeSprite(-1)
        break;
      case 'ArrowRight':
        this.changeSprite(1);
        break
      case 'ArrowUp':
        this.resetContent()
        this.pokemon_current_id += 1;
        this.setFormatedPokemon();
        break;
      case 'ArrowDown':
        this.resetContent()
        this.pokemon_current_id == 1 ? this.pokemon_current_id = 1 : this.pokemon_current_id -= 1;
        this.setFormatedPokemon();
        break
    }
  }

  changeSprite(position) {
    let newPosition = this.pokemon_sprites.indexOf(this.currentSprite) + position;
    newPosition = newPosition < 0 ? 0 : newPosition > this.pokemon_sprites.length - 1 ? this.pokemon_sprites.length - 1: newPosition;
    this.currentSprite = this.pokemon_sprites[newPosition];
  }
}
