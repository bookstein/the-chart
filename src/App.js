import * as React from "react";
import { render } from "react-dom";
import { Cytoscape } from "./Cytoscape";
import elements from "./elements";
import entities from "./entities";
import { Entity } from "./Entity";
import * as cytoscape from "cytoscape";
import { HtmlLayer } from "./HtmlLayer";

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
        <Cytoscape
          style={{ height: 490, width: 650, zIndex: 2 }}
          options={{
            elements,
            layout: { name: "dagre" },
            style
          }}
        >
          {cytoscape => {
            return (
              <HtmlLayer cytoscape={cytoscape}>
                {cytoscape.nodes().map(node => (
                  <Entity node={node} entity={entities[node.data().id]} />
                ))}
                <div style={{ left: 1000 }}>testing testing</div>
              </HtmlLayer>
            );
          }}
        </Cytoscape>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
