import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import RenderInput from "./RenderInput";
import { FrameworkList } from "FrameworkList";
import { UseEffectRender } from "UseEffectRender";
import { MockServer } from "MockServer";
import { MyRedux } from "MyRedux";
import { ReduxAsync } from "ReduxAsync";

function App() {
  const data = [
    {
      id: 1,
      item: "react",
    },
    {
      id: 2,
      item: "redux",
    },
    {
      id: 3,
      item: "redux-toolkit",
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Counter />
        <RenderInput outputConsole={console.log} />
        <FrameworkList frameworks={data} />
        <UseEffectRender />
        <MockServer />
        <MyRedux />
        <ReduxAsync />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
