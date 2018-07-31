import { Injectable } from '@angular/core';
import { HEROES } from '@test/heroes.mock';
import { Hero } from '@app/hero.model';
import { Observable, of } from 'rxjs';
import { MessageService } from '@app/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(h => h.id === id));
  }
}
