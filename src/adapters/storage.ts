export type StorageAdapter = {
    getItemArray: (key: string) => string[];
    setItemArray: (key: string, value: string[]) => void;
};

export const storage: StorageAdapter = {
    getItemArray: (key: string) => {
        const favoritesString = localStorage.getItem(key)
        return favoritesString?.length ? favoritesString.split(',') : []
    },
    setItemArray: (key: string, value) => localStorage.setItem(key, value.join(',')),
};

