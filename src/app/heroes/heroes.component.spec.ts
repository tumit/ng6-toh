import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DebugElement } from '../../../node_modules/@angular/core';
import { HEROES } from '@test/heroes.mock';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './heroes.component';
import { textContent, click } from '@test/test-helper';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HeroesComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

    // init heroes
    component.heroes = HEROES;

    // force change
    fixture.detectChanges();

    // get debug element
    de = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heroes title', () => {
    const title = de.query(By.css('.heroes__title'));
    expect(textContent(title)).toContain('My Heroes');
  });

  it('should render hero items', () => {
    const heroes = de.queryAll(By.css('.hero__item'));
    expect(heroes.length).toEqual(10);

    const firstHeroId = de.query(By.css('.hero__item__id'));
    expect(textContent(firstHeroId)).toBe('11');

    const firstHeroName = de.query(By.css('.hero__item__name'));
    expect(textContent(firstHeroName)).toBe('Mr. Nice');
  });

  it('should not render hero when not select', () => {
    const selectedHero = de.query(By.css('.selected_hero'));
    expect(selectedHero).toBeFalsy();
  });

  it('should render selected hero when select (whenStable)', () => {

    // arrange
    const secondHero = de.query(By.css('.hero__item:nth-child(2)'));

    // act
    click(secondHero);
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
    const secondHero = de.query(By.css('.hero__item:nth-child(2)'));

    // act
    click(secondHero);
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
      const secondHero = de.query(By.css('.hero__item:nth-child(2)'));
      // act
      click(secondHero);
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
});
