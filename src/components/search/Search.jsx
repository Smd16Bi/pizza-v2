import React from 'react'
import styles from "./Search.module.scss"
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef("");

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 1000),
    [],
  );
  const handleSearch = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value)
  }
  const handleClearSearch = () => {
    dispatch(setSearchValue(""))
    setValue("");
    inputRef.current.focus();
  }
  const categoryId = useSelector(state => state.filter.categoryId);

  React.useEffect(() => {
    setValue("");
  }, [categoryId]);

  return (
    <div className={styles.root} >
      <svg className={styles.icon} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1236_3882)">
          <path d="M5.92 11.34C8.91338 11.34 11.34 8.91338 11.34 5.92C11.34 2.92662 8.91338 0.5 5.92 0.5C2.92662 0.5 0.5 2.92662 0.5 5.92C0.5 8.91338 2.92662 11.34 5.92 11.34Z" stroke="#000001" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 13.5L9.75 9.75" stroke="#000001" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1236_3882">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <input
        ref={inputRef}
        onChange={handleSearch}
        value={value}
        className={styles.input}
        type="serch"
        placeholder='Search...'
      />
      {value.length !== 0
        && <span onClick={handleClearSearch} className={styles.clear}>X</span>
      }
    </div>
  )
}
export default Search