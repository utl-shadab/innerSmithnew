

import Lottie from "lottie-react";
import laptopAnimation from "@/../../public/manLapNew.json"; 

const laptopLottie = () => {
  return (   
      <Lottie animationData={laptopAnimation} loop={true} autoplay={true} />
  );
};

export default laptopLottie;
