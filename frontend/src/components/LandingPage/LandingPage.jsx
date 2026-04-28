import React, { lazy, Suspense } from "react";
import Hero from "./Hero";

const HowItWorks = lazy(() => import("./HowItWorks"));
const Carousel = lazy(() => import("./Carousel"));
const CustomerReview = lazy(() => import("./CustomerReview"));
const Faq = lazy(() => import("./Faq"));

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={null}>
        <HowItWorks />
        <Carousel />
        <CustomerReview />
        <Faq />
      </Suspense>
    </div>
  );
};

export default LandingPage;
