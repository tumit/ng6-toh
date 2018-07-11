import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../shared.module';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

    // init hero
    component.hero = {
      id: 2,
      name: 'Cherprang'
    };

    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero details', () => {
    const detailsEl: HTMLElement = compiled.querySelector('.hero__details');
    expect(detailsEl.textContent).toContain('CHERPRANG Details');
  });

  it('should render hero id', () => {
    const idEl: HTMLElement = compiled.querySelector('.hero__id');
    expect(idEl.textContent).toContain('2');
  });

  it('should render hero name', () => {
    const nameEl: HTMLInputElement = compiled.querySelector('.hero__name');
    expect(nameEl.value).toContain('Cherprang');
  });

});
