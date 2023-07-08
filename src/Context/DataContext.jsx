import { createContext, useState } from 'react';
import { cuisineData, restaurantsData } from '../Data/Data';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cuisineDataState, setCuisineDataState] = useState(cuisineData);
  const [restaurantsDataState, setRestaurantsDataState] =
    useState(restaurantsData);
  const [currentCuisine, setCurrentCuisine] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const getRestaurant = (restId) => {
    setSelectedRestaurant(
      restaurantsDataState.find(
        (restaurant) => restaurant.id.toString() === restId
      )
    );
  };

  const addReviewHandler = (restId, review) => {
    console.log(restId, review);
    const tempSelectedRestaurant = { ...selectedRestaurant };
    tempSelectedRestaurant.ratings = [
      ...tempSelectedRestaurant.ratings,
      review,
    ];
    setSelectedRestaurant(tempSelectedRestaurant);

    setRestaurantsDataState((prevState) =>
      prevState.reduce(
        (restData, currentData) =>
          currentData.id !== Number(restId)
            ? [...restData, currentData]
            : [...restData, tempSelectedRestaurant],
        []
      )
    );

    console.log(selectedRestaurant);
  };

  return (
    <DataContext.Provider
      value={{
        cuisineDataState,
        setCuisineDataState,
        restaurantsDataState,
        setRestaurantsDataState,
        currentCuisine,
        setCurrentCuisine,
        getRestaurant,
        selectedRestaurant,
        addReviewHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
