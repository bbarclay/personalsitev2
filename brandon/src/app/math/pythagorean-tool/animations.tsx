import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTriangle = ({ a, b }: { a: number; b: number }) => {
    const hypotenuse = Math.sqrt(a * a + b * b);

    return (
        <motion.svg width="200" height="200" className="visualization" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.line
                x1="50"
                y1="150"
                x2="50"
                y2={150 - a}
                stroke="blue"
                strokeWidth="2"
                animate={{ y2: [150 - a, 150 - a, 150 - a] }}
                transition={{ duration: 1 }}
            />
            <motion.line
                x1="50"
                y1="150"
                x2={50 + b}
                y2="150"
                stroke="red"
                strokeWidth="2"
                animate={{ x2: [50 + b, 50 + b, 50 + b] }}
                transition={{ duration: 1 }}
            />
            <motion.line
                x1="50"
                y1={150 - a}
                x2={50 + b}
                y2="150"
                stroke="green"
                strokeWidth="2"
                animate={{ x2: [50 + b, 50 + b, 50 + b], y1: [150 - a, 150 - a, 150 - a] }}
                transition={{ duration: 1 }}
            />
        </motion.svg>
    );
};

export default AnimatedTriangle;
