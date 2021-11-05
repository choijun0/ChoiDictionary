import React, {useState} from "react"
import {scrap} from "Scrapper/Scrapper"

function App() {
  const [term, setTerm] = useState("");
  const changeHandler = ({target}) => {
    setTerm(target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    scrap(term)
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="입력" onChange={changeHandler} value={term}/>
      </form>
    </>
  );
}

export default App;
