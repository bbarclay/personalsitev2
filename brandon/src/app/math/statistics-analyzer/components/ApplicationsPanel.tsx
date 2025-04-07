import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of Statistical Analysis</h2>
        
        <p>
          Statistical analysis is a versatile tool with applications across numerous fields. From business and healthcare 
          to scientific research and public policy, statistical methods provide the foundation for data-driven decision making 
          and discovery.
        </p>
      </div>

      <Tabs defaultValue="business">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="science">Science & Research</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="society">Society & Government</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Business Intelligence and Analytics</h3>
              
              <h4 className="text-lg font-medium mb-3">Market Research and Consumer Behavior</h4>
              <p className="mb-4">
                Statistical analysis helps businesses understand their customers and market dynamics:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Customer Segmentation:</strong> Clustering techniques to identify distinct customer groups
                </li>
                <li>
                  <strong>Conjoint Analysis:</strong> Determining which product features drive consumer preferences
                </li>
                <li>
                  <strong>Market Basket Analysis:</strong> Identifying products frequently purchased together
                </li>
                <li>
                  <strong>Brand Perception Studies:</strong> Analyzing how consumers perceive brands relative to competitors
                </li>
                <li>
                  <strong>Price Elasticity Analysis:</strong> Measuring how demand changes with price fluctuations
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Financial Analysis</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Risk Assessment:</strong> Quantifying financial risks using statistical models</li>
                    <li><strong>Portfolio Optimization:</strong> Balancing risk and return across investments</li>
                    <li><strong>Time Series Forecasting:</strong> Predicting stock prices and market trends</li>
                    <li><strong>Fraud Detection:</strong> Identifying unusual patterns in financial transactions</li>
                    <li><strong>Credit Scoring:</strong> Assessing creditworthiness of loan applicants</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Operations and Supply Chain</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Inventory Optimization:</strong> Determining optimal stock levels</li>
                    <li><strong>Quality Control:</strong> Statistical process control to maintain product quality</li>
                    <li><strong>Demand Forecasting:</strong> Predicting future product demand</li>
                    <li><strong>Logistics Optimization:</strong> Improving delivery routes and schedules</li>
                    <li><strong>Capacity Planning:</strong> Ensuring sufficient resources to meet demand</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Digital Marketing and E-commerce</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>A/B Testing:</strong> Comparing different versions of websites or marketing materials
                </li>
                <li>
                  <strong>Conversion Rate Optimization:</strong> Analyzing factors that influence customer conversions
                </li>
                <li>
                  <strong>Customer Lifetime Value Analysis:</strong> Predicting the total value of a customer relationship
                </li>
                <li>
                  <strong>Churn Prediction:</strong> Identifying customers likely to stop using a product or service
                </li>
                <li>
                  <strong>Attribution Modeling:</strong> Determining which marketing channels drive conversions
                </li>
                <li>
                  <strong>Recommendation Systems:</strong> Statistical algorithms to suggest relevant products
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Scientific Research and Development</h3>
              
              <h4 className="text-lg font-medium mb-3">Experimental Design and Analysis</h4>
              <p className="mb-4">
                Statistics is fundamental to the scientific method and experimental research:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Randomized Controlled Trials:</strong> Gold standard for testing causal relationships
                </li>
                <li>
                  <strong>Factorial Designs:</strong> Testing multiple factors and their interactions simultaneously
                </li>
                <li>
                  <strong>Power Analysis:</strong> Determining appropriate sample sizes for experiments
                </li>
                <li>
                  <strong>ANOVA and MANOVA:</strong> Analyzing differences between experimental groups
                </li>
                <li>
                  <strong>Meta-Analysis:</strong> Combining results from multiple studies to draw stronger conclusions
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Environmental Science</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Climate Modeling:</strong> Statistical models to understand climate patterns</li>
                    <li><strong>Ecological Studies:</strong> Analyzing species distributions and interactions</li>
                    <li><strong>Pollution Analysis:</strong> Monitoring and modeling environmental contaminants</li>
                    <li><strong>Conservation Planning:</strong> Identifying priority areas for protection</li>
                    <li><strong>Natural Resource Management:</strong> Optimizing sustainable resource use</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Physics and Engineering</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Uncertainty Quantification:</strong> Characterizing measurement errors</li>
                    <li><strong>Signal Processing:</strong> Extracting signals from noisy data</li>
                    <li><strong>Reliability Analysis:</strong> Predicting failure rates of components</li>
                    <li><strong>Computational Fluid Dynamics:</strong> Statistical models of fluid behavior</li>
                    <li><strong>Materials Science:</strong> Analyzing material properties and performance</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Data-Intensive Research</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Genomics and Bioinformatics:</strong> Analyzing large-scale genetic data
                </li>
                <li>
                  <strong>Astronomy:</strong> Processing and analyzing telescope data to identify celestial objects
                </li>
                <li>
                  <strong>Particle Physics:</strong> Statistical analysis of particle collision data
                </li>
                <li>
                  <strong>Neuroscience:</strong> Analyzing brain imaging and neural activity data
                </li>
                <li>
                  <strong>Social Network Analysis:</strong> Studying patterns of connections in social systems
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="healthcare" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Healthcare and Medicine</h3>
              
              <h4 className="text-lg font-medium mb-3">Clinical Research</h4>
              <p className="mb-4">
                Statistics is essential for advancing medical knowledge and treatments:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Clinical Trials:</strong> Evaluating safety and efficacy of new treatments
                </li>
                <li>
                  <strong>Survival Analysis:</strong> Studying time until events like disease progression or death
                </li>
                <li>
                  <strong>Bioequivalence Studies:</strong> Comparing generic drugs to brand-name counterparts
                </li>
                <li>
                  <strong>Dose-Response Analysis:</strong> Determining optimal medication dosages
                </li>
                <li>
                  <strong>Crossover Studies:</strong> Comparing multiple treatments within the same patients
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Epidemiology and Public Health</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Disease Surveillance:</strong> Monitoring disease outbreaks and trends</li>
                    <li><strong>Risk Factor Analysis:</strong> Identifying factors associated with diseases</li>
                    <li><strong>Vaccine Efficacy Studies:</strong> Measuring how well vaccines prevent disease</li>
                    <li><strong>Health Disparities Research:</strong> Analyzing differences in health outcomes across populations</li>
                    <li><strong>Intervention Evaluation:</strong> Assessing the impact of public health programs</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Healthcare Operations</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Hospital Capacity Planning:</strong> Optimizing bed allocation and staffing</li>
                    <li><strong>Patient Flow Analysis:</strong> Improving efficiency in healthcare delivery</li>
                    <li><strong>Quality Improvement:</strong> Monitoring and enhancing care quality metrics</li>
                    <li><strong>Resource Utilization:</strong> Analyzing patterns of healthcare resource use</li>
                    <li><strong>Cost-Effectiveness Analysis:</strong> Evaluating value of healthcare interventions</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Precision Medicine and Biostatistics</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Genetic Association Studies:</strong> Linking genetic variants to disease risk
                </li>
                <li>
                  <strong>Biomarker Development:</strong> Identifying biological indicators of disease or treatment response
                </li>
                <li>
                  <strong>Pharmacogenomics:</strong> Studying how genetics affects medication response
                </li>
                <li>
                  <strong>Medical Imaging Analysis:</strong> Statistical methods to interpret imaging data
                </li>
                <li>
                  <strong>Predictive Modeling:</strong> Forecasting disease progression or treatment outcomes
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="society" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Society and Government</h3>
              
              <h4 className="text-lg font-medium mb-3">Public Policy and Decision Making</h4>
              <p className="mb-4">
                Statistics informs evidence-based policy and governance:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Policy Impact Assessment:</strong> Evaluating effects of policy interventions
                </li>
                <li>
                  <strong>Cost-Benefit Analysis:</strong> Weighing costs against benefits of public programs
                </li>
                <li>
                  <strong>Risk Assessment:</strong> Quantifying risks of various policy options
                </li>
                <li>
                  <strong>Resource Allocation:</strong> Optimizing distribution of limited public resources
                </li>
                <li>
                  <strong>Regulatory Analysis:</strong> Assessing impacts of regulations on various stakeholders
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Economics and Finance</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Econometric Modeling:</strong> Statistical analysis of economic data</li>
                    <li><strong>Economic Forecasting:</strong> Predicting economic indicators</li>
                    <li><strong>Labor Market Analysis:</strong> Studying employment trends and factors</li>
                    <li><strong>Monetary Policy:</strong> Statistical models to guide central bank decisions</li>
                    <li><strong>Tax Policy Analysis:</strong> Evaluating impacts of tax changes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Demographics and Social Research</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Census Analysis:</strong> Processing and analyzing population data</li>
                    <li><strong>Survey Research:</strong> Collecting and analyzing public opinion data</li>
                    <li><strong>Social Indicators:</strong> Measuring quality of life and well-being</li>
                    <li><strong>Migration Studies:</strong> Analyzing population movement patterns</li>
                    <li><strong>Educational Assessment:</strong> Evaluating student performance and educational outcomes</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Urban Planning and Infrastructure</h4>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Transportation Planning:</strong> Optimizing traffic flow and public transit
                </li>
                <li>
                  <strong>Housing Analysis:</strong> Studying housing markets and needs
                </li>
                <li>
                  <strong>Environmental Impact Assessment:</strong> Evaluating effects of development projects
                </li>
                <li>
                  <strong>Infrastructure Maintenance:</strong> Predicting maintenance needs and prioritizing repairs
                </li>
                <li>
                  <strong>Disaster Preparedness:</strong> Risk modeling for natural disasters
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Criminal Justice and Law Enforcement</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Crime Pattern Analysis:</strong> Identifying spatial and temporal crime patterns
                </li>
                <li>
                  <strong>Predictive Policing:</strong> Forecasting crime hotspots to guide resource allocation
                </li>
                <li>
                  <strong>Recidivism Studies:</strong> Analyzing factors associated with reoffending
                </li>
                <li>
                  <strong>Forensic Statistics:</strong> Evaluating evidence reliability in legal proceedings
                </li>
                <li>
                  <strong>Sentencing Analysis:</strong> Studying patterns and disparities in criminal sentencing
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
