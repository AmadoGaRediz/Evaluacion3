import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrodocsComponent } from './registrodocs.component';

describe('RegistrodocsComponent', () => {
  let component: RegistrodocsComponent;
  let fixture: ComponentFixture<RegistrodocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrodocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrodocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
