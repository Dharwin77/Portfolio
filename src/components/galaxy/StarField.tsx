import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  radius?: number;
}

export const StarField = ({ count = 5000, radius = 100 }: StarFieldProps) => {
  const points = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Color variation (white to cyan to purple)
      const colorChoice = Math.random();
      if (colorChoice > 0.9) {
        // Cyan stars
        colors[i3] = 0.5;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 1;
      } else if (colorChoice > 0.8) {
        // Purple stars
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.5;
        colors[i3 + 2] = 1;
      } else if (colorChoice > 0.7) {
        // Blue stars
        colors[i3] = 0.5;
        colors[i3 + 1] = 0.7;
        colors[i3 + 2] = 1;
      } else {
        // White stars
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, [count, radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
