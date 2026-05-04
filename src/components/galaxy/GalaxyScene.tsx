import { Canvas } from '@react-three/fiber';
import { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { StarField } from './StarField';
import { Nebula } from './Nebula';

// Error Boundary for WebGL failures
class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('GalaxyScene WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback to gradient background if WebGL fails
      return (
        <div 
          className="fixed inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
          }}
        />
      );
    }

    return this.props.children;
  }
}

export const GalaxyScene = () => {
  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onCreated={(state) => {
            console.log('WebGL Canvas created successfully');
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <StarField count={3000} radius={80} />
            <Nebula position={[-15, 10, -30]} color="#8b5cf6" scale={25} />
            <Nebula position={[20, -5, -40]} color="#06b6d4" scale={20} />
            <Nebula position={[0, 0, -50]} color="#ec4899" scale={30} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};
