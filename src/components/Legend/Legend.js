import React from 'react';

const Legend = () => {
    return (
        <section className="fs-4">
            <p className="p-2"><span><i className="fas fa-solid fa-play"></i> Start Node</span><span><i className="fas fa-solid fa-flag-checkered"></i> End Node</span><span><span className="empty"></span> Empty Node</span><span><span className="blocker"></span> Blocker Node</span><span><span className="explored"></span> Explored Node</span><span><span className="path"></span> Shortest Path</span></p>
            <p className="center">Choose an algorithm to visualize!</p>
        </section>
    );
};

export default Legend;