import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const {
    cuisineDataState,
    currentCuisine,
    setCurrentCuisine,
    restaurantsDataState,
  } = useContext(DataContext);

  return (
    <div>
      <div className='text-center'>
        <h1>Food Ordering App</h1>
        <br />
        <h2>Select Your Cuisine:</h2>
        <div className='btn-group my-3' role='group'>
          {cuisineDataState.length &&
            cuisineDataState.map((cuisine) => (
              <button
                onClick={() => {
                  setCurrentCuisine(cuisine.id);
                }}
                className='btn btn-primary'
                key={cuisine.id}
              >
                {cuisine.name}
              </button>
            ))}
        </div>
      </div>
      <div>
        {restaurantsDataState
          .filter(({ cuisine_id }) => cuisine_id === currentCuisine)
          .map((restaurant) => {
            return (
              <div className='my-5' key={restaurant.id}>
                <Link
                  className='text-decoration-none text-reset'
                  to={`/${restaurant.id}`}
                >
                  <h3>{restaurant.name}</h3>
                  <br />
                  <div className='row'>
                    {restaurant.menu.map((item) => {
                      return (
                        <div key={item.name} className='col'>
                          <div className='card' style={{ width: '18rem' }}>
                            <img
                              src={item.imgSrc}
                              className='card-img-top'
                              alt={item.name}
                            />
                            <div className='card-body'>
                              <h5 className='card-title'>{item.name}</h5>
                              <div className='card-body'>
                                <p className='card-text'>
                                  Rs. {item.price} for two
                                </p>
                                <p className='card-text'>{restaurant.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
