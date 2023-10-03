import { TestScheduler } from 'rxjs/testing';

export const makeTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
    console.log('actual', actual, 'expected', expected);
  });
