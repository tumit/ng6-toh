import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HEROES } from '@test/heroes.mock';
import { click, textContent } from '@test/test-helper';

import { DebugElement } from '../../../node_modules/@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './heroes.component';


describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
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

  it('should have no selected hero when on init', () => {
    expect(component.selectedHero).toBeFalsy();
  });

  it('should change selected hero when select new hero', () => {
    // arrange
    const secondHero = de.query(By.css('.hero__item:nth-child(2)'));
    // act
    click(secondHero);
    fixture.detectChanges();
    // assert selected hero
    expect(component.selectedHero).toBe(HEROES[1]);
  });
});
