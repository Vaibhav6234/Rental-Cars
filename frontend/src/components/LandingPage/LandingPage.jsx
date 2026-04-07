import React from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import CustomerReview from "./CustomerReview";
import Faq from "./Faq";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks/>
      <CustomerReview/>
      <Faq/>
    </div>
  );
};

export default LandingPage;
