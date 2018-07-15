import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {

  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    messageService = TestBed.get(MessageService);
    messageService.messages = [];
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should have new message in messages when add', () => {
    // arrange
    // act
    messageService.add('Hello');
    // assert
    expect(messageService.messages).toEqual(['Hello']);
  });

  it('should clear all messages when clear', () => {
    // arrange
    messageService.messages = ['Hello', 'World'];
    // act
    messageService.clear();
    // assert
    expect(messageService.messages).toEqual([]);
  });

});
