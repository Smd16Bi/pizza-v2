import React from "react"
import { useDispatch } from 'react-redux'
import { setLabel, setSearchValue } from '../../redux/slices/filterSlice'


const allCategories = ["All", "Meat", "Vegetarian", "Grill", "Sharp", "Closed"];

function Categories({ categoryId, onCategory }) {
  const dispatch = useDispatch();

  const onClickCategory = (index) => {
    onCategory(index);
    dispatch(setLabel(allCategories[index]))
    dispatch(setSearchValue(""))
  }


  const renderHtmlCategories = () => {
    return (
      allCategories.map((el, index) => {
        return (
          <li
            key={`${el}_${index}`}
            className={categoryId === index ? "active" : ""}
            onClick={() => { onClickCategory(index) }}>
            {el}
          </li>
        )
      })
    )
  }

  return (
    <div className="categories">
      <ul>
        {renderHtmlCategories()}
      </ul>
    </div>
  )
}

export default Categories