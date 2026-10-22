export const planetVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uPink;
  uniform vec3 uViolet;
  uniform float uBoost;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;

  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.6);
    float vertical = clamp(normalize(vPosition).y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uPink, uViolet, smoothstep(0.15, 0.95, vertical));
    gl_FragColor = vec4(color, fresnel * 0.72 * uBoost);
  }
`;

export const coreFragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;

  void main() {
    float vertical = normalize(vPosition).y * 0.5 + 0.5;
    vec3 color = mix(uBottom, uTop, smoothstep(0.1, 0.95, vertical));
    float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.4);
    color += uRim * rim * 0.55;
    gl_FragColor = vec4(color, 1.0);
  }
`;
