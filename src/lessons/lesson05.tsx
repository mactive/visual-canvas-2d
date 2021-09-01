
import React from 'react';
import ReactRough, { Circle, Rectangle, Arc } from 'react-rough'

const RoughRef = React.createRef();


const Lesson05: React.FC = () => {

    return (
        <ReactRough width={400} height={400}>
            <Rectangle
                fill="red"
                height={80}
                width={80}
                x={15}
                y={15}
                fillWeight={2}
            />
            <Arc
                closed
                fill="green"
                height={180}
                start={3.141592653589793}
                stop={5.026548245743669}
                width={200}
                x={200}
                y={200}
            />
        </ReactRough>
    );
}

export default Lesson05