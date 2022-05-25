import { createContext, Dispatch, useReducer, useState } from "react";

type filterState = {
  price: {
    from: number;
    to: number;
  };
  roomType: any;
  amenities: any;
  roomCount: any;
};

type filterAction = {
  type: string;
  payload: any;
};

const initialState = {
  price: {
    from: 100000,
    to: 100000000,
  },
  roomType: {
    "Rental Unit": false,
    Apartment: false,
    Loft: false,
    "Serviced Apartment": false,
    "Holiday home": false,
  },
  amenities: {
    hasPool: false,
    hasGym: false,
    hasWifi: false,
    hasConditioning: false,
    hasKitchen: false,
    hasWashingMachine: false,
    hasDedicatedWorkspace: false,
    acceptPet: false,
  },
  roomCount: {
    livingRoom: 0,
    bedroom: 0,
    bathroom: 0,
  },
};

const FilterContext = createContext<{
  filterDispatch: Dispatch<any>;
  filter: filterState;
}>({
  filterDispatch: (action: { type: string; payload: any }) => {},
  filter: initialState,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

function filterReducer(
  filterState: filterState,
  action: filterAction
): filterState {
  switch (action.type) {
    case "PRICE":
      return {
        ...filterState,
        price: action.payload,
      };

    case "ROOM_TYPE":
      return {
        ...filterState,
        roomType: action.payload,
      };

    case "AMENITIES":
      return {
        ...filterState,
        amenities: action.payload,
      };

    case "ROOM_COUNT":
      return {
        ...filterState,
        roomCount: action.payload,
      };

    default:
      break;
  }

  return filterState;
}

function FilterContextProvider({ children }: Props) {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider
      value={{
        filterDispatch: dispatch,
        filter: filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterContextProvider };
