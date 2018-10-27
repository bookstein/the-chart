import React from "react";

export function ChartElement({ node }) {
  const name = node.data().name;
  const id = node.data().id;
  return (
    <div
      key={id}
      style={{
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: "3px",
        border: "1px solid gray"
      }}
      title={JSON.stringify(name)}
    >
      <p
        style={{
          fontSize: 12,
          fontFamily: "sans-serif",
          marginTop: 5,
          color: "gray"
        }}
      >
        {name}
      </p>
    </div>
  );
}
