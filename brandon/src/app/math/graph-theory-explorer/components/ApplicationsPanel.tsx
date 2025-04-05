"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MarkdownRenderer from '@/components/MarkdownRenderer';

const applicationsContent = `
# Applications of Graph Theory

Graph theory has numerous real-world applications across many fields. Here are some notable examples:

## Computer Science

### 1. Network Routing
- **Internet Protocol (IP) Routing**: Graph algorithms determine optimal paths for data packets
- **Software-Defined Networking**: Dynamic routing based on network conditions
- **Content Delivery Networks**: Optimizing content distribution across servers

### 2. Social Networks
- **Friend Recommendations**: Community detection and link prediction
- **Influence Analysis**: Identifying key influencers through centrality measures
- **Information Propagation**: Modeling how information spreads

### 3. Database Systems
- **Query Optimization**: Planning efficient database query execution
- **Data Dependencies**: Managing relationships between data elements
- **Distributed Databases**: Coordinating data across multiple systems

## Transportation

### 1. Navigation Systems
- **GPS Routing**: Finding shortest or fastest paths
- **Traffic Management**: Analyzing congestion patterns
- **Public Transit Planning**: Optimizing routes and schedules

### 2. Logistics and Delivery
- **Vehicle Routing**: Optimizing delivery routes
- **Supply Chain Management**: Modeling and optimizing distribution networks
- **Warehouse Layout**: Minimizing travel distances

## Biology and Medicine

### 1. Biological Networks
- **Protein Interaction Networks**: Understanding protein relationships
- **Gene Regulatory Networks**: Analyzing gene expression patterns
- **Neural Networks**: Modeling brain connections

### 2. Disease Spread
- **Epidemiology**: Modeling disease transmission patterns
- **Contact Tracing**: Identifying potential infection paths
- **Vaccination Strategies**: Optimizing immunization approaches

## Telecommunications

### 1. Network Design
- **Cell Tower Placement**: Optimizing coverage
- **Backbone Network Planning**: Ensuring reliability and efficiency
- **Network Expansion**: Strategic planning for growth

### 2. Resource Allocation
- **Frequency Assignment**: Managing spectrum allocation
- **Channel Assignment**: Minimizing interference

## Electrical Engineering

### 1. Circuit Design
- **Circuit Analysis**: Modeling electrical pathways
- **Power Distribution**: Optimizing electrical grid operation
- **Fault Detection**: Identifying vulnerabilities

## Social Sciences

### 1. Organizational Structure
- **Organizational Hierarchy**: Analyzing communication patterns
- **Team Formation**: Optimizing group dynamics

### 2. Urban Planning
- **Road Network Design**: Optimizing city layouts
- **Public Facilities Location**: Maximizing accessibility

## Computer Graphics

### 1. 3D Modeling
- **Mesh Processing**: Managing 3D model structures
- **Scene Graphs**: Organizing visual elements

### 2. Path Planning
- **Robot Navigation**: Finding collision-free paths
- **Game AI**: Character movement planning

## Cybersecurity

### 1. Network Security
- **Vulnerability Analysis**: Identifying critical points in systems
- **Attack Graph Modeling**: Predicting potential attack paths
- **Network Monitoring**: Detecting suspicious patterns

## Chemistry

### 1. Molecular Structures
- **Chemical Compound Representation**: Modeling molecular bonds
- **Reaction Pathways**: Understanding chemical transformations

These applications showcase the versatility and power of graph theory in solving complex real-world problems across diverse domains.
`;

const ApplicationsPanel: React.FC = () => {
  return (
    <Card className="border-none shadow-none h-full overflow-auto">
      <CardContent className="pt-6">
        <MarkdownRenderer content={applicationsContent} />
      </CardContent>
    </Card>
  );
};

export default ApplicationsPanel; 