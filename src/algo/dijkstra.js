// 0 - unvisited node
// 1 - visited node
// 2 - blocker node
// 3 - start node
// 4 - end node
// 5 - shortest path node

// Most common sorting alorithm, does not know the location of the end node
// Algorithm essentially swarms outwards from the start node
// Further refinement: Implement min-heap or priority queue instead of constantly sorting
// Returns all of the nodes we visited
export function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];

    startNode.distance = 0;
    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closest = unvisitedNodes.shift();

        //If the node is a blocker, we cannot pass so we should continue to next node
        if (closest.type === 2) continue;

        //If the node distance is infinity, we we are blocked on all sides
        if (closest.distance === Infinity) return visitedNodes;

        closest.type = 1;
        visitedNodes.push(closest);
        if (closest === endNode) return visitedNodes;
        updateNeighborsDistance(closest, grid);
    };
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

//Updates the distance for each neighbor and sets previous so we can backtrack when looking for the solved path
function updateNeighborsDistance(node, grid) {
    const neighbors = getNeighbors(node, grid).filter(neighbor => neighbor.type !== 1);

    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    };
}

// Excludes diagonals
function getNeighbors(node, grid){
    const neighbors = [];

    //Node below
    if (node.row < node.rowCount - 1 && grid[node.row+1][node.column].type !== 2){
        neighbors.append(grid[node.row+1][node.column]);
    }
    //Node above
    if (node.row > 0 && grid[node.row-1][node.column].type !== 2){
        neighbors.append(grid[node.row-1][node.column]);
    }
    //Node to the right
    if (node.column < node.columnCount - 1 && grid[node.row][node.column+1].type !== 2) {
        neighbors.append(grid[node.row][node.column+1]);
    }
    //Node to the left
    if (node.column > 0 && grid[node.row][node.column-1].type !== 2){
        neighbors.append(grid[node.row][node.column-1]);
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