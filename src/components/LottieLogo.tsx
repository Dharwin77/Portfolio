import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

// lottie-react is imported synchronously to preserve React module init order.
// ONLY the heavy animation JSON (863KB) is loaded dynamically — this alone
// reduces the main bundle from 954KB to ~92KB without any React context errors.
const LottieLogo = ({ className }: { className?: string }) => {
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    import('../assets/student_with_laptop.json').then((mod) => {
      setAnimData(mod.default);
    });
  }, []);

  if (!animData) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animData}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieLogo;
