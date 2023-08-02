import React from 'react';
import { Link } from 'react-router-dom';

import cartImage from '../../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart is empty <span>😕</span>
        </h2>
        <p>
          Most likely, you have not ordered pizza yet. <br />
          To order a pizza, go to the main page.
        </p>
        <img src={cartImage} alt="Empty cart" />
        <Link to="/pizza-v2" className="button button--black 123">
          <span>Go link</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
