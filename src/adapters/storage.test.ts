import {storage} from './storage';

describe('storageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty array when the item does not exist', () => {
    const result = storage.getItemArray('favorites');
    expect(result).toEqual([]);
  });

  it('should return the array value when the item exists', () => {
    const favorites = ['item1', 'item2', 'item3'];
    localStorage.setItem('favorites', favorites.join(','));

    const result = storage.getItemArray('favorites');
    expect(result).toEqual(favorites);
  });

  it('should set the array value in localStorage', () => {
    const favorites = ['item1', 'item2', 'item3'];

    storage.setItemArray('favorites', favorites);

    const result = localStorage.getItem('favorites');
    expect(result).toBe(favorites.join(','));
  });
});
