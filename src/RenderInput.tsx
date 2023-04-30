import React, { useState } from "react";

type Props = {
  outputConsole: (inputValue: string) => void;
};

const RenderInput = (props: Props) => {
  const { outputConsole } = props;
  const [input, setInput] = useState("");
  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        data-testid="input"
        value={input}
        onChange={updateValue}
      />
      <button type="button" onClick={outputValue}>
        Console
      </button>
      <p data-testid="text">{input}</p>
    </div>
  );
};

export default RenderInput;
