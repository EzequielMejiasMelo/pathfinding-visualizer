import React, { Component } from "react";
import { VisualizeContext } from "../../utils/VisualizeContext";
import { dijkstra, shortestPath } from "../../algo/dijkstra";
import { aStar } from "../../algo/astar";
import Node from "./Node";

class Board extends Component {
  static contextType = VisualizeContext;
  constructor(props) {
    super(props);
    this.visualizer = this.visualizer.bind(this);
    this.updatePaths = this.updatePaths.bind(this);
    this.initialBoard = this.initialBoard.bind(this);
    this.state = {
      grid: [],
      start: [14, 17],
      end: [14, 47],
      mouseClick: false,
      visited: [],
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

  removeVisitedClasses(visited) {
    for (let i=0; i < visited.length; i++){
      const node = visited[i];
      if (node.row === 14 && node.column === 17) {
        document.getElementById(`${node.row},${node.column}`).className = 'start';
      } else if (node.row === 14 && node.column === 47) {
        document.getElementById(`${node.row},${node.column}`).className = 'end';
      } else {
        document.getElementById(`${node.row},${node.column}`).className = 'empty';
      };
    }

    const blockers = document.querySelectorAll('.blocker');
    console.log(blockers);
    for (const block of blockers){
      if (block.nodeName === 'SPAN') continue;
      block.className = 'empty';
    }

    return;
  }

  updateGridToBlocker(grid, row, col) {
    const newGrid = grid.slice();
    const oldNode = newGrid[row][col];
    const newNode = oldNode.type !== 2 ? { ...oldNode, type: 2 } : {...oldNode, type: 0};
    newGrid[row][col] = newNode;
    return newGrid;
  }

  mouseDown = (row, col) => {
    const { visualize, visualized } = this.context;
    if (visualize || visualized) return;
    if (this.state.grid[row][col].type === 3) return;
    if (this.state.grid[row][col].type === 4) return;
    const newGrid = this.updateGridToBlocker(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseClick: true });
  }

  mouseEnter = (row, col) => {
    /* Check if node is start node and move it */
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
        if (node.row === 14 && node.column === 17) {
          document.getElementById(`${node.row},${node.column}`).className = 'start-explored';
        } else if (node.row === 14 && node.column === 47) {
          document.getElementById(`${node.row},${node.column}`).className = 'end-explored';
        } else {
          document.getElementById(`${node.row},${node.column}`).className = 'explored';
        };
      }, 5 * i);
    }
  }

  updateShortest(shortestPath){
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (node.row === 14 && node.column === 17) {
          document.getElementById(`${node.row},${node.column}`).className = 'start-path';
        } else if (node.row === 14 && node.column === 47) {
          document.getElementById(`${node.row},${node.column}`).className = 'end-path';
        } else {
          document.getElementById(`${node.row},${node.column}`).className = 'path';
        };
      }, 50 * i);
      
    }
  }

  visualizer(grid, setVisualize, start, end, algorithm) {
    setVisualize();
    const startNode = grid[start[0]][start[1]];
    const endNode = grid[end[0]][end[1]];
    let visitedNodes;
    if (algorithm === 'dijkstra'){
      visitedNodes = dijkstra(grid, startNode, endNode);
    } else if (algorithm === 'aStar'){
      visitedNodes = aStar(grid, startNode, endNode)
    };
    const shortestPathNodes = shortestPath(endNode);
    this.setState({visited: visitedNodes});
    this.updatePaths(visitedNodes, shortestPathNodes);
  }

  render() {
    const {grid, start, end, visited} = this.state;
    const { visualize, algorithm, setVisualize, clearBoard, setClearBoard } = this.context;
    const {visualizer, initialBoard, removeVisitedClasses} = this;

    if(clearBoard){
      console.log('Clearing Board');
      setClearBoard();
      initialBoard();
      removeVisitedClasses(visited);
    };
    return (
      <>
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
      {visualize && algorithm !== '' ? visualizer(grid, setVisualize, start, end, algorithm) : null}
      </>
    );
  }
}

export default Board;
