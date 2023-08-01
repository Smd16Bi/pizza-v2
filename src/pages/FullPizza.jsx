import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getFullPizza() {
      try {
        const res = await fetch(`https://64b7542edf0839c97e16820e.mockapi.io/pizza/${id}`);
        const data = await res.json();
        setData(data)
      } catch (error) {
        navigate("/pizza-v2")
      }
    }
    getFullPizza()
  }, [])

  if (data === undefined) {
    navigate("/pizza-v2");
    return
  }

  return (
    <>
      {data &&
        <div className='container'>
          <img src={data.imageUrl} alt={data.title} loading='lazy' />
          <h2>{data.title}</h2>
          <h2>{data.price} $</h2>
        </div>
      }
    </>
  )
}

export default FullPizza