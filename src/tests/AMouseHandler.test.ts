import { AMouseHandler } from 'models';
import React from 'react';
import { Observable } from 'rxjs';

class AMouseHandlerTestModel extends AMouseHandler {}

describe('AMouseHandler', () => {
  let model: AMouseHandler;

  beforeEach(() => {
    model = new AMouseHandlerTestModel();
  });

  describe('isMouseDown', () => {
    it('Should mouse be marked as not down by default', () => {
      expect(model['isMouseDown']).toBe(false);
    });

    it('Should mark that mouse is down', () => {
      expect(model['isMouseDown']).toBe(false);
      model.turnOnIsMouseDown();
      expect(model['isMouseDown']).toBe(true);
    });

    it('Should mark that mouse is now not down (default -> down -> not down)', () => {
      expect(model['isMouseDown']).toBe(false);
      model.turnOnIsMouseDown();
      expect(model['isMouseDown']).toBe(true);
      model.turnOffIsMouseDown();
      expect(model['isMouseDown']).toBe(false);
    });
  });

  it('fromMouseEvent: Should convert event to observable', () => {
    const trigger = 'mousemove';
    const element = document.createElement('div');
    const result$ = model.fromMouseEvent(element, trigger);

    expect(result$).toBeInstanceOf(Observable<React.MouseEvent<Element, MouseEvent>>);
  });
});
