import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextSectionComponent } from './simple-text-section.component';

describe('SimpleTextSectionComponent', () => {
  let component: SimpleTextSectionComponent;
  let fixture: ComponentFixture<SimpleTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTextSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
