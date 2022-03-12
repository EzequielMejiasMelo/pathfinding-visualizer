import React, { Component } from "react";
import Node from "./Node";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { grid: [], start: [14, 17], end: [14, 47] };
  }

  componentDidMount() {
    this.clearBoard();
  }

  clearBoard() {
    let grid = [];

    for (let row = 0; row < 30; row++) {
      const currRow = [];
      for (let col = 0; col < 66; col++) {
        const node = {row: row, column: col, rowCount: 30, columnCount: 66, type: 0, neighbors: [], distance: null, previous: null};
        if (row === 14 && col === 17) {
          node.type = 3;
          currRow.push(node);
        } else if (row === 14 && col === 47) {
          node.type = 4;
          currRow.push(node);
        } else {
          node.type = 0;
          currRow.push(node);
        }
      }
      grid.push(currRow);
    }

    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <section className="grid-container">
        {grid.map((row) => {
          return row.map((node) => {
            return <Node key={[node.row, node.column]} row={node.row} column={node.column} type={node.type} />
          });
        })}
      </section>
    );
  }
}

export default Board;
