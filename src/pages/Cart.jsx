import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem, Svg } from '../components'

const Cart = () => {
  const { items, totalCount, totalPrice
  } = useSelector(state => state.cart);

  const renderCartItems = () => {
    return (
      items.map(item => {
        return (<CartItem key={item.uniqId} {...item} />)
      })
    )
  }

  return (
    <div className='container container--cart'>
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <Svg type="cart" />
            Cart</h2>
          <div className="cart__clear">
            <Svg type="clear" />
            <span>Cleaning the cart</span>
          </div>
        </div>
        <div className="content__items">
          {renderCartItems()}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Total pizzas: <b>{totalCount}</b> </span>
            <span> Total price: <b>{totalPrice}$</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/pizza-v2" className="button button--outline button--add go-back-btn">
              <Svg type="back" />
              <span>Go back</span>
            </Link>
            <div className="button pay-btn">
              <span>Pay now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart