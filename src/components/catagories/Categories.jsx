import React from "react"

const allCategories = ["All", "Meat", "Vegetarian", "Grill", "Sharp", "Closed"];

function Categories({ onHandlerLabel }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
    onHandlerLabel(allCategories[index])
  }


  const renderHtmlCategories = () => {
    return (
      allCategories.map((el, index) => {
        return (
          <li
            key={`${el}_${index}`}
            className={activeIndex === index ? "active" : ""}
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