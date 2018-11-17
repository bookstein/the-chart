import * as React from "react";
import { render } from "react-dom";
import { Cytoscape } from "./Cytoscape";

const style = [
  {
    selector: "edge",
    css: {},
    style: {
      width: 1,
      "mid-target-arrow-shape": "circle",
      "curve-style": "bezier",
      "target-arrow-shape": "triangle"
    }
  },
  {
    selector: "node",
    css: {
      shape: "circle",
      width: 60, // 'mapData(weight, 40, 80, 20, 60)', // There's an error in the Cytoscape type definitions for this, so disabling.
      content: "data(label)",
      "text-valign": "center",
      "text-outline-width": 2,
      color: "#fff"
    }
  }
];

export default class App extends React.Component {
  render() {
    const dataset = require("./dataset.json");
    debugger;
    return (
      <React.Fragment>
        <h2>Welcome to the Chart</h2>
        <Cytoscape
          style={{ height: 1000, width: 1000, zIndex: 2 }}
          options={{
            elements: dataset,
            layout: { name: "dagre" },
            style
          }}
        />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
