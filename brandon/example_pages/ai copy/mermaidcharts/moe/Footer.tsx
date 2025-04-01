import React from 'react';

const Footer = () => {
  return (
    <div className="mt-16 tech-card p-6">
      <h2 className="text-xl font-orbitron font-semibold mb-3 gradient-text">References & Further Reading</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href="https://arxiv.org/abs/2305.14705"
            className="hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mixture-of-Experts Meets Instruction Tuning: A Winning Combination for Large Language Models
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2308.00951"
            className="hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2112.00861"
            className="hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            GLaM: Efficient Scaling of Language Models with Mixture-of-Experts
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2401.04088"
            className="hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mixtral of Experts: Open-weight MoE LLM by Mistral AI
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
