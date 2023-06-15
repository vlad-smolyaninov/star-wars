import { renderHook, act } from '@testing-library/react';
import { useSort } from 'features/planets-list/useSort';

describe('useSort', () => {
  interface Planet {
    name: string;
    diameter: number;
    population: number;
  }

  const initialData: Planet[] = [
    { name: 'Planet A', diameter: 100, population: 1000 },
    { name: 'Planet B', diameter: 200, population: 2000 },
    { name: 'Planet C', diameter: 300, population: 3000 },
  ];

  it('should sort the data in ascending order when clicked once', () => {
    const { result } = renderHook(() => useSort<Planet>(initialData));

    act(() => {
      result.current.onSortClick('diameter');
    });

    expect(result.current.sorted).toEqual([
      { name: 'Planet A', diameter: 100, population: 1000 },
      { name: 'Planet B', diameter: 200, population: 2000 },
      { name: 'Planet C', diameter: 300, population: 3000 },
    ]);
    expect(result.current.sortedField).toBe('diameter');
    expect(result.current.sortedDirection).toBe('asc');
  });

  it('should sort the data in descending order when clicked twice', () => {
    const { result } = renderHook(() => useSort<Planet>(initialData));

    act(() => {
      result.current.onSortClick('diameter');
    });

    act(() => {
      result.current.onSortClick('diameter');
    });

    expect(result.current.sorted).toEqual([
      { name: 'Planet C', diameter: 300, population: 3000 },
      { name: 'Planet B', diameter: 200, population: 2000 },
      { name: 'Planet A', diameter: 100, population: 1000 },
    ]);
    expect(result.current.sortedField).toBe('diameter');
    expect(result.current.sortedDirection).toBe('desc');
  });

  it('should reset the sorting when clicked twice on the same field', () => {
    const { result } = renderHook(() => useSort<Planet>(initialData));

    act(() => {
      result.current.onSortClick('diameter');
    });

    act(() => {
      result.current.onSortClick('diameter');
    });

    act(() => {
      result.current.onSortClick('diameter');
    });

    expect(result.current.sorted).toEqual(initialData);
    expect(result.current.sortedField).toBe(null);
    expect(result.current.sortedDirection).toBe(null);
  });
});
