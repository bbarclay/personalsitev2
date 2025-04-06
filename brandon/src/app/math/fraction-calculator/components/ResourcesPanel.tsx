"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FractionResources = () => {
  const resources = [
    {
      title: "Khan Academy: Fractions",
      description: "Comprehensive course on understanding fractions from basic concepts to advanced operations",
      type: "course",
      level: "beginner-advanced",
      url: "https://www.khanacademy.org/math/arithmetic/fraction-arithmetic",
      tags: ["free", "video", "interactive"]
    },
    {
      title: "Fractions Calculator & Learning Tool",
      description: "Interactive tool for practicing fraction operations with step-by-step solutions",
      type: "tool",
      level: "all levels",
      url: "https://www.mathsisfun.com/numbers/fractions-calculator.html",
      tags: ["free", "calculator", "practice"]
    },
    {
      title: "Fractions in Real Life",
      description: "Guide to practical applications of fractions with everyday examples",
      type: "article",
      level: "beginner",
      url: "https://www.mathsisfun.com/numbers/fractions-real-life.html",
      tags: ["free", "practical", "examples"]
    },
    {
      title: "Fraction Games for Kids",
      description: "Collection of interactive games that teach fraction concepts in a fun way",
      type: "games",
      level: "elementary",
      url: "https://www.splashlearn.com/fraction-games",
      tags: ["free", "games", "interactive"]
    },
    {
      title: "Visualizing Fractions",
      description: "Visual guides and tools to help understand fraction relationships and comparisons",
      type: "visual guide",
      level: "beginner-intermediate",
      url: "https://visualfractions.com/",
      tags: ["free", "visual", "conceptual"]
    },
    {
      title: "Fraction Operations Worksheets",
      description: "Printable practice worksheets for addition, subtraction, multiplication, and division of fractions",
      type: "worksheets",
      level: "elementary-middle school",
      url: "https://www.math-drills.com/fractions.php",
      tags: ["free", "printable", "practice"]
    },
    {
      title: "Advanced Fraction Concepts",
      description: "Detailed exploration of complex fraction topics including continued fractions and applications in higher mathematics",
      type: "article",
      level: "advanced",
      url: "https://www.mathsisfun.com/numbers/continued-fractions.html",
      tags: ["free", "advanced", "theoretical"]
    },
    {
      title: "Fractions in Cooking and Baking",
      description: "How to apply fraction skills in the kitchen with recipe scaling and measurement conversions",
      type: "guide",
      level: "beginner",
      url: "https://www.thoughtco.com/using-fractions-in-recipes-2312330",
      tags: ["practical", "cooking", "real-world"]
    }
  ];

  const bookRecommendations = [
    {
      title: "Fractions, Decimals, and Percents",
      author: "David A. Adler",
      level: "Elementary",
      description: "An illustrated guide to understanding the relationship between fractions, decimals, and percentages"
    },
    {
      title: "Fraction Fun",
      author: "David A. Adler",
      level: "Elementary",
      description: "A beginner-friendly illustrated book introducing fraction concepts through real-world examples"
    },
    {
      title: "Mastering Essential Math Skills: Fractions",
      author: "Richard W. Fisher",
      level: "Middle School",
      description: "A concise workbook with step-by-step examples and practice problems focused on fractions"
    },
    {
      title: "Math Doesn't Suck",
      author: "Danica McKellar",
      level: "Middle School",
      description: "An engaging approach to math including fraction concepts, written for middle school girls but useful for anyone"
    }
  ];

  const ResourceCard = ({ resource }: { resource: any }) => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full shadow-sm">
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="px-2.5 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-sm space-y-1">
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Level:</strong> {resource.level}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Visit Resource
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const BookCard = ({ book }: { book: any }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="font-bold">{book.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
      <p className="text-sm mt-2">{book.description}</p>
      <Badge variant="outline" className="mt-2">
        {book.level}
      </Badge>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600">
          Fraction Learning Resources
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Expand your understanding of fractions with these helpful resources, tools, and references
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Online Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Book Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookRecommendations.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Fraction Formulas Cheat Sheet</h2>
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Basic Operations</h3>
                <ul>
                  <li>
                    <strong>Addition (same denominator):</strong><br />
                    <code className="text-lg">a/c + b/c = (a+b)/c</code>
                  </li>
                  <li>
                    <strong>Addition (different denominators):</strong><br />
                    <code className="text-lg">a/b + c/d = (a×d + b×c)/(b×d)</code>
                  </li>
                  <li>
                    <strong>Subtraction (same denominator):</strong><br />
                    <code className="text-lg">a/c - b/c = (a-b)/c</code>
                  </li>
                  <li>
                    <strong>Subtraction (different denominators):</strong><br />
                    <code className="text-lg">a/b - c/d = (a×d - b×c)/(b×d)</code>
                  </li>
                  <li>
                    <strong>Multiplication:</strong><br />
                    <code className="text-lg">(a/b) × (c/d) = (a×c)/(b×d)</code>
                  </li>
                  <li>
                    <strong>Division:</strong><br />
                    <code className="text-lg">(a/b) ÷ (c/d) = (a×d)/(b×c)</code>
                  </li>
                </ul>

                <h3>Simplifying Fractions</h3>
                <p>Divide both numerator and denominator by their greatest common divisor (GCD).</p>
                <code className="text-lg">a/b = (a÷gcd)/(b÷gcd)</code>

                <h3>Converting Between Forms</h3>
                <ul>
                  <li>
                    <strong>Mixed number to improper fraction:</strong><br />
                    <code className="text-lg">a b/c = (a×c + b)/c</code>
                  </li>
                  <li>
                    <strong>Improper fraction to mixed number:</strong><br />
                    <code className="text-lg">a/b = (a÷b) remainder (a mod b)/b</code>
                  </li>
                  <li>
                    <strong>Fraction to decimal:</strong><br />
                    <code className="text-lg">a/b = a ÷ b</code>
                  </li>
                  <li>
                    <strong>Fraction to percentage:</strong><br />
                    <code className="text-lg">a/b = (a ÷ b) × 100%</code>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default FractionResources;
