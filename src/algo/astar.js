export function aStar(grid, startNode, endNode) {
    const visitedNodes = [];

    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closest = unvisitedNodes.shift();

        if (closest.type === 2) continue;
    }
};

// Calculate Manhattan distance
function heuristic(node1, node2){
    return Math.abs(node1[0] - node2[0]) + Math.abs(node1[1] - node2[1]);
};

function getNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row){
            nodes.push(node);
        };
    };
    return nodes;
};

function sortNodes(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
};

function updateNeighborsDistance(node, grid) {
    const neighbors = getNeighbors(node, grid).filter(neighbor => neighbor.type !== 1);

    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    };
};

// Excludes diagonals
function getNeighbors(node, grid){
    const neighbors = [];

    //Node below
    if (node.row < node.rowCount - 1 && grid[node.row+1][node.column].type !== 2){
        neighbors.push(grid[node.row+1][node.column]);
    }
    //Node above
    if (node.row > 0 && grid[node.row-1][node.column].type !== 2){
        neighbors.push(grid[node.row-1][node.column]);
    }
    //Node to the right
    if (node.column < node.columnCount - 1 && grid[node.row][node.column+1].type !== 2) {
        neighbors.push(grid[node.row][node.column+1]);
    }
    //Node to the left
    if (node.column > 0 && grid[node.row][node.column-1].type !== 2){
        neighbors.push(grid[node.row][node.column-1]);
    }

    return neighbors;
};

export function shortestPath(endNode) {
    const path = [];
    let curr = endNode;

    while (curr !== null) {
        path.unshift(curr);
        curr = curr.previous;
    };

    return path;
};