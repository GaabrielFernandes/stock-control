import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNavgationComponent } from './toolbar-navgation.component';

describe('ToolbarNavgationComponent', () => {
  let component: ToolbarNavgationComponent;
  let fixture: ComponentFixture<ToolbarNavgationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarNavgationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarNavgationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
