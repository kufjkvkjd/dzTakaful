import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfile } from './delete-profile';

describe('DeleteProfile', () => {
  let component: DeleteProfile;
  let fixture: ComponentFixture<DeleteProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
