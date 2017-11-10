import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextDetailsComponent } from './image-text-details.component';

describe('ImageTextDetailsComponent', () => {
  let component: ImageTextDetailsComponent;
  let fixture: ComponentFixture<ImageTextDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTextDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTextDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
