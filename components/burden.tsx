

import Lottie from "lottie-react";
import laptopAnimation from "@/../../public/burdenNew.json"; 

const BurdenAnimation = () => {
  return (   
      <Lottie animationData={laptopAnimation} loop={true} autoplay={true} />
  );
};

export default BurdenAnimation;
