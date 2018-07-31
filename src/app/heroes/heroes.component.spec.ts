import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '@app/app-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { HeroDetailComponent } from '@app/hero-detail/hero-detail.component';
import { HEROES } from '@test/heroes.mock';
import { click, textContent } from '@test/test-helper';

import { DebugElement } from '../../../node_modules/@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let de: DebugElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [SharedModule, RouterTestingModule.withRoutes(routes)],
      declarations: [HeroesComponent, DashboardComponent, HeroDetailComponent]
    })
      .compileComponents();

    // init router
    router = TestBed.get(Router);
    router.initialNavigation();
    location = TestBed.get(Location);

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

  it('should navigate to detail when select hero', fakeAsync(() => {
    // arrange
    const secondHero = de.queryAll(By.css('.hero__link'))[1];
    // act
    click(secondHero);
    tick();
    // assert selected hero
    expect(location.path()).toBe('/detail/12');
  }));
});
