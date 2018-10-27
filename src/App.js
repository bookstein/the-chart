import * as React from "react";
import { render } from "react-dom";
import { Cytoscape } from "./Cytoscape";
import { HtmlLayer } from "./HtmlLayer";
import { ChartElement } from "./ChartElement";

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
    css: {},
    style: {
      height: 58,
      shape: "rectangle",
      width: 252,
      opacity: 0,
      "background-color": "white"
    }
  }
];

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Welcome to the Chart</h2>
        <Cytoscape
          style={{ height: 490, width: 650, zIndex: 2 }}
          options={{
            elements: [
              // list of graph elements to start with
              {
                // node aaa
                data: {
                  name: "Alice Pieszecki",
                  id: "aaa"
                }
              },
              {
                // node bbb
                data: {
                  name: "Shane McCutcheon",
                  id: "bbb"
                }
              },
              {
                // edge aaabbb
                data: {
                  source: "aaa",
                  target: "bbb",
                  id: "aaabbb"
                }
              }
            ],
            layout: { name: "dagre" },
            style
          }}
        >
          {cytoscape => {
            // cytoscape here comes from Cytoscape.js - function passed in as children
            return (
              <HtmlLayer cytoscape={cytoscape}>
                {// .nodes() maps over a collection
                cytoscape.nodes().map(node => (
                  <ChartElement node={node} />
                ))}
              </HtmlLayer>
            );
          }}
        </Cytoscape>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
