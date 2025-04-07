import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Statistical Analysis</h2>
        
        <p>
          Statistical analysis is a powerful approach to understanding data, identifying patterns, and making informed decisions.
          It provides methods to collect, organize, analyze, interpret, and present data in a meaningful way.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Concepts</TabsTrigger>
          <TabsTrigger value="descriptive">Descriptive Statistics</TabsTrigger>
          <TabsTrigger value="inferential">Inferential Statistics</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What is Statistical Analysis?</h3>
              <p className="mb-4">
                Statistical analysis is the science of collecting, exploring, and presenting large amounts of data to discover underlying 
                patterns and trends. It involves methods for describing and modeling the data to draw conclusions and make predictions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Key Components</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Data Collection:</strong> Gathering information through surveys, experiments, or observations</li>
                    <li><strong>Data Organization:</strong> Arranging data in a structured format for analysis</li>
                    <li><strong>Data Analysis:</strong> Applying statistical methods to extract insights</li>
                    <li><strong>Interpretation:</strong> Drawing meaningful conclusions from the analysis</li>
                    <li><strong>Presentation:</strong> Communicating findings through visualizations and reports</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Types of Data</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Categorical:</strong> Qualitative data that can be sorted into categories (e.g., colors, gender)</li>
                    <li><strong>Numerical:</strong> Quantitative data represented by numbers
                      <ul className="list-disc pl-6 mt-1">
                        <li><strong>Discrete:</strong> Countable values (e.g., number of children)</li>
                        <li><strong>Continuous:</strong> Measurable values on a scale (e.g., height, weight)</li>
                      </ul>
                    </li>
                    <li><strong>Ordinal:</strong> Data with a defined order or ranking (e.g., education levels)</li>
                    <li><strong>Nominal:</strong> Data with no inherent order (e.g., blood types)</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Statistical Approaches</h4>
              <p className="mb-4">
                Statistical analysis can be broadly categorized into two main approaches:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Descriptive Statistics:</strong> Methods that summarize and describe the main features of a dataset
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Examples: Mean, median, mode, standard deviation, range
                  </p>
                </li>
                <li>
                  <strong>Inferential Statistics:</strong> Methods that use sample data to make inferences about a larger population
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Examples: Hypothesis testing, confidence intervals, regression analysis
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descriptive" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Descriptive Statistics</h3>
              
              <h4 className="text-lg font-medium mb-3">Measures of Central Tendency</h4>
              <p className="mb-4">
                These statistics describe the center or middle of a data distribution:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Measures</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Mean (Average):</strong> The sum of all values divided by the number of values
                    <div className="my-2 flex justify-center">
                      <MathJax>
                        {`\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}`}
                      </MathJax>
                    </div>
                  </li>
                  <li>
                    <strong>Median:</strong> The middle value when data is arranged in order
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Less sensitive to outliers than the mean
                    </p>
                  </li>
                  <li>
                    <strong>Mode:</strong> The most frequently occurring value
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      A distribution can have multiple modes or no mode
                    </p>
                  </li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Measures of Dispersion</h4>
              <p className="mb-4">
                These statistics describe how spread out the data is:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Measures</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Range:</strong> The difference between the maximum and minimum values
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Range = Max - Min
                    </p>
                  </li>
                  <li>
                    <strong>Variance:</strong> The average of squared deviations from the mean
                    <div className="my-2 flex justify-center">
                      <MathJax>
                        {`\\sigma^2 = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n}`}
                      </MathJax>
                    </div>
                  </li>
                  <li>
                    <strong>Standard Deviation:</strong> The square root of the variance
                    <div className="my-2 flex justify-center">
                      <MathJax>
                        {`\\sigma = \\sqrt{\\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n}}`}
                      </MathJax>
                    </div>
                  </li>
                  <li>
                    <strong>Interquartile Range (IQR):</strong> The range between the first quartile (25th percentile) and third quartile (75th percentile)
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      IQR = Q3 - Q1
                    </p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Data Distributions</h3>
              
              <h4 className="text-lg font-medium mb-3">Types of Distributions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Normal Distribution</h5>
                  <p className="mb-2">
                    Also known as the Gaussian distribution or "bell curve":
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Symmetric around the mean</li>
                    <li>Mean = Median = Mode</li>
                    <li>68% of data falls within 1 standard deviation</li>
                    <li>95% of data falls within 2 standard deviations</li>
                    <li>99.7% of data falls within 3 standard deviations</li>
                  </ul>
                  <div className="my-2 flex justify-center">
                    <MathJax>
                      {`f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}`}
                    </MathJax>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Other Common Distributions</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Uniform:</strong> All values have equal probability</li>
                    <li><strong>Binomial:</strong> Discrete distribution for binary outcomes</li>
                    <li><strong>Poisson:</strong> Discrete distribution for rare events</li>
                    <li><strong>Exponential:</strong> Continuous distribution for time between events</li>
                    <li><strong>Log-normal:</strong> Distribution of values whose logarithm follows a normal distribution</li>
                    <li><strong>Chi-square:</strong> Distribution of sum of squared standard normal variables</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Measures of Shape</h4>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Skewness:</strong> Measures the asymmetry of a distribution
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>Positive Skew:</strong> Tail extends to the right (higher values)</li>
                    <li><strong>Negative Skew:</strong> Tail extends to the left (lower values)</li>
                    <li><strong>Zero Skew:</strong> Symmetric distribution</li>
                  </ul>
                </li>
                <li>
                  <strong>Kurtosis:</strong> Measures the "tailedness" of a distribution
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>Leptokurtic:</strong> Heavy tails, more outliers than normal</li>
                    <li><strong>Mesokurtic:</strong> Normal distribution</li>
                    <li><strong>Platykurtic:</strong> Light tails, fewer outliers than normal</li>
                  </ul>
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Visualizing Distributions</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Histogram:</strong> Shows frequency distribution of continuous data</li>
                <li><strong>Box Plot:</strong> Shows median, quartiles, and potential outliers</li>
                <li><strong>Density Plot:</strong> Smoothed version of a histogram</li>
                <li><strong>Q-Q Plot:</strong> Compares data distribution to a theoretical distribution</li>
                <li><strong>Violin Plot:</strong> Combines box plot with density plot</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inferential" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Inferential Statistics</h3>
              
              <h4 className="text-lg font-medium mb-3">Sampling and Estimation</h4>
              <p className="mb-4">
                Inferential statistics uses sample data to make inferences about a larger population:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Population:</strong> The entire group of interest
                </li>
                <li>
                  <strong>Sample:</strong> A subset of the population
                </li>
                <li>
                  <strong>Parameter:</strong> A numerical characteristic of a population (e.g., population mean μ)
                </li>
                <li>
                  <strong>Statistic:</strong> A numerical characteristic of a sample (e.g., sample mean x̄)
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Point Estimation vs. Interval Estimation</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Point Estimation</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Single value estimate of a parameter</li>
                      <li>Example: Sample mean as an estimate of population mean</li>
                      <li>Doesn't provide information about precision</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Interval Estimation</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Range of values likely to contain the parameter</li>
                      <li>Example: 95% confidence interval</li>
                      <li>Provides measure of precision and uncertainty</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Hypothesis Testing</h4>
              <p className="mb-4">
                A method to make decisions about populations based on sample data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Null Hypothesis (H₀):</strong> Statement of no effect or no difference
                </li>
                <li>
                  <strong>Alternative Hypothesis (H₁ or Hₐ):</strong> Statement that contradicts the null hypothesis
                </li>
                <li>
                  <strong>p-value:</strong> Probability of observing results at least as extreme as the current data, assuming the null hypothesis is true
                </li>
                <li>
                  <strong>Significance Level (α):</strong> Threshold for rejecting the null hypothesis (commonly 0.05)
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Common Hypothesis Tests</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>t-test:</strong> Compares means (one sample, two independent samples, or paired samples)
                  </li>
                  <li>
                    <strong>ANOVA:</strong> Compares means across multiple groups
                  </li>
                  <li>
                    <strong>Chi-square test:</strong> Tests relationships between categorical variables
                  </li>
                  <li>
                    <strong>F-test:</strong> Compares variances or tests overall significance in regression
                  </li>
                  <li>
                    <strong>z-test:</strong> Compares means when population standard deviation is known
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Correlation and Regression</h3>
              
              <h4 className="text-lg font-medium mb-3">Correlation Analysis</h4>
              <p className="mb-4">
                Measures the strength and direction of the relationship between two variables:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Pearson Correlation Coefficient (r):</strong> Measures linear relationship between two continuous variables
                  <div className="my-2 flex justify-center">
                    <MathJax>
                      {`r = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n} (x_i - \\bar{x})^2 \\sum_{i=1}^{n} (y_i - \\bar{y})^2}}`}
                    </MathJax>
                  </div>
                  <ul className="list-disc pl-6 mt-1">
                    <li>r ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation)</li>
                    <li>r = 0 indicates no linear correlation</li>
                  </ul>
                </li>
                <li>
                  <strong>Spearman's Rank Correlation:</strong> Measures monotonic relationship, less sensitive to outliers
                </li>
                <li>
                  <strong>Kendall's Tau:</strong> Non-parametric measure based on concordant and discordant pairs
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Regression Analysis</h4>
              <p className="mb-4">
                Models the relationship between a dependent variable and one or more independent variables:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Simple Linear Regression</h5>
                <p className="mb-2">
                  Models the relationship between two variables with a straight line:
                </p>
                <div className="my-2 flex justify-center">
                  <MathJax>
                    {`y = \\beta_0 + \\beta_1 x + \\varepsilon`}
                  </MathJax>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Where β₀ is the y-intercept, β₁ is the slope, and ε is the error term
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Multiple Linear Regression</h5>
                <p className="mb-2">
                  Extends simple linear regression to include multiple independent variables:
                </p>
                <div className="my-2 flex justify-center">
                  <MathJax>
                    {`y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + ... + \\beta_p x_p + \\varepsilon`}
                  </MathJax>
                </div>
                <p className="mb-2">
                  Key concepts in regression analysis:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>R-squared (R²):</strong> Proportion of variance explained by the model</li>
                  <li><strong>Adjusted R²:</strong> R² adjusted for the number of predictors</li>
                  <li><strong>Residuals:</strong> Differences between observed and predicted values</li>
                  <li><strong>Multicollinearity:</strong> High correlation between independent variables</li>
                  <li><strong>Heteroscedasticity:</strong> Non-constant variance in residuals</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Advanced Statistical Methods</h3>
              
              <h4 className="text-lg font-medium mb-3">Multivariate Analysis</h4>
              <p className="mb-4">
                Techniques for analyzing relationships among multiple variables simultaneously:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Principal Component Analysis (PCA):</strong> Reduces dimensionality while preserving variance
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Transforms correlated variables into a smaller set of uncorrelated variables
                  </p>
                </li>
                <li>
                  <strong>Factor Analysis:</strong> Identifies underlying factors that explain patterns of correlations
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Used to identify latent variables that cannot be directly measured
                  </p>
                </li>
                <li>
                  <strong>Cluster Analysis:</strong> Groups similar observations into clusters
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Methods include k-means, hierarchical clustering, and DBSCAN
                  </p>
                </li>
                <li>
                  <strong>Discriminant Analysis:</strong> Classifies observations into predefined groups
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Finds linear combinations of features that best separate classes
                  </p>
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Time Series Analysis</h4>
              <p className="mb-4">
                Methods for analyzing time-ordered data to extract meaningful patterns:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Components and Models</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Trend:</strong> Long-term movement in the data
                  </li>
                  <li>
                    <strong>Seasonality:</strong> Regular patterns that repeat over fixed intervals
                  </li>
                  <li>
                    <strong>Cyclical Patterns:</strong> Irregular fluctuations without fixed frequency
                  </li>
                  <li>
                    <strong>Random Variation:</strong> Unpredictable fluctuations
                  </li>
                  <li>
                    <strong>ARIMA Models:</strong> Autoregressive Integrated Moving Average
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Combines autoregressive (AR), differencing (I), and moving average (MA) components
                    </p>
                  </li>
                  <li>
                    <strong>Exponential Smoothing:</strong> Weighted averages with exponentially decreasing weights
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Bayesian Statistics</h3>
              
              <p className="mb-4">
                An approach that incorporates prior knowledge and updates beliefs based on new evidence:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Bayes' Theorem</h5>
                <div className="my-2 flex justify-center">
                  <MathJax>
                    {`P(A|B) = \\frac{P(B|A) \\times P(A)}{P(B)}`}
                  </MathJax>
                </div>
                <p className="mb-2">
                  Where:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>P(A|B) is the posterior probability of A given B</li>
                  <li>P(B|A) is the likelihood of B given A</li>
                  <li>P(A) is the prior probability of A</li>
                  <li>P(B) is the marginal probability of B</li>
                </ul>
              </div>
              
              <p className="mb-4">
                Key differences from frequentist statistics:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Bayesian Approach</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treats parameters as random variables</li>
                    <li>Incorporates prior knowledge</li>
                    <li>Provides probability distributions for parameters</li>
                    <li>Allows direct probability statements about hypotheses</li>
                    <li>Uses credible intervals</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Frequentist Approach</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Treats parameters as fixed constants</li>
                    <li>Relies solely on observed data</li>
                    <li>Provides point estimates and standard errors</li>
                    <li>Uses p-values and significance testing</li>
                    <li>Uses confidence intervals</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Machine Learning and Statistical Learning</h4>
              <p className="mb-4">
                Modern approaches that blend statistics with computer science:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Supervised Learning:</strong> Predicts outcomes based on labeled training data
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Examples: Linear regression, logistic regression, decision trees, neural networks
                  </p>
                </li>
                <li>
                  <strong>Unsupervised Learning:</strong> Finds patterns in unlabeled data
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Examples: Clustering, dimensionality reduction, association rules
                  </p>
                </li>
                <li>
                  <strong>Reinforcement Learning:</strong> Learns optimal actions through trial and error
                </li>
                <li>
                  <strong>Cross-Validation:</strong> Technique to assess model performance on unseen data
                </li>
                <li>
                  <strong>Regularization:</strong> Methods to prevent overfitting (e.g., Ridge, Lasso)
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
