import React from 'react';

import { useVisualize } from '../../utils/VisualizeContext';

const Legend = () => {
    const { algorithm } = useVisualize();
    console.log(algorithm);

    return (
        <section className="fs-4">
            <p className="p-2"><span><span className='start'></span> Start Node</span><span><span className='end'></span> End Node</span><span><span className="empty"></span> Empty Node</span><span><span className="blocker"></span> Blocker Node</span><span><span className="explored"></span> Explored Node</span><span><span className="path"></span> Shortest Path</span></p>
            <p className="center">{algorithm === 'dijkstra' ? 'Dijkstra guarantees the shortest path from a the start node to all other nodes on the graph!' : 'Choose an algorithm to visualize!'}</p>
        </section>
    );
};

export default Legend;