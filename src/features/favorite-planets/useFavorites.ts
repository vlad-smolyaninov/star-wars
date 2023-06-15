import {storage} from "adapters/storage";
import {useState} from "react";

export function useFavorites(): [string[], (id: string) => void] {
    const [favorites, setFavorites] = useState(storage.getItemArray('favorite'))

    const toggleFavorites = (id: string) => {
        let newFavorites = [];

        if (favorites.includes(id)) {
            newFavorites = favorites.filter((i) => i !== id)
        } else {
            newFavorites = [...favorites, id]
        }
        setFavorites(newFavorites)
        storage.setItemArray('favorites', newFavorites)
    }

    return [favorites, toggleFavorites]
}
