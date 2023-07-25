import React from 'react';
import axios from 'axios';
import { Categories, Pagination, PizzaBlock, PizzaLoading, Sort } from '../components';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setSortType } from '../redux/slices/filterSlice';


const Home = () => {
  // Hook React
  const { searchValue, setSearchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [label, setLabel] = React.useState("All");
  const [isLoading, setIsLoading] = React.useState(true);
  // Redux
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort);
  const currentPage = useSelector(state => state.filter.currentPage);
  const dispatch = useDispatch();
  // Method
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onClickSort = (obj) => {
    dispatch(setSortType(obj))
  }
  const onClickPage = (page) => {
    dispatch(setCurrentPage(page))
  }
  React.useEffect(() => {
    setIsLoading(true);
    getData()
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  async function getData() {
    const path = new URL(`https://64b7542edf0839c97e16820e.mockapi.io/pizza?page=${currentPage + 1}&limit=4`);
    if (categoryId === 0) {
      if (sortType !== 0) {
        path.searchParams.append('search', searchValue);
        path.searchParams.append('sortBy', sortType.property);
        path.searchParams.append('order', sortType.how);
      }
    } else {
      if (searchValue) {
        path.searchParams.append('search', searchValue);
      } else {
        path.searchParams.append('category', categoryId);
      }
      path.searchParams.append('sortBy', sortType.property);
      path.searchParams.append('order', sortType.how);
    }

    const response = await axios.get(path);
    const data = await response.data;
    setIsLoading(false);
    setItems(data);
  }

  const handlerLabel = (label) => {
    setLabel(prev => prev = label);
  }

  const renderPizzas = () => {
    return (
      isLoading
        ?
        [...new Array(6)].map((_, index) => <PizzaLoading key={index} />)
        :
        items.map(obj => {
          return (
            <PizzaBlock
              {...obj}
              key={obj.id}
            />
          )
        })

    )
  }
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories onHandlerLabel={handlerLabel} categoryId={categoryId} onCategory={onClickCategory} onSearch={setSearchValue} />
          <Sort sort={sortType.id} onSort={onClickSort} />
        </div>
        <h2 className="content__title">{label}</h2>
        <div className="content__items">
          {renderPizzas()}
        </div>
        <Pagination setCurrentPage={onClickPage} />
      </div>
    </>
  )
}


export default Home