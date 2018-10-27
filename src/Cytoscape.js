import * as React from "react";
import { findDOMNode } from "react-dom";
import * as cytoscape from "cytoscape";
import * as dagre from "cytoscape-dagre";

cytoscape.use(dagre); // use extension 'dagre' (graph layout - https://github.com/cytoscape/cytoscape.js-dagre)

export class Cytoscape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cytoscape: cytoscape({}) // initiatize with empty options
    };
  }

  componentDidMount() {
    const cy = cytoscape({
      ...this.props.options,
      container: findDOMNode(this)
    });
    cy.on("layoutstop render pan zoom viewport resize", event => {
      this.setState({ cytoscape: event.cy });
    });
    if (this.props.options.layout) {
      cy.layout(this.props.options.layout).run();
    }
    this.setState({ cytoscape: cy });
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.options.layout &&
      nextProps.options.layout &&
      this.props.options.layout.name !== nextProps.options.layout.name
    ) {
      this.state.cytoscape.layout(this.props.options.layout).run();
    }
  }

  componentWillUnmount() {
    this.state.cytoscape.destroy();
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {typeof this.props.children === "function"
          ? this.props.children(this.state.cytoscape)
          : this.props.children}
      </div>
    );
  }
}
