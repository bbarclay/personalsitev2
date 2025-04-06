# Brandon's Personal Site v2

![Brandon's Personal Site](https://img.shields.io/badge/Brandon's-Personal%20Site-blue)
![Version](https://img.shields.io/badge/version-2.0.0-green)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

A modern, interactive personal website featuring a collection of educational tools for mathematics, AI, and more. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Interactive Math Tools**: Explore mathematical concepts through interactive visualizations
  - Collatz Conjecture Explorer
  - Graph Theory Explorer
  - Neural Network Visualizer
  - Prime Number Analysis
  - And many more!

- **AI Demonstrations**: Experience AI capabilities through interactive demos
  - Sentiment Analysis
  - Code Generation
  - Virtual Assistant
  - Image Creation
  - Story Generation

- **Educational Resources**: Learn through comprehensive explanations, visualizations, and resources

- **Responsive Design**: Optimized for all devices from mobile to desktop

- **Dark/Light Mode**: Choose your preferred viewing experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bbarclay/personalsitev2.git
   cd personalsitev2
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/)
- **Visualization**: [D3.js](https://d3js.org/), [Three.js](https://threejs.org/)
- **State Management**: React Context API
- **Deployment**: [Vercel](https://vercel.com/)

## 📚 Project Structure

```
personalsitev2/
├── brandon/                # Main application code
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   │   ├── ai/         # AI tools and demos
│   │   │   ├── math/       # Math tools and visualizations
│   │   │   └── ...         # Other sections
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and libraries
│   │   ├── styles/         # Global styles
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── ...
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## 🧮 Math Tools

The site features a comprehensive collection of interactive mathematical tools:

- **Collatz Explorer**: Visualize the Collatz conjecture with interactive graphs
- **Graph Theory Explorer**: Explore graph algorithms with visual demonstrations
- **Neural Network Visualizer**: See how neural networks learn through interactive training
- **Prime Number Analysis**: Analyze prime number distributions and patterns
- **Factorial Calculator**: Calculate and visualize factorial operations
- **Fibonacci Explorer**: Explore the Fibonacci sequence and its properties
- **Linear Systems Solver**: Solve and visualize linear equation systems
- **Probability Simulator**: Experiment with probability concepts
- **Pythagorean Calculator**: Interactive exploration of the Pythagorean theorem
- **Slot Machine Simulator**: Learn probability through a slot machine simulation

## 🤖 AI Tools

Experience various AI capabilities through interactive demos:

- **Sentiment Analyzer**: Analyze the sentiment of text inputs
- **Code Assistant**: Generate code snippets based on natural language descriptions
- **Virtual Assistant**: Interact with an AI assistant for various tasks
- **Image Creator**: Generate images from text descriptions
- **Story Generator**: Create stories based on prompts and parameters
- **AGI Mindmap**: Explore concepts related to artificial general intelligence
- **Mixture of Experts**: Visualize how multiple AI models can work together

## 🎨 UI Components

The site uses a custom UI component library built on top of shadcn/ui, featuring:

- Responsive layouts
- Interactive visualizations
- Accessible form elements
- Modal dialogs
- Tooltips and popovers
- Tabs and accordions
- Cards and containers
- Navigation components
- Dark/light mode toggle

## 🔧 Development

### Adding a New Tool

1. Create a new directory in the appropriate section (math, ai, etc.)
2. Create the necessary components and pages
3. Add metadata in a `meta.json` file
4. Update the tool listing in the relevant section

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write descriptive comments
- Use meaningful variable and function names

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [D3.js](https://d3js.org/) for data visualizations
- [Three.js](https://threejs.org/) for 3D visualizations
- [Vercel](https://vercel.com/) for hosting and deployment

---

Created with ❤️ by Brandon Barclay
