var fs = require("fs");

let data = [];

function btoa(str) {
  // If you need to convert to Base64 you could do so using Buffer:
  // console.log(Buffer.from('Hello World!').toString('base64'));
  // Reverse (assuming the content you're decoding is a utf8 string):
  // console.log(Buffer.from(b64Encoded, 'base64').toString());
  // `new Buffer` in Node v4
  return new Buffer(str).toString("base64");
}

function shapeNameAsNode(name) {
  const id = btoa(name);
  return {
    data: {
      label: name,
      id
    }
  };
}

function shapeNamesAsEdges(primaryName, names) {
  const edges = [];
  names.forEach(name => {
    const targetId = btoa(name);
    const sourceId = btoa(primaryName);
    edges.push({
      data: {
        name,
        inRelationshipWith: primaryName,
        source: sourceId,
        target: targetId,
        id: sourceId + targetId
      }
    });
  });
  return edges;
}

// where the first name in the array is the 'primary' name
const initialDataset = [
  ["Alice", "Lisa", "Dana"],
  ["Bette", "Tina", "Candace"],
  ["Tina", "Helena", "Bette"],
  ["Kit", "Angus"],
  ["Jenny", "Tim", "Max", "Marina"],
  ["Dana", "Lara", "Alice", "Tonya"],
  ["Shane", "Cherie", "Carmen"],
  ["Helena", "Tina", "Dylan"]
];

initialDataset.forEach(relationship => {
  const [name, ...lovers] = relationship;
  data = data.concat([shapeNameAsNode(name)]); // add character as node
  data = data.concat(lovers.map(name => shapeNameAsNode(name))); // add lovers as nodes
  data = data.concat(shapeNamesAsEdges(name, lovers)); // add edges
});

const json = JSON.stringify(data.filter(Boolean)); // remove nulls

console.log("data is:", json);

fs.writeFile("src/dataset.json", json, "utf8", function(err) {
  if (err) console.log(err);
  console.log("Successfully written to src/dataset.json.");
});
