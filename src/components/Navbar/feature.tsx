// pages/feature.tsx
import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { id: 1, title: 'Event 1', description: 'Description for event 1' },
  { id: 2, title: 'Event 2', description: 'Description for event 2' },
  { id: 3, title: 'Event 3', description: 'Description for event 3' },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Feature: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feature Timeline</h1>
      <motion.div
        className="timeline"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {events.map(event => (
          <motion.div
            key={event.id}
            className="timeline-event mb-4 p-4 border rounded"
            variants={item}
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Feature;
