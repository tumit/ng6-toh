import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MessageService } from '@app/message.service';
import { click } from '@test/test-helper';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let de: DebugElement;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers: [MessageService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    messageService = TestBed.get(MessageService);
    fixture.detectChanges();

    de = fixture.debugElement;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render messages when not message', () => {
    // arrange
    // act
    const message = de.query(By.css('.message'));
    // assert
    expect(message).toBeFalsy();
  });

  it('should render messages when have messages', () => {
    // arrange
    messageService.add('Hello');
    // act
    fixture.detectChanges();
    const message = de.query(By.css('.message'));
    // assert
    expect(message).toBeTruthy();
  });

  it('should clear message when clear', () => {
    messageService.add('Hello');
    fixture.detectChanges();
    let message = de.query(By.css('.message'));
    expect(message).toBeTruthy();

    const clear = de.query(By.css('.messages__clear'));
    click(clear);
    fixture.detectChanges();

    message = de.query(By.css('.message'));
    expect(message).toBeFalsy();
  });

});
