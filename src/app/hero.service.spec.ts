import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HEROES } from '@test/heroes.mock';
import { MessageService } from '@app/message.service';


describe('HeroService', () => {

  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, MessageService]
    });

    heroService = TestBed.get(HeroService);
    messageService = TestBed.get(MessageService);
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should return heroes', () => {
    // arrange
    spyOn(messageService, 'add');

    // act
    // assert
    heroService
      .getHeroes()
      .subscribe(heroes => {
        expect(messageService.add).toHaveBeenCalledWith('HeroService: fetched heroes');
        expect(heroes).toBe(HEROES);
      });

  });

});
