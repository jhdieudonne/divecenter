/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlenderToolComponent } from './blenderTool.component';

describe('BlenderToolComponent', () => {
  let component: BlenderToolComponent;
  let fixture: ComponentFixture<BlenderToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlenderToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlenderToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
