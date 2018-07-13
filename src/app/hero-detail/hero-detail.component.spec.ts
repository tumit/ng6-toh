import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click, textContent } from '@test/test-helper';
import { fakeAsync } from '@angular/core/testing';
import { flush } from '@angular/core/testing';
import { HEROES } from '@test/heroes.mock';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ HeroDetailComponent ]
    })
    .compileComponents();

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

  it('should render selected hero when select (whenStable)', () => {

    // arrange
    component.hero = HEROES[1];

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

});
