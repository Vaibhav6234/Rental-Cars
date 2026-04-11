import React from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import CustomerReview from "./CustomerReview";
import Faq from "./Faq";
import Carousel from "./Carousel";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks/>
      <Carousel />
      <CustomerReview/>
      <Faq/>
    </div>
  );
};

export default LandingPage;
