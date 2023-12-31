import './scss/app.scss';

import { Header } from './components';
import { Cart, Home, Notfound, FullPizza } from './pages';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/pizza-v2" element={<Home />} />
          <Route path="/pizza-v2/:id" element={<FullPizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
