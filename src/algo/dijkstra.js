// 0 - unvisited node
// 1 - visited node
// 2 - blocker node
// 3 - start node
// 4 - end node
// 5 - shortest path node

export function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];

    startNode.distance = 0;
    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closest = unvisitedNodes.shift();

        if (closest.type === 2) continue;

        if (closest.distance === Infinity) return visitedNodes;

        closest.type = 1;
        if (closest === endNode) return visitedNodes;
        updateNeighborsDistance(closestNode, grid);
    };
};

