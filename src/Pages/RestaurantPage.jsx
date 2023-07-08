import { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';

const RestaurantPage = () => {
  const { restId } = useParams();
  const { selectedRestaurant, getRestaurant, addReviewHandler } =
    useContext(DataContext);
  const [addReviewState, setAddReviewState] = useState({
    revName: `TheRandomUser - ${Math.random() * 100}`,
    pp: 'https://picsum.photos/200',
    comment: '',
    rating: 0,
  });

  const addReviewstateHandler = (event) => {
    setAddReviewState((prevState) => ({
      ...prevState,
      [event.target.id]:
        event.target.id === 'comment'
          ? event.target.value
          : Number(event.target.value),
    }));
    console.log(addReviewState);
  };
  useEffect(() => {
    getRestaurant(restId);
  }, []);

  return (
    <div>
      {/* Resturant Section */}
      {selectedRestaurant && (
        <>
          <div className='d-flex justify-content-between align-items-center'>
            {/* Restaurant Details */}
            <div>
              <h1>{selectedRestaurant.name}</h1>
              <p>
                {selectedRestaurant.menu.map((item) => (
                  <span
                    className='badge rounded-pill text-bg-dark me-2'
                    key={item.name}
                  >{`${item.name}`}</span>
                ))}
              </p>
              <p>Address: {selectedRestaurant.address}</p>
              <p>Phone: {selectedRestaurant.phone}</p>
              <p>
                Avg Rating:{' '}
                {Math.round(
                  selectedRestaurant.ratings.reduce(
                    (totalVal, currentRating) =>
                      totalVal + currentRating.rating,
                    0
                  ) / selectedRestaurant.ratings.length
                )}
              </p>
            </div>
            {/* Add Review Section */}
            <div>
              <button
                data-bs-toggle='modal'
                data-bs-target='#addReviewModal'
                type='button'
                className='btn btn-dark'
              >
                Add Review
              </button>
            </div>
          </div>
          <hr />
          <h2>Reviews</h2>
          {selectedRestaurant.ratings.map((review) => (
            <div key={review.revName + review.comment}>
              <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                  <img
                    src={review.pp}
                    className='rounded-circle'
                    style={{ width: '48px' }}
                  />
                  <h5 className='ms-3'>{review.revName}</h5>
                </div>
                <div>
                  <span
                    className={`badge ${
                      review.rating > 2.5 ? 'text-bg-success' : 'text-bg-danger'
                    }`}
                  >
                    <i className='bi bi-star-fill'></i> {review.rating}
                  </span>
                </div>
              </div>
              <div className='p-3'>{review.comment}</div>
              <hr />
            </div>
          ))}
        </>
      )}

      {/* Add Review Modal */}
      <div className='modal' tabIndex='-1' id='addReviewModal'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark text-light '>
            <div className='modal-header justify-content-center'>
              <h5 className='modal-title text-center'>Add Your Review</h5>
              <span
                type='button'
                className='position-absolute text-light'
                data-bs-dismiss='modal'
                style={{ top: '20px', left: '20px', color: 'white' }}
              >
                <i className='bi bi-x-circle'></i>
              </span>
            </div>
            <div className='modal-body'>
              <div className='d-flex align-items-center mb-3'>
                <label htmlFor='rating'>Rating:</label>
                <select
                  value={addReviewState.rating}
                  onChange={(event) => {
                    addReviewstateHandler(event);
                  }}
                  id='rating'
                  className='form-select ms-2'
                >
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <label htmlFor='comment'>Comment:</label>
                <input
                  onChange={(event) => {
                    addReviewstateHandler(event);
                  }}
                  type='text'
                  className='form-control ms-2'
                  id='comment'
                  value={addReviewState.comment}
                />
              </div>
            </div>
            <div className='modal-footer justify-content-center'>
              <button
                data-bs-dismiss='modal'
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  addReviewHandler(restId, addReviewState);
                  setAddReviewState((prevState) => {
                    return { ...prevState, comment: '', rating: 0 };
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Back Button */}
      <NavLink to={'/'}>
        <div
          className='position-absolute'
          style={{ top: '20px', left: '20px' }}
        >
          <i className='bi bi-arrow-left fs-2'></i>
        </div>
      </NavLink>
    </div>
  );
};

export default RestaurantPage;
