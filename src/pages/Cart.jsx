import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartEmpty, CartItem, Svg } from '../components'
import { clearItems, selectCart } from '../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice
  } = useSelector(selectCart);

  const renderCartItems = () => {
    return (
      items.map(item => {
        return (<CartItem key={item.uniqId} {...item} />)
      })
    )
  }
  const onClickClearItems = () => {
    dispatch(clearItems())
  }

  return (
    <div className='container container--cart'>
      {
        renderCartItems().length !== 0
          ? <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <Svg type="cart" />
                Cart</h2>
              <div className="cart__clear" onClick={onClickClearItems}>
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
          : <CartEmpty />
      }
    </div>
  )
}

export default Cart