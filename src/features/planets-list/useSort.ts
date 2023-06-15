import {useState} from "react";
import {SortDirection} from "features/planets-list/types";

interface SortState<T> {
    sorted: T[];
    sortedField: keyof T | null;
    sortedDirection: SortDirection | null;
}

export const useSort = <T extends Record<string, any>>(initialData: T[]) => {
    const [sortState, setSortState] = useState<SortState<T>>({
        sorted: initialData,
        sortedField: null,
        sortedDirection: null,
    });

    const resetSorts = () => setSortState({
        sorted: initialData,
        sortedField: null,
        sortedDirection: null,
    })

    const onSortClick = (field: keyof T) => {
        const {sorted, sortedField, sortedDirection} = sortState;

        let direction: SortDirection = 'asc';
        if (sortedField === field && sortedDirection === 'asc') {
            direction = 'desc';
        }

        if (sortedField === field && sortedDirection === 'desc') {
            resetSorts()
            return
        }

        const sortedData = [...sorted];
        sortedData.sort((a, b) => {

            return (a[field] - b[field]) * (direction === 'asc' ? 1 : -1);
        });

        setSortState({
            sorted: sortedData,
            sortedField: field,
            sortedDirection: direction,
        });
    };

    return {onSortClick, ...sortState};
};