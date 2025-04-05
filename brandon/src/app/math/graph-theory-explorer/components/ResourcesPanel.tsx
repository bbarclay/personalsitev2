"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ExternalLink } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const ResourcesPanel: React.FC = () => {
  return (
    <Card className="border-none shadow-none h-full overflow-auto">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold mb-6">Graph Theory Resources</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="books">
            <AccordionTrigger className="text-lg font-medium">Books</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <ResourceItem
                  title="Introduction to Graph Theory"
                  author="Richard J. Trudeau"
                  description="An excellent introduction to graph theory for beginners."
                  link="https://www.goodreads.com/book/show/388038.Introduction_to_Graph_Theory"
                />
                
                <ResourceItem
                  title="Graph Theory: Modeling, Applications, and Algorithms"
                  author="Geir Agnarsson and Raymond Greenlaw"
                  description="A comprehensive textbook covering both theory and applications."
                  link="https://www.pearson.com/en-us/subject-catalog/p/graph-theory-modeling-applications-and-algorithms/P200000003166"
                />
                
                <ResourceItem
                  title="Algorithms on Graphs"
                  author="Maciej Sysło, Narsingh Deo, and Janusz S. Kowalik"
                  description="Focuses on computational aspects and algorithm implementations."
                  link="https://www.amazon.com/Algorithms-Graphs-M-Syslo/dp/0444989692"
                />
                
                <ResourceItem
                  title="Networks, Crowds, and Markets: Reasoning About a Highly Connected World"
                  author="David Easley and Jon Kleinberg"
                  description="Explores applications of networks in social and economic systems."
                  link="https://www.cs.cornell.edu/home/kleinber/networks-book/"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="online-courses">
            <AccordionTrigger className="text-lg font-medium">Online Courses</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <ResourceItem
                  title="Algorithms on Graphs"
                  author="University of California San Diego & HSE University (Coursera)"
                  description="Learn algorithms for solving various graph problems."
                  link="https://www.coursera.org/learn/algorithms-on-graphs"
                />
                
                <ResourceItem
                  title="Graph Theory"
                  author="Massachusetts Institute of Technology (MIT OpenCourseWare)"
                  description="Undergraduate level course with lecture notes and assignments."
                  link="https://ocw.mit.edu/courses/18-315-combinatorial-theory-introduction-to-graph-theory-extremal-and-enumerative-combinatorics-spring-2005/"
                />
                
                <ResourceItem
                  title="Social and Economic Networks: Models and Analysis"
                  author="Stanford University (Coursera)"
                  description="Applying network analysis to social and economic contexts."
                  link="https://www.coursera.org/learn/social-economic-networks"
                />
                
                <ResourceItem
                  title="Network Analysis in Systems Biology"
                  author="Icahn School of Medicine at Mount Sinai (Coursera)"
                  description="Applications of graph theory in biological systems."
                  link="https://www.coursera.org/learn/network-biology"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tutorials">
            <AccordionTrigger className="text-lg font-medium">Tutorials & Visualizations</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <ResourceItem
                  title="D3 Graph Theory"
                  author="Avinash Pandey"
                  description="Interactive visualization platform for learning graph theory concepts."
                  link="https://d3gt.com/"
                />
                
                <ResourceItem
                  title="Visualgo"
                  author="National University of Singapore"
                  description="Visualizing graph algorithms and data structures."
                  link="https://visualgo.net/en/graphds"
                />
                
                <ResourceItem
                  title="Graph Theory Tutorials"
                  author="Brilliant.org"
                  description="Interactive lessons on graph theory fundamentals."
                  link="https://brilliant.org/courses/graph-theory/"
                />
                
                <ResourceItem
                  title="Algorithm Visualizations"
                  author="University of San Francisco"
                  description="Step-through visualizations of common graph algorithms."
                  link="https://www.cs.usfca.edu/~galles/visualization/Algorithms.html"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="research">
            <AccordionTrigger className="text-lg font-medium">Research & Papers</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <ResourceItem
                  title="Journal of Graph Theory"
                  author="Wiley Online Library"
                  description="Academic journal dedicated to graph theory research."
                  link="https://onlinelibrary.wiley.com/journal/10970118"
                />
                
                <ResourceItem
                  title="Graph Theory Papers on arXiv"
                  author="Cornell University"
                  description="Repository of recent research papers in graph theory."
                  link="https://arxiv.org/list/math.CO/recent"
                />
                
                <ResourceItem
                  title="Networks Journal"
                  author="Wiley Online Library"
                  description="Interdisciplinary journal focusing on network applications."
                  link="https://onlinelibrary.wiley.com/journal/10970037"
                />
                
                <ResourceItem
                  title="Social Networks Journal"
                  author="Elsevier"
                  description="Research on social structure and network analysis."
                  link="https://www.journals.elsevier.com/social-networks"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tools">
            <AccordionTrigger className="text-lg font-medium">Software & Tools</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <ResourceItem
                  title="NetworkX"
                  author="Python Package"
                  description="A Python library for network analysis and graph algorithms."
                  link="https://networkx.org/"
                />
                
                <ResourceItem
                  title="Gephi"
                  author="Open Source Software"
                  description="Interactive visualization and exploration platform for networks."
                  link="https://gephi.org/"
                />
                
                <ResourceItem
                  title="Cytoscape"
                  author="Open Source Software"
                  description="Network visualization and analysis software (particularly for biological data)."
                  link="https://cytoscape.org/"
                />
                
                <ResourceItem
                  title="igraph"
                  author="Open Source Software"
                  description="Network analysis library with interfaces for R, Python, and C/C++."
                  link="https://igraph.org/"
                />
                
                <ResourceItem
                  title="Graphviz"
                  author="Open Source Software"
                  description="Graph visualization software with multiple layout algorithms."
                  link="https://graphviz.org/"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Getting Started Guide</h2>
          <MarkdownRenderer content={`
## Learning Path for Graph Theory

1. **Start with the fundamentals**
   - Basic definitions (graphs, vertices, edges)
   - Graph representations (adjacency matrix, adjacency list)
   - Graph types (directed, undirected, weighted, bipartite, etc.)

2. **Master traversal algorithms**
   - Breadth-First Search (BFS)
   - Depth-First Search (DFS)
   - Applications of traversals

3. **Learn path-finding algorithms**
   - Shortest paths (Dijkstra's, Bellman-Ford)
   - All-pairs shortest paths (Floyd-Warshall)

4. **Explore minimum spanning trees**
   - Kruskal's algorithm
   - Prim's algorithm

5. **Advanced topics**
   - Network flow (Ford-Fulkerson algorithm)
   - Matching problems
   - Graph coloring
   - Planarity

6. **Applications**
   - Choose a domain of interest (social networks, transportation, etc.)
   - Implement algorithms for real-world problems
          `} />
        </div>
      </CardContent>
    </Card>
  );
};

interface ResourceItemProps {
  title: string;
  author: string;
  description: string;
  link: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ title, author, description, link }) => {
  return (
    <div className="p-3 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">by {author}</p>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80"
          aria-label={`Visit ${title} resource`}
        >
          <ExternalLink size={16} />
        </a>
      </div>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
};

export default ResourcesPanel; 