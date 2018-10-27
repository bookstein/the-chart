import * as React from "react";

export class HtmlLayer extends React.Component {
  render() {
    const { className, children, cytoscape, style } = this.props;
    const zoom = cytoscape.zoom();
    const { x, y } = cytoscape.pan();
    const transformedStyle = {
      position: "absolute",
      zIndex: 1,
      transform: `translate(${x}px,${y}px) scale(${zoom})`,
      ...style
    };

    return (
      <div className={className} style={transformedStyle}>
        {React.Children.map(children, child => {
          const node = child.props.node;
          if (node && typeof node.isNode === "function" && node.isNode()) {
            const { x, y } = node.position();
            const width = node.width();
            const height = node.height();
            const left = x - width / 2;
            const top = y - height / 2;
            const style = {
              height,
              left,
              position: "absolute",
              top,
              width
            };
            return <div style={style}>{child}</div>;
          }

          return child;
        })}
      </div>
    );
  }
}
