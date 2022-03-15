import React, { Component } from "react";
import { dijkstra, shortestPath } from "../../algo/dijkstra";
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
    console.log('Building board');
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
          distance: Infinity,
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
    const newNode = oldNode.type !== 2 ? { ...oldNode, type: 2 } : {...oldNode, type: 0};
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

  updatePaths(visited, shortestPath){
    for (let i = 0; i <= visited.length; i++){
      if (i === visited.length){
        setTimeout(() => {
          this.updateShortest(shortestPath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visited[i];
        document.getElementById(`[${node.row}, ${node.column}]`).className = 'explored';
      }, 5 * i);
    }
  }

  updateShortest(shortestPath){
    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`[${node.row}, ${node.column}]`).className = 'path';
      }, 50 * i);
      
    }
  }

  visualizer() {
    const { grid } = this.state;
    const startNode = grid[this.start[0]][this.start[1]];
    const endNode = grid[this.end[0]][this.end[1]];
    const visitedNodes = dijkstra(grid, startNode, endNode);
    const shortestPathNodes = shortestPath(endNode);
    this.updatePaths(visitedNodes, shortestPathNodes);
  }

  render() {
    console.log(this.state.grid);
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
