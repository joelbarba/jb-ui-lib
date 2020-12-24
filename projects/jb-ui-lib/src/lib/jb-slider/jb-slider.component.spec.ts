import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbSliderComponent } from './jb-slider.component';
import {JbLabelComponent} from '../jb-label/jb-label.component';
import {Ng5SliderModule} from 'ng5-slider';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('JbSliderComponent', () => {
  let component: JbSliderComponent;
  let fixture: ComponentFixture<JbSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbSliderComponent, JbLabelComponent ],
      imports: [Ng5SliderModule, NgbTooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbSliderComponent);
    component = fixture.componentInstance;
    component.jbOptions = { start: 10, end: 150 };
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should customize jbOptions', () => {
    component.jbOptions = {
      start: 100,
      end: 150,
      step: 2,
      showTicks: true,
      showTicksValues: true,
      tickStep: 10,
      tickValueStep: 5
    };
    component.ngOnInit();
    expect(component.sliderOptions).toEqual({
      animate: false,
      floor: 100,
      ceil: 150,
      disabled: false,
      step: 2,
      showSelectionBar: false,
      showSelectionBarEnd: false,
      showTicks: true,
      showTicksValues: true,
      tickStep: 10,
      tickValueStep: 5,
      ticksArray: null,
      maxLimit: null,
      minLimit: null
    });
  });

  it('Should add ticksArray', () => {
    component.jbOptions = {
      start: 100,
      end: 150,
      showTicks: true,
      showTicksValues: true,
      tickArray: [100, 110, 120, 130, 140, 150]
    };
    component.optionsRebuild();
    expect(component.sliderOptions.floor).toBe(100);
    expect(component.sliderOptions.ceil).toBe(150);
    expect(component.sliderOptions.ticksArray).toEqual([100, 110, 120, 130, 140, 150]);
  });

  it('Should Disabled the Slider', () => {
    component.jbDisabled = true;
    component.ngOnChanges({
      jbDisabled: { currentValue: true }
    });
    expect(component.sliderOptions.disabled).toBe(true);
  });
});
