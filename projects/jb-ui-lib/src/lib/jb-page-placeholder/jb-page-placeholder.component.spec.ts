import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbPagePlaceholderComponent } from './jb-page-placeholder.component';
import {TestingModule} from '../../testing/testing-module';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('JbPagePlaceholderComponent', () => {
  let component: JbPagePlaceholderComponent;
  let fixture: ComponentFixture<JbPagePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbPagePlaceholderComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbPagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('jbProfile', () => {

    it('Should build the fakeProfile with default jbSelector', () => {
      component.jbProfile();
      expect(component.fakeProfile.length).toBe(5);
      expect(component.fakeProfile[0].row).toBe('avatar');
      expect(component.fakeProfile[2].row).toBe('data');
      expect(component.fakeProfile[4].row).toBe('info');
    });

    it('Should build the fakeProfile with "Avatar" object', () => {
      component.jbSections = ['avatar'];
      component.jbProfile();
      expect(component.fakeProfile.length).toBe(1);
      expect(component.fakeProfile[0]).toEqual({
        row: 'avatar', classRow: 'placeholder-profile_avatar',
        list: [ 'profile_avatar marB20', 'profile_title marB5',
                'profile_subtitle marB30', 'profile_text1 marB10',
                'profile_text2 marB10' ],
        dataList: []
      });
    });

    it('Should build the fakeProfile with "data" object', () => {
      component.jbSections = ['data'];
      component.jbProfile();
      expect(component.fakeProfile.length).toBe(1);
      expect(component.fakeProfile[0].row).toBe('data');
      expect(component.fakeProfile[0].classRow).toBe('placeholder-profile_data');
      expect(component.fakeProfile[0].list.length).toBe(0);
      expect(component.fakeProfile[0].dataList.length).toBeGreaterThanOrEqual(1);
      expect(component.fakeProfile[0].dataList.length).toBeLessThanOrEqual(3);
    });

    it('Should build the fakeProfile with "info" object', () => {
      component.jbSections = ['info'];
      component.jbProfile();
      expect(component.fakeProfile.length).toBe(1);
      expect(component.fakeProfile[0].row).toBe('info');
      expect(component.fakeProfile[0].classRow).toBe('placeholder-profile_info');
      expect(component.fakeProfile[0].list.length).toBe(4);
    });

    it('Should build the fakeProfile with "info-center" object', () => {
      component.jbSections = ['info-center'];
      component.jbProfile();
      expect(component.fakeProfile.length).toBe(1);
      expect(component.fakeProfile[0].row).toBe('info-center');
      expect(component.fakeProfile[0].classRow).toBe('placeholder-profile_info-center');
      expect(component.fakeProfile[0].list.length).toBe(4);
    });
  });

  it('Should build the fakeProfile with  jbDetails methods', () => {
    component.jbDetails();
    expect(component.fakeDetails.columns.length).toBe(2);
    expect(component.fakeDetails.columns[0].col).toBe('col-6');
    expect(component.fakeDetails.columns[0].colList.length).toBe(6);
    expect(component.fakeDetails.columns[1].col).toBe('col-6');
    expect(component.fakeDetails.columns[1].colList.length).toBe(6);
  });
});
