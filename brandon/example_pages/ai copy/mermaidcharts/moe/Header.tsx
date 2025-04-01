import React from 'react';

const Header = () => {
  return (
    <div className="mt-16 tech-card p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-orbitron font-semibold mb-4 gradient-text">
        How do Large Language Models use Mixture of Experts?
      </h2>
      <p className="leading-relaxed">
        Mixture of Experts (MoE) represents a breakthrough approach in language model architecture.
        Unlike traditional models that process all inputs through the same neural pathways,
        MoE systems dynamically route different types of queries to specialized expert networks.
        The process begins with tokenization of input text, followed by a sophisticated routing
        network that determines which experts are best suited for each token. These specialized
        experts process the information in parallel, with their outputs being intelligently
        combined to produce the final response. This architecture offers both improved efficiency
        and performance by allowing the model to leverage different expert networks for different
        types of tasks, rather than using a one-size-fits-all approach.
      </p>
    </div>
  );
};

export default Header;
