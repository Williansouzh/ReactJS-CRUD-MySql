import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'
import { Cards } from './components/cards/cards';
function App() {

  const [values, setValues] = useState();
  const [listGames, setListGames] = useState()

  const handleClickButton = ()=>{
    Axios.post("http://localhost:9001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response)=>{
      setListGames([
        ...listGames,
        {
          name: values.name,
          cost: values.cost,
          category: values.category,
        }
      ])
    })
  }

  const handleChangeValues = (value) =>{
    setValues(preValue=>({
      ...preValue,
      [value.target.name]: value.target.value
    }))
  }

  useEffect(()=>{
    Axios.get('http://localhost:9001/getCards').
    then((response)=>{
      setListGames(response.data)
    })
  }, [listGames])

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleChangeValues}
        />

        <button  
          onClick={handleClickButton}
          className="register-button">
          Cadastrar
        </button>
      </div>
      { typeof listGames !== "undefined" && 
       listGames.map((val)=>(
        <Cards
          key={val.id}
          setListGames={setListGames}
          listGames={listGames}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
       ))
      }
    </div>
  );
}

export default App;
