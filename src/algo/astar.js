// 0 - unvisited node
// 1 - visited node
// 2 - blocker node
// 3 - start node
// 4 - end node
// 5 - shortest path node

// Sorting algorithm knows the location of the end node
// Further refinement: Implement min-heap or priority queue instead of constantly sorting
// Returns all of the nodes we visited
export function aStar(grid, startNode, endNode) {
    const visitedNodes = [];

    startNode.distance = 0;
    startNode.fScore = 0;
    const unvisitedNodes = [startNode];
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closest = unvisitedNodes.shift();

        if (closest.type === 2) continue;

        if (closest.distance === Infinity) return visitedNodes;

        closest.type = 1;
        visitedNodes.push(closest);
        if (closest === endNode) return visitedNodes;
        const neighbors = updateNeighborsDistance(closest, grid, endNode);
        unvisitedNodes.concat(neighbors);
    }
};



// Calculate Manhattan distance
function manhattan(node1, node2){
    return Math.abs(node1[0] - node2[0]) + Math.abs(node1[1] - node2[1]);
};

//Sorts nodesn by their f-score
function sortNodes(nodes) {
    nodes.sort((a, b) => a.fScore - b.fScore);
};

//Updates the distance for each neighbor and sets previous so we can backtrack when looking for the solved path
function updateNeighborsDistance(node, grid, endNode) {
    const neighbors = getNeighbors(node, grid).filter(neighbor => neighbor.type !== 1);

    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.fScore = neighbor.distance + manhattan(neighbor, endNode);
        neighbor.previous = node;
    };

    return neighbors;
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