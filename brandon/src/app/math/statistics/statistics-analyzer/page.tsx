"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import metaJson from './meta.json';
import { StatisticsAnalyzer } from './components/StatisticsAnalyzer';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

// Create dynamic panel component with the StatisticsAnalyzer as the solver
const StatisticsAnalyzerContent = createDynamicPanelComponent({
  solver: () => <StatisticsAnalyzer />,
  explanation: () => (
    <div className="prose dark:prose-invert max-w-none">
      <h2>Statistical Analysis</h2>
      <p>
        Statistical analysis is a fundamental component of data science that involves collecting, 
        organizing, analyzing, interpreting, and presenting data to discover underlying patterns and trends.
      </p>
      
      <h3>Measures of Central Tendency</h3>
      <ul>
        <li><strong>Mean</strong>: The average of all values in a dataset, calculated by dividing the sum of all values by the number of values.</li>
        <li><strong>Median</strong>: The middle value when a dataset is ordered, representing the 50th percentile.</li>
        <li><strong>Mode</strong>: The most frequently occurring value(s) in a dataset.</li>
      </ul>

      <h3>Measures of Dispersion</h3>
      <ul>
        <li><strong>Range</strong>: The difference between the maximum and minimum values.</li>
        <li><strong>Variance</strong>: The average of the squared differences from the mean.</li>
        <li><strong>Standard Deviation</strong>: The square root of the variance, indicating how spread out the values are.</li>
        <li><strong>Interquartile Range (IQR)</strong>: The difference between the third quartile (Q3) and the first quartile (Q1).</li>
      </ul>

      <h3>Visualizations</h3>
      <p>
        Data visualizations like histograms and box plots help in understanding the distribution of data:
      </p>
      <ul>
        <li><strong>Histogram</strong>: Shows the frequency distribution of a dataset by dividing the data into bins.</li>
        <li><strong>Box Plot</strong>: Displays the five-number summary (minimum, Q1, median, Q3, maximum) and outliers.</li>
      </ul>
    </div>
  ),
  applications: () => (
    <div className="prose dark:prose-invert max-w-none">
      <h2>Applications of Statistical Analysis</h2>
      
      <h3>Scientific Research</h3>
      <p>
        Statistical methods are essential for analyzing experimental results, testing hypotheses, 
        and establishing relationships between variables. They help researchers determine if their 
        findings are statistically significant or merely due to chance.
      </p>
      
      <h3>Business and Economics</h3>
      <p>
        Companies use statistics to analyze market trends, forecast sales, optimize pricing strategies, 
        and make data-driven decisions. Economic indicators and financial analyses rely heavily on 
        statistical models.
      </p>
      
      <h3>Medicine and Healthcare</h3>
      <p>
        Statistics play a vital role in clinical trials, epidemiological studies, and patient outcome 
        analysis. Medical research uses statistical methods to evaluate treatment effectiveness and 
        identify risk factors for diseases.
      </p>
      
      <h3>Social Sciences</h3>
      <p>
        Researchers in psychology, sociology, and political science use statistics to analyze survey 
        data, study human behavior patterns, and identify social trends.
      </p>
      
      <h3>Sports Analytics</h3>
      <p>
        Teams and analysts use statistics to evaluate player performance, develop game strategies, 
        and predict outcomes of competitions.
      </p>
      
      <h3>Quality Control</h3>
      <p>
        Manufacturing processes employ statistical methods to monitor product quality, identify defects, 
        and improve efficiency. Techniques like statistical process control help maintain consistent quality.
      </p>
    </div>
  ),
  resources: () => (
    <div className="prose dark:prose-invert max-w-none">
      <h2>Resources for Statistical Analysis</h2>
      
      <h3>Online Courses and Tutorials</h3>
      <ul>
        <li><a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener noreferrer">Khan Academy - Statistics and Probability</a></li>
        <li><a href="https://www.coursera.org/specializations/statistics" target="_blank" rel="noopener noreferrer">Coursera - Statistics with R Specialization</a></li>
        <li><a href="https://www.edx.org/learn/statistics" target="_blank" rel="noopener noreferrer">edX - Statistics Courses</a></li>
      </ul>
      
      <h3>Books</h3>
      <ul>
        <li>"Statistics in Plain English" by Timothy C. Urdan</li>
        <li>"Naked Statistics: Stripping the Dread from the Data" by Charles Wheelan</li>
        <li>"The Art of Statistics: How to Learn from Data" by David Spiegelhalter</li>
        <li>"Statistics for Dummies" by Deborah J. Rumsey</li>
      </ul>
      
      <h3>Software and Tools</h3>
      <ul>
        <li><a href="https://www.r-project.org/" target="_blank" rel="noopener noreferrer">R</a> - Open-source statistical programming language</li>
        <li><a href="https://www.python.org/" target="_blank" rel="noopener noreferrer">Python</a> with libraries like NumPy, Pandas, and SciPy</li>
        <li><a href="https://www.ibm.com/products/spss-statistics" target="_blank" rel="noopener noreferrer">SPSS</a> - Statistical Package for the Social Sciences</li>
        <li><a href="https://www.microsoft.com/en-us/microsoft-365/excel" target="_blank" rel="noopener noreferrer">Microsoft Excel</a> - For basic statistical analyses</li>
      </ul>
      
      <h3>Online Calculators and Visualization Tools</h3>
      <ul>
        <li><a href="https://www.wolframalpha.com/" target="_blank" rel="noopener noreferrer">Wolfram Alpha</a></li>
        <li><a href="https://www.desmos.com/" target="_blank" rel="noopener noreferrer">Desmos</a></li>
        <li><a href="https://www.geogebra.org/" target="_blank" rel="noopener noreferrer">GeoGebra</a></li>
      </ul>
    </div>
  )
});

export default function StatisticsAnalyzerPage() {
  return (
    <ToolPageLayout meta={meta}>
      <StatisticsAnalyzerContent />
    </ToolPageLayout>
  );
}