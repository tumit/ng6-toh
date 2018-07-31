import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { HEROES } from '@test/heroes.mock';
import { textContent } from '@test/test-helper';
import { of } from 'rxjs';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '@app/hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let de: DebugElement;
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [SharedModule, RouterTestingModule],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 1 })) } },
        HeroService
      ]
    })
    .compileComponents();

    heroService = TestBed.get(HeroService);

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render hero when not select', () => {
    const selectedHero = de.query(By.css('.selected_hero'));
    expect(selectedHero).toBeFalsy();
  });

  /*
  it('should render selected hero when select (whenStable)', () => {

    // arrange
    spyOn(heroService, 'getHero').and.returnValue(HEROES[1]);

    // act
    fixture.detectChanges();

    // assert selected hero
    const details = de.query(By.css('.selected_hero__details'));
    expect(textContent(details)).toBe('NARCO Details');

    const id = de.query(By.css('.selected_hero__id'));
    expect(textContent(id)).toBe('12');

    fixture.whenStable().then(() => {
      const name = de.query(By.css('.selected_hero__name'));
      expect(name.nativeElement.value).toBe('Narco');
    });
  });

  it('should render selected hero when select (fakeAsync & flush)', fakeAsync(() => {

    // arrange
    component.hero = HEROES[1];

    // act
    fixture.detectChanges();
    flush();

    // assert selected hero
    const details = de.query(By.css('.selected_hero__details'));
    expect(textContent(details)).toBe('NARCO Details');

    const id = de.query(By.css('.selected_hero__id'));
    expect(textContent(id)).toBe('12');

    const name = de.query(By.css('.selected_hero__name'));
    expect(name.nativeElement.value).toBe('Narco');
  }));

  describe('should render selected hero when select (async)', () => {

    beforeEach(async(() => {
      // arrange
      component.hero = HEROES[1];
      // act
      fixture.detectChanges();
    }));

    it('assert selected hero', () => {
      // assert selected hero
      const details = de.query(By.css('.selected_hero__details'));
      expect(textContent(details)).toBe('NARCO Details');

      const id = de.query(By.css('.selected_hero__id'));
      expect(textContent(id)).toBe('12');

      const name = de.query(By.css('.selected_hero__name'));
      expect(name.nativeElement.value).toBe('Narco');
    });
  });
  */

});
