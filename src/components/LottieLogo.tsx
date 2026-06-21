import { lazy, Suspense, useState, useEffect } from 'react';

// Lazy-load lottie-react into a separate dynamic async chunk
// This removes lottie-web eval() from the main bundle
const LottieComponent = lazy(() => import('lottie-react'));

const LottieLogo = ({ className }: { className?: string }) => {
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    // Dynamically import the animation JSON so it's not in the main bundle
    import('../assets/student_with_laptop.json').then((mod) => {
      setAnimData(mod.default);
    });
  }, []);

  if (!animData) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
        <LottieComponent
          animationData={animData}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
};

export default LottieLogo;
