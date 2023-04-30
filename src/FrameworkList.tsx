import React, { FC } from "react";

type Props = {
  frameworks: {
    id: number;
    item: string;
  }[];
};

export const FrameworkList: FC<Props> = (props) => {
  if (!props.frameworks || !props.frameworks.length) {
    return <h1>No frameworks!</h1>;
  }
  return (
    <div>
      <ul>
        {props.frameworks.map((framework, index) => (
          <li key={index}>{framework.item}</li>
        ))}
      </ul>
    </div>
  );
};
