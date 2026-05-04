import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

export const Nebula = ({ 
  position = [0, 0, -20], 
  color = '#8b5cf6',
  scale = 15 
}: NebulaProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(scale, scale, 1, 1);
  }, [scale]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center);
          
          float n = noise(vUv * 3.0 + uTime * 0.1);
          float alpha = smoothstep(0.5, 0.0, dist) * (0.3 + n * 0.2);
          
          vec3 finalColor = uColor * (1.0 + n * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = 
        state.clock.elapsedTime;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      geometry={geometry}
      material={material}
    />
  );
};
