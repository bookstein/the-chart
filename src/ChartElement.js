import * as React from "react";
import * as cytoscape from "cytoscape";

export function ChartElement(props) {
  const { node, entity } = props;
  const { entityDomain, entityName, entityType } = entity;

  return (
    <div
      key={node.data().id}
      style={{
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: "3px",
        border: "1px solid gray"
      }}
      title={JSON.stringify(entity)}
    >
      <div style={{ backgroundColor: "rgb(171,191,131)", height: 5 }} />
      <div
        style={{
          float: "left",
          backgroundColor: "gray",
          margin: 16,
          width: 18,
          height: 18
        }}
      />
      <div
        style={{
          fontSize: 14,
          whiteSpace: "nowrap",
          fontFamily: "sans-serif",
          marginTop: 8
        }}
      >
        {entityName}
      </div>
      <div
        style={{
          fontSize: 12,
          fontFamily: "sans-serif",
          marginTop: 5,
          color: "gray"
        }}
      >
        {entityDomain.toLowerCase()} {entityType.toLowerCase()}
      </div>
    </div>
  );
}
