import React, { Component } from "react";
import Node from "./Node";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      start: [14, 17],
      end: [14, 47],
      mouseClick: false,
    };
  }

  componentDidMount() {
    this.initialBoard();
  }

  initialBoard() {
    let grid = [];

    for (let row = 0; row < 30; row++) {
      const currRow = [];
      for (let col = 0; col < 66; col++) {
        const node = {
          row: row,
          column: col,
          rowCount: 30,
          columnCount: 66,
          type: 0,
          neighbors: [],
          distance: null,
          previous: null,
        };
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

  updateGridToBlocker(grid, row, col) {
    const newGrid = grid.slice();
    const oldNode = newGrid[row][col];
    const newNode = { ...oldNode, type: 2 };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  mouseDown = (row, col) => {
    const newGrid = this.updateGridToBlocker(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseClick: true });
  }

  mouseEnter = (row, col) => {
    if (!this.state.mouseClick) return;
    const newGrid = this.updateGridToBlocker(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  mouseUp = () => {
    this.setState({ mouseClick: false });
  }

  render() {
    return (
      <section className="grid-container">
        {this.state.grid.map((row) => {
          return row.map((node) => {
            return (
              <Node
                key={[node.row, node.column]}
                row={node.row}
                column={node.column}
                type={node.type}
                MouseDown={this.mouseDown}
                MouseEnter={this.mouseEnter}
                MouseUp={this.mouseUp}
              />
            );
          });
        })}
      </section>
    );
  }
}

export default Board;
