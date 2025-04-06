import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistropacienComponent } from './registropacien.component';

describe('RegistropacienComponent', () => {
  let component: RegistropacienComponent;
  let fixture: ComponentFixture<RegistropacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistropacienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistropacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
