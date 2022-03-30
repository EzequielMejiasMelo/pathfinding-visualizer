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
    const unvisitedNodes = [];

    startNode.distance = 0;
    startNode.fScore = manhattan(startNode, endNode);
    unvisitedNodes.push(startNode);

    while (!!unvisitedNodes.length){
        sortNodes(unvisitedNodes);

        const closest = unvisitedNodes.shift();

        visitedNodes.push(closest);
        console.log(closest === endNode);
        if (closest === endNode) return visitedNodes;
        closest.type = 1;
        
        const neighbors = getNeighbors(closest, grid).filter(neighbor => neighbor.type !== 2);
        
        for (const neighbor of neighbors){
            const gScore = closest.distance + 1;
            const checkVisited = neighbor.type === 1;

            if (!checkVisited || gScore < neighbor.distance){
                neighbor.type = 1;
                neighbor.previous = closest;
                neighbor.distance = gScore;
                neighbor.fScore = neighbor.distance + manhattan(neighbor, endNode);

                if(!checkVisited){
                    unvisitedNodes.push(neighbor);
                } else {
                    sortNodes(unvisitedNodes);
                }
            }
        }

    }
};

// Calculate Manhattan distance
function manhattan(node1, node2){
    return Math.abs(node1.row - node2.row) + Math.abs(node1.column - node2.column);
};

//Sorts nodesn by their f-score
function sortNodes(nodes) {
    nodes.sort((a, b) => a.fScore - b.fScore);
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
