import React from 'react'
import { useDispatch } from 'react-redux'
import Svg from '../Svg'
import { changeCount, removeItem } from '../../redux/slices/cartSlice';

function CartItem({ imageUrl, title, type, size, uniqId, count, price }) {
  const dispatch = useDispatch();

  const onChangeCount = (event) => {
    const type = event.target.closest(".button").dataset.name;
    const settings = {
      type: type,
      id: uniqId
    }
    dispatch(changeCount(settings));
  }

  const onClickRemove = () => {
    dispatch(removeItem(uniqId))
  }


  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <div data-name="minus" className="button button--outline button--circle cart__item-count-minus"
          onClick={onChangeCount}
        >
          <Svg type="minus" />
        </div>
        <b>{count}</b>
        <div data-name="plus" className="button button--outline button--circle cart__item-count-plus"
          onClick={onChangeCount}
        >
          <Svg type="plus" />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} $</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle"
          onClick={onClickRemove}>
          <Svg type="remove" />
        </div>
      </div>
    </div>
  )
}

export default CartItem