import Lottie from 'lottie-react';
import animationData from '../assets/student_with_laptop.json';

const LottieLogo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieLogo;
