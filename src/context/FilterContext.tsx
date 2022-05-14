import { createContext, Dispatch, useReducer, useState } from "react";

type filterState = {
  price: {
    from: number;
    to: number;
  };
  roomType: any;
  amenities: any;
  roomCount: {
    livingRoom: number;
    bedroom: number;
  };
  actionType: string;
};

type filterAction = {
  type: string;
  payload: any;
};

const initialState = {
  price: {
    from: 100000,
    to: 10000000,
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
    livingRoom: 1,
    bedroom: 1,
  },
  actionType: "",
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
        actionType: action.type,
      };

    case "ROOM_TYPE":
      return {
        ...filterState,
        roomType: action.payload,
        actionType: action.type,
      };

    case "AMENITIES":
      return {
        ...filterState,
        amenities: action.payload,
        actionType: action.type,
      };

    case "ROOM_COUNT":
      return {
        ...filterState,
        roomCount: action.payload,
        actionType: action.type,
      };

    case "ALL":
      return {
        ...filterState,
        ...action.payload,
        actionType: action.type,
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
