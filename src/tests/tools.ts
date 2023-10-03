import { TestScheduler } from 'rxjs/testing';

export const makeTestScheduler = (showLog: boolean = false) =>
  new TestScheduler((actual, expected) => {
    showLog &&
      console.log('[LOG] makeTestScheduler:\n ---> actual', actual, '\n --> expected', expected);
    expect(actual).toEqual(expected);
  });
