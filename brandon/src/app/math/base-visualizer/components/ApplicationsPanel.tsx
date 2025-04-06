import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const ApplicationsPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of Number Systems</h2>
        
        <p>
          Different number systems serve crucial roles across various fields, from computer science and digital electronics
          to cryptography and everyday calculations. Understanding how to work with and convert between these systems
          is essential for many technical disciplines.
        </p>
      </div>

      <Tabs defaultValue="computing">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="computing">Computing</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="cryptography">Cryptography</TabsTrigger>
          <TabsTrigger value="everyday">Everyday Life</TabsTrigger>
        </TabsList>

        <TabsContent value="computing" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Computer Science Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Binary (Base-2)</h4>
              <p className="mb-4">
                Binary is the foundation of all digital computing, as electronic circuits can easily represent two states (on/off, high/low voltage).
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Data Storage:</strong> All data in computers is ultimately stored as binary digits (bits).
                </li>
                <li>
                  <strong>Boolean Logic:</strong> Binary values directly correspond to Boolean logic (true/false), which forms the basis of computer operations.
                </li>
                <li>
                  <strong>Machine Code:</strong> The lowest level of computer instructions are encoded in binary.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Hexadecimal (Base-16)</h4>
              <p className="mb-4">
                Hexadecimal provides a more human-readable way to represent binary data, with each hex digit representing exactly 4 binary digits.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Memory Addresses:</strong> Memory locations in computers are typically expressed in hexadecimal.
                </li>
                <li>
                  <strong>Assembly Language:</strong> Many assembly languages use hexadecimal notation for memory addresses and immediate values.
                </li>
                <li>
                  <strong>Debugging:</strong> Memory dumps and low-level debugging often display data in hexadecimal format.
                </li>
                <li>
                  <strong>Color Codes:</strong> Web colors are specified using hexadecimal notation (e.g., #FF5733).
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Octal (Base-8)</h4>
              <p className="mb-4">
                While less common today, octal has historical significance in computing.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Unix File Permissions:</strong> File permissions in Unix/Linux systems are traditionally represented in octal (e.g., chmod 755).
                </li>
                <li>
                  <strong>Legacy Systems:</strong> Some older computer systems used octal for memory addresses and machine code representation.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
              <p className="mb-4">
                Most programming languages support multiple number system notations:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Base</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prefix/Notation</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Languages</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Binary</td>
                      <td className="px-4 py-3 whitespace-nowrap">0b or 0B</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">0b1010</td>
                      <td className="px-4 py-3">C, C++, Java, Python, JavaScript</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Octal</td>
                      <td className="px-4 py-3 whitespace-nowrap">0 or 0o</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">0o17 or 017</td>
                      <td className="px-4 py-3">C, C++, Java, Python, JavaScript</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Hexadecimal</td>
                      <td className="px-4 py-3 whitespace-nowrap">0x or 0X</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">0xFF</td>
                      <td className="px-4 py-3">C, C++, Java, Python, JavaScript</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Bit Manipulation</h5>
                <p className="mb-2">
                  Different number systems are particularly useful for bit manipulation operations in programming:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Setting, clearing, or toggling specific bits</li>
                  <li>Bitwise operations (AND, OR, XOR, NOT)</li>
                  <li>Bit shifting and rotation</li>
                  <li>Creating and applying bitmasks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electronics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Digital Electronics</h3>
              
              <h4 className="text-lg font-medium mb-3">Binary Logic</h4>
              <p className="mb-4">
                Digital circuits operate using binary logic, where voltage levels represent binary states.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Logic Gates:</strong> AND, OR, NOT, XOR, and other gates implement binary operations directly in hardware.
                </li>
                <li>
                  <strong>Flip-Flops and Registers:</strong> These components store binary values as the basic memory elements in digital systems.
                </li>
                <li>
                  <strong>Multiplexers and Decoders:</strong> These components route binary signals based on binary selection inputs.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Binary Coded Decimal (BCD)</h4>
              <p className="mb-4">
                BCD encodes each decimal digit using four binary bits, making it easier to convert between binary and decimal for display purposes.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Decimal 95 in BCD</h5>
                <p className="font-mono">
                  9 → 1001<br />
                  5 → 0101<br />
                  95 in BCD: 1001 0101
                </p>
              </div>
              <p className="mb-4">
                BCD is commonly used in:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Digital clocks and watches</li>
                <li>Electronic calculators</li>
                <li>Digital multimeters and measurement equipment</li>
                <li>Systems where decimal display is required</li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Gray Code</h4>
              <p className="mb-4">
                Gray code is a binary numeral system where consecutive numbers differ by only one bit, reducing errors in electromechanical systems.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Binary vs. Gray Code</h5>
                <div className="grid grid-cols-3 gap-4">
                  <div>Decimal</div>
                  <div>Binary</div>
                  <div>Gray Code</div>
                  <div>0</div>
                  <div className="font-mono">000</div>
                  <div className="font-mono">000</div>
                  <div>1</div>
                  <div className="font-mono">001</div>
                  <div className="font-mono">001</div>
                  <div>2</div>
                  <div className="font-mono">010</div>
                  <div className="font-mono">011</div>
                  <div>3</div>
                  <div className="font-mono">011</div>
                  <div className="font-mono">010</div>
                  <div>4</div>
                  <div className="font-mono">100</div>
                  <div className="font-mono">110</div>
                  <div>5</div>
                  <div className="font-mono">101</div>
                  <div className="font-mono">111</div>
                  <div>6</div>
                  <div className="font-mono">110</div>
                  <div className="font-mono">101</div>
                  <div>7</div>
                  <div className="font-mono">111</div>
                  <div className="font-mono">100</div>
                </div>
              </div>
              <p className="mt-4">
                Gray code is used in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rotary encoders and position sensors</li>
                <li>Error correction in digital communications</li>
                <li>Genetic algorithms and optimization problems</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Hardware Design and Debugging</h3>
              
              <h4 className="text-lg font-medium mb-3">Hexadecimal in Hardware Design</h4>
              <p className="mb-4">
                Hexadecimal notation is extensively used in hardware design and debugging:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Memory Dumps:</strong> Examining the contents of memory in hexadecimal format.
                </li>
                <li>
                  <strong>Hardware Registers:</strong> Configuration registers in microcontrollers and other hardware are typically documented and accessed using hexadecimal values.
                </li>
                <li>
                  <strong>I/O Port Addresses:</strong> Hardware I/O ports are typically addressed using hexadecimal notation.
                </li>
                <li>
                  <strong>Firmware Development:</strong> Embedded systems programming often involves direct manipulation of memory-mapped registers using hexadecimal values.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Binary in Signal Analysis</h4>
              <p className="mb-4">
                Binary representation is crucial for analyzing digital signals:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Logic Analyzers:</strong> These tools capture and display digital signals as binary waveforms.
                </li>
                <li>
                  <strong>Protocol Analysis:</strong> Communication protocols (SPI, I2C, UART, etc.) are analyzed at the bit level.
                </li>
                <li>
                  <strong>Timing Diagrams:</strong> Digital circuit timing is represented using binary signal levels.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cryptography" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Cryptography and Security</h3>
              
              <h4 className="text-lg font-medium mb-3">Binary in Cryptographic Operations</h4>
              <p className="mb-4">
                Cryptographic algorithms operate at the bit level, making binary representation essential:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Bitwise Operations:</strong> Encryption algorithms use XOR, rotations, and other bitwise operations.
                </li>
                <li>
                  <strong>Hash Functions:</strong> Cryptographic hash functions process data at the bit level to produce fixed-length outputs.
                </li>
                <li>
                  <strong>Random Number Generation:</strong> Cryptographically secure random number generators produce streams of random bits.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Hexadecimal in Cryptography</h4>
              <p className="mb-4">
                Hexadecimal notation is widely used to represent cryptographic values:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Cryptographic Keys:</strong> Keys are typically represented in hexadecimal format.
                </li>
                <li>
                  <strong>Hash Values:</strong> The output of hash functions (MD5, SHA-1, SHA-256, etc.) is commonly displayed in hexadecimal.
                </li>
                <li>
                  <strong>Digital Certificates:</strong> Certificate fingerprints and other identifiers are represented in hexadecimal.
                </li>
                <li>
                  <strong>Initialization Vectors (IVs):</strong> IVs used in encryption algorithms are often specified in hexadecimal.
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: SHA-256 Hash</h5>
                <p className="mb-2">The SHA-256 hash of "Hello, World!" in hexadecimal:</p>
                <p className="font-mono break-all">
                  dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Data Encoding and Transmission</h3>
              
              <h4 className="text-lg font-medium mb-3">Base64 Encoding</h4>
              <p className="mb-4">
                Base64 is a number system that uses 64 different ASCII characters to represent binary data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Email Attachments:</strong> Binary files are encoded in Base64 for transmission in email systems.
                </li>
                <li>
                  <strong>Data URLs:</strong> Binary data can be embedded directly in HTML or CSS using Base64 encoding.
                </li>
                <li>
                  <strong>API Communications:</strong> Binary data in JSON payloads is typically encoded in Base64.
                </li>
                <li>
                  <strong>Certificates and Keys:</strong> X.509 certificates and cryptographic keys are often stored in Base64 format (PEM).
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Hexadecimal in Network Security</h4>
              <p className="mb-4">
                Hexadecimal notation is used extensively in network security:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>MAC Addresses:</strong> Network interface hardware addresses are represented in hexadecimal (e.g., 00:1A:2B:3C:4D:5E).
                </li>
                <li>
                  <strong>Packet Analysis:</strong> Network packet contents are typically displayed in hexadecimal in packet analyzers like Wireshark.
                </li>
                <li>
                  <strong>IPv6 Addresses:</strong> IPv6 addresses use hexadecimal notation (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).
                </li>
                <li>
                  <strong>Security Tokens:</strong> Session tokens, API keys, and other security identifiers are often represented in hexadecimal.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="everyday" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Everyday Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Decimal System in Daily Life</h4>
              <p className="mb-4">
                The decimal (base-10) system is the most widely used number system in everyday life:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Currency and Finance:</strong> Monetary values, financial calculations, and accounting all use decimal.
                </li>
                <li>
                  <strong>Measurements:</strong> Most measurement systems (metric, imperial) use decimal divisions.
                </li>
                <li>
                  <strong>Time:</strong> While time uses a mixed base system (60 seconds, 60 minutes, 24 hours), decimal is used for fractions of seconds.
                </li>
                <li>
                  <strong>Statistics:</strong> Population figures, percentages, and statistical data are expressed in decimal.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Binary in Consumer Electronics</h4>
              <p className="mb-4">
                Binary concepts appear in consumer electronics and everyday technology:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Digital Storage:</strong> Storage capacities (KB, MB, GB, TB) are based on powers of 2.
                </li>
                <li>
                  <strong>On/Off Controls:</strong> Simple binary states (on/off, yes/no, true/false) are fundamental to user interfaces.
                </li>
                <li>
                  <strong>Digital Photography:</strong> Image resolution, bit depth, and color channels all involve binary concepts.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Hexadecimal in Design and Media</h4>
              <p className="mb-4">
                Hexadecimal notation is commonly used in design and media applications:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Color Codes:</strong> Web colors and digital design use hexadecimal RGB values (e.g., #FF5733 for a shade of orange).
                </li>
                <li>
                  <strong>Digital Art:</strong> Color selection and manipulation in digital art software often uses hexadecimal values.
                </li>
                <li>
                  <strong>Typography:</strong> Unicode character codes are often referenced in hexadecimal.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Alternative Number Systems in Specific Domains</h3>
              
              <h4 className="text-lg font-medium mb-3">Duodecimal (Base-12) System</h4>
              <p className="mb-4">
                The duodecimal system has advantages for certain calculations due to its divisibility by 2, 3, 4, and 6:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Time:</strong> 12-hour clock format and 12 months in a year.
                </li>
                <li>
                  <strong>Packaging:</strong> Items are often sold by the dozen or gross (12 dozen).
                </li>
                <li>
                  <strong>Imperial Measurements:</strong> 12 inches in a foot.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Sexagesimal (Base-60) System</h4>
              <p className="mb-4">
                The ancient Babylonian sexagesimal system survives in modern time and angle measurements:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Time:</strong> 60 seconds in a minute, 60 minutes in an hour.
                </li>
                <li>
                  <strong>Angular Measurement:</strong> 360 degrees in a circle, 60 minutes in a degree, 60 seconds in a minute.
                </li>
                <li>
                  <strong>Geographic Coordinates:</strong> Latitude and longitude expressed in degrees, minutes, and seconds.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Vigesimal (Base-20) System</h4>
              <p className="mb-4">
                The vigesimal system appears in some languages and traditional counting systems:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>French Numbers:</strong> Numbers like 80 (quatre-vingts, literally "four twenties").
                </li>
                <li>
                  <strong>Maya Numeration:</strong> The ancient Maya used a base-20 number system.
                </li>
                <li>
                  <strong>Traditional Counting:</strong> Some traditional counting systems count by scores (20s).
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsPanel;
