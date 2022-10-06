import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const chainHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value }).then((res) => {
      if (res.data.success) {
        setLists([...lists, res.data]);
        setValue("");
      }
    });
  };

  useEffect(() => {
    axios.get("/api/values").then((res) => {
      setLists(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists.map((list, i) => {
            return <li key={i}>{list.value}</li>;
          })}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Please enter it..."
              onChange={chainHandler}
              value={value}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
