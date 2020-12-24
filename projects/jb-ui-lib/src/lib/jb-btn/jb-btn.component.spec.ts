import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { TestingModule } from '../../testing/testing-module';

import { JbBtnComponent } from './jb-btn.component';

describe('jbBtnComponent', () => {
  let component: JbBtnComponent;
  let fixture: ComponentFixture<JbBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbBtnComponent, NgbTooltip ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const checkType = (jbType, css, icon, text) => {
    component.jbType = jbType;
    const changes = {
      jbType: {
        previousValue: undefined,
        currentValue: jbType,
        firstChange: true,
      }
    };
    component.ngOnChanges(changes);
    expect(component.btnClass).toEqual(css);
    expect(component.typeIcon).toEqual(icon);
    expect(component.textLabel).toEqual(text);
  };


  it('should set custom jbType', () => {
    checkType('search',   'primary',    'icon-search',         'view.common.search');
    checkType('edit',     'primary',    'icon-pencil',         'view.common.edit');
    checkType('save',     'primary',    'icon-arrow-right',    'view.common.save');
    checkType('update',   'primary',    'icon-arrow-right',    'views.common.update');
    checkType('add',      'primary',    'icon-plus',           'view.common.add');
    checkType('delete',   'tertiary',   'icon-bin',            'view.common.delete');
    checkType('cancel',   'secondary',  'icon-blocked',        'view.common.cancel');
    checkType('view',     'primary',    'icon-eye',            'view.common.view');
    checkType('prev',     'quaternary', 'icon-arrow-left',     'view.common.previous');
    checkType('next',     'primary',    'icon-arrow-right',    'view.common.next');
    checkType('download', 'primary',    'icon-download',       'view.common.download');
    checkType('upload',   'primary',    'icon-upload',         'view.common.upload');
    checkType('reset',    'secondary',  'icon-blocked',        'view.common.resetFilters');
    checkType('refresh',  'primary',    'icon-loop2',          'view.common.refresh');
  });

});

