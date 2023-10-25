import { renderHook } from '@testing-library/react';
import { Observable } from 'rxjs';
import { useStateObservable } from 'tools';

describe('useStateObservable', () => {
  it('Should work without initial value', () => {
    const data = 11;
    const observable$ = new Observable((observer) => {
      observer.next(data);
      observer.complete();
    });

    const { result } = renderHook(() => useStateObservable(observable$));
    expect(result.current).toEqual(data);
  });

  it('Should work with initial value (without data from observable)', () => {
    const initialValue = 22;
    const observable$ = new Observable((observer) => {
      observer.complete();
    });

    const { result } = renderHook(() => useStateObservable(observable$, initialValue));
    expect(result.current).toEqual(initialValue);
  });

  it.only('Should work, when observable is changed', () => {
    const data1 = 11;
    const data2 = 22;
    const observable1$ = new Observable<number>((observer) => {
      observer.next(data1);
      observer.complete();
    });
    const observable2$ = new Observable<number>((observer) => {
      observer.next(data2);
      observer.complete();
    });

    const { result, rerender } = renderHook((data: Observable<number>) => useStateObservable(data), { initialProps: observable1$ });
    expect(result.current).toEqual(data1);

    rerender(observable2$);
    expect(result.current).toEqual(data2);
  });
});
