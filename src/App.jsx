import { Route, Routes } from 'react-router-dom';
import RestaurantPage from './Pages/RestaurantPage';
import Homepage from './Pages/Homepage';

import './App.css';

function App() {
  return (
    <div className='container p-5'>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/:restId' element={<RestaurantPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
