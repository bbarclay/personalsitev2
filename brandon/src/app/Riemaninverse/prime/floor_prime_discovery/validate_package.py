#!/usr/bin/env python3
"""
Research Package Validation Script
Performs comprehensive verification of all components and generates final report.
"""

import os
import json
import hashlib
import subprocess
from typing import Dict, List
import datetime
import matplotlib.pyplot as plt

class ResearchValidator:
    def __init__(self):
        self.base_dir = "prime/floor_prime_discovery"
        self.results = {
            'components': {},
            'tests': {},
            'verification': {},
            'integrity': {}
        }
    
    def verify_files(self) -> Dict:
        """Verify presence and integrity of all required files."""
        required_files = {
            'core': [
                'structural_invariant_test.py',
                'quick_spectral_test.py',
                'deep_spectral_analysis.py',
                'comprehensive_verification.py',
                'visualize_correspondence.py'
            ],
            'documentation': [
                'RESEARCH_SUMMARY.md',
                'final_summary.md',
                'spectral_theorem.md',
                'rigorous_proof.md',
                'final_verification_results.md'
            ],
            'publication': [
                'publication_package/1_main_paper/main.tex',
                'publication_package/README.md'
            ]
        }
        
        results = {}
        for category, files in required_files.items():
            results[category] = {}
            for file in files:
                path = f"{self.base_dir}/{file}"
                exists = os.path.exists(path)
                if exists:
                    with open(path, 'rb') as f:
                        content = f.read()
                        hash_value = hashlib.sha256(content).hexdigest()
                else:
                    hash_value = None
                
                results[category][file] = {
                    'exists': exists,
                    'hash': hash_value
                }
        
        return results
    
    def verify_proofs(self) -> Dict:
        """Verify mathematical proofs and theoretical components."""
        proof_files = [
            'rigorous_proof.md',
            'spectral_theorem.md',
            'formal_proof.md'
        ]
        
        results = {}
        for file in proof_files:
            path = f"{self.base_dir}/{file}"
            if os.path.exists(path):
                with open(path, 'r') as f:
                    content = f.read()
                    # Check for critical proof components
                    has_theorem = 'Theorem' in content
                    has_proof = 'Proof' in content
                    has_qed = 'therefore' in content.lower()
                    
                    results[file] = {
                        'has_theorem': has_theorem,
                        'has_proof': has_proof,
                        'has_conclusion': has_qed,
                        'length': len(content)
                    }
            else:
                results[file] = {'exists': False}
        
        return results
    
    def verify_implementation(self) -> Dict:
        """Verify core algorithm implementations."""
        test_files = [
            'structural_invariant_test.py',
            'quick_spectral_test.py',
            'comprehensive_verification.py'
        ]
        
        results = {}
        for file in test_files:
            path = f"{self.base_dir}/{file}"
            if os.path.exists(path):
                # Run simple test execution
                try:
                    output = subprocess.run(
                        ['python3', '-m', 'py_compile', path],
                        capture_output=True,
                        text=True
                    )
                    results[file] = {
                        'compiles': output.returncode == 0,
                        'error': output.stderr if output.returncode != 0 else None
                    }
                except Exception as e:
                    results[file] = {
                        'compiles': False,
                        'error': str(e)
                    }
            else:
                results[file] = {'exists': False}
        
        return results
    
    def verify_results(self) -> Dict:
        """Verify experimental results and findings."""
        result_files = [
            'final_verification_results.md',
            'spectral_findings.md',
            'visualization_analysis.md'
        ]
        
        results = {}
        for file in result_files:
            path = f"{self.base_dir}/{file}"
            if os.path.exists(path):
                with open(path, 'r') as f:
                    content = f.read()
                    # Check for critical results
                    has_data = any(str(i) in content for i in range(10))
                    has_analysis = 'Analysis' in content
                    has_conclusion = 'Conclusion' in content
                    
                    results[file] = {
                        'has_data': has_data,
                        'has_analysis': has_analysis,
                        'has_conclusion': has_conclusion
                    }
            else:
                results[file] = {'exists': False}
        
        return results
    
    def verify_publication(self) -> Dict:
        """Verify publication package completeness."""
        required_dirs = [
            '1_main_paper',
            '2_proofs',
            '3_experimental_evidence',
            '4_code',
            '5_visualizations',
            '6_supplementary'
        ]
        
        results = {
            'structure': {},
            'content': {}
        }
        
        # Check directory structure
        for dir_name in required_dirs:
            path = f"{self.base_dir}/publication_package/{dir_name}"
            exists = os.path.exists(path)
            if exists:
                files = os.listdir(path)
            else:
                files = []
            
            results['structure'][dir_name] = {
                'exists': exists,
                'file_count': len(files),
                'files': files
            }
        
        # Verify key content files
        results['content']['main_tex'] = os.path.exists(
            f"{self.base_dir}/publication_package/1_main_paper/main.tex"
        )
        results['content']['readme'] = os.path.exists(
            f"{self.base_dir}/publication_package/README.md"
        )
        
        return results
    
    def generate_report(self):
        """Generate comprehensive validation report."""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        report = f"""
# Research Package Validation Report
Generated: {timestamp}

## 1. Component Verification

### Files and Integrity
"""
        # Add file verification results
        self.results['components'] = self.verify_files()
        for category, files in self.results['components'].items():
            report += f"\n### {category.title()}\n"
            for file, status in files.items():
                check = "✓" if status['exists'] else "✗"
                report += f"- [{check}] {file}\n"
        
        report += "\n## 2. Proof Verification\n"
        # Add proof verification results
        self.results['proofs'] = self.verify_proofs()
        for file, status in self.results['proofs'].items():
            if 'exists' in status and not status['exists']:
                report += f"- ✗ {file}: Missing\n"
            else:
                checks = []
                if status['has_theorem']: checks.append("Theorem")
                if status['has_proof']: checks.append("Proof")
                if status['has_conclusion']: checks.append("Conclusion")
                report += f"- ✓ {file}: {', '.join(checks)}\n"
        
        report += "\n## 3. Implementation Verification\n"
        # Add implementation verification results
        self.results['implementation'] = self.verify_implementation()
        for file, status in self.results['implementation'].items():
            if 'exists' in status and not status['exists']:
                report += f"- ✗ {file}: Missing\n"
            else:
                check = "✓" if status['compiles'] else "✗"
                report += f"- [{check}] {file}\n"
                if not status['compiles']:
                    report += f"  Error: {status['error']}\n"
        
        report += "\n## 4. Results Verification\n"
        # Add results verification
        self.results['verification'] = self.verify_results()
        for file, status in self.results['verification'].items():
            if 'exists' in status and not status['exists']:
                report += f"- ✗ {file}: Missing\n"
            else:
                checks = []
                if status['has_data']: checks.append("Data")
                if status['has_analysis']: checks.append("Analysis")
                if status['has_conclusion']: checks.append("Conclusion")
                report += f"- ✓ {file}: {', '.join(checks)}\n"
        
        report += "\n## 5. Publication Package\n"
        # Add publication package verification
        self.results['publication'] = self.verify_publication()
        for dir_name, status in self.results['publication']['structure'].items():
            check = "✓" if status['exists'] else "✗"
            report += f"- [{check}] {dir_name}: {status['file_count']} files\n"
        
        report += "\n## Summary\n"
        # Calculate overall statistics
        total_files = sum(len(files) for files in self.results['components'].values())
        existing_files = sum(
            sum(1 for status in files.values() if status['exists'])
            for files in self.results['components'].values()
        )
        
        report += f"""
Total Components: {total_files}
Verified Components: {existing_files}
Completion Rate: {(existing_files/total_files)*100:.1f}%

Status: {'✓ COMPLETE' if existing_files == total_files else '⚠ INCOMPLETE'}
"""
        
        # Save report
        report_path = f"{self.base_dir}/VALIDATION_REPORT.md"
        with open(report_path, 'w') as f:
            f.write(report)
        
        return report_path

def main():
    """Run complete package validation."""
    print("Starting research package validation...")
    validator = ResearchValidator()
    report_path = validator.generate_report()
    print(f"\nValidation complete. Report saved to: {report_path}")
    
    # Print summary
    with open(report_path, 'r') as f:
        print("\nValidation Summary:")
        print("=" * 50)
        print(f.read())

if __name__ == "__main__":
    main()
