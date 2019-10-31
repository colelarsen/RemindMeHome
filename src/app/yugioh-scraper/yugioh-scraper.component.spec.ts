import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YugiohScraperComponent } from './yugioh-scraper.component';

describe('YugiohScraperComponent', () => {
  let component: YugiohScraperComponent;
  let fixture: ComponentFixture<YugiohScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YugiohScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YugiohScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
