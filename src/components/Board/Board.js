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
        if (row === 14 && col === 17) {
          currRow.push(
            <Node key={[row, col]} row={row} column={col} type={3} />
          );
        } else if (row === 14 && col === 47) {
          currRow.push(
            <Node key={[row, col]} row={row} column={col} type={4} />
          );
        } else {
          currRow.push(
            <Node key={[row, col]} row={row} column={col} type={0} />
          );
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
          return row.map((col) => col);
        })}
      </section>
    );
  }
}

export default Board;
