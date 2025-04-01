export const vertexShader = `
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform vec3 color;
uniform float time;
uniform float intensity;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  // Calculate distance from center
  float dist = length(vPos.xy);
  
  // Create pulsing effect
  float pulse = sin(time * 2.0) * 0.5 + 0.5;
  
  // Create glow effect
  float glow = smoothstep(1.0, 0.0, dist) * intensity * pulse;
  
  // Add some noise to make it more interesting
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453123);
  glow *= 0.9 + noise * 0.1;
  
  // Final color
  vec3 finalColor = mix(vec3(0.0), color, glow);
  gl_FragColor = vec4(finalColor, glow);
}
`;
