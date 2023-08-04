import React, { Fragment } from 'react';
import { Categories, Pagination, PizzaBlock, PizzaLoading, Sort } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters, setSortType } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { fetchData, selectData } from '../redux/slices/dataSlice';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue, label } = useSelector(selectFilter);
  const { items, status } = useSelector(selectData);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onClickSort = (obj: {}) => {
    dispatch(setSortType(obj));
  };
  const onClickPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
    isSearch.current = false;
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getData();
      window.scrollTo(0, 0);
    }
  }, [categoryId, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort,
        categoryId: categoryId,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  async function getData() {
    const path = new URL(`https://64b7542edf0839c97e16820e.mockapi.io/pizza?page=${currentPage + 1}&limit=4`);
    if (categoryId === 0) {
      if (sort.id !== 0) {
        path.searchParams.append('search', searchValue);
        path.searchParams.append('sortBy', sort.property);
        path.searchParams.append('order', sort.how);
      }
    } else {
      if (searchValue) {
        path.searchParams.append('search', searchValue);
      } else {
        path.searchParams.append('category', String(categoryId));
      }
      path.searchParams.append('sortBy', sort.property);
      path.searchParams.append('order', sort.how);
    }
    dispatch(
      //@ts-ignore
      fetchData(path),
    );
  }

  const renderPizzas = () => {
    switch (status) {
      case 'loading':
        return [...new Array(6)].map((_, index) => <PizzaLoading key={index} />);
      case 'success':
        return items.map((obj: any) => {
          return (
            <div key={obj.id}>
              <NavLink to={obj.id}>Show more</NavLink>
              <PizzaBlock {...obj} />
            </div>
          );
        });

      case 'error':
        return (
          <div className="container__error-info">
            <h2>
              Error happens <span>😕</span>
            </h2>
            <p>You have to wait a bit</p>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onCategory={onClickCategory} />
          <Sort sort={sort.id} onSort={onClickSort} />
        </div>
        <h2 className="content__title">{label}</h2>
        <div className="content__items">{renderPizzas()}</div>
        <Pagination setCurrentPage={onClickPage} />
      </div>
    </>
  );
};

export default Home;
