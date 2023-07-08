import { createContext, useState } from 'react';
import { cuisineData, restaurantsData } from '../Data/Data';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cuisineDataState, setCuisineDataState] = useState(cuisineData);
  const [restaurantsDataState, setRestaurantsDataState] =
    useState(restaurantsData);
  const [currentCuisine, setCurrentCuisine] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  return (
    <DataContext.Provider
      value={{
        cuisineDataState,
        setCuisineDataState,
        restaurantsDataState,
        setRestaurantsDataState,
        currentCuisine,
        setCurrentCuisine,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
