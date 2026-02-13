import React, { Suspense } from "react";
import Hero from "../components/Hero";

/* ==========================
   LAZY LOADED SECTIONS
========================== */
const WhyChooseUs = React.lazy(() => import("../components/WhyChooseUs"));
const Popular = React.lazy(() => import("./PopularTours"));
const Destinations = React.lazy(() => import("../components/Destinations"));
const Testimonial = React.lazy(() => import("../components/Testimonials"));
const CTA = React.lazy(() => import("../components/FinalCTA"));
const Doubt = React.lazy(() => import("../components/Doubt"));

/* ==========================
   SKELETON FALLBACK
========================== */
const SectionSkeleton = () => (
  <div className="h-[350px] w-full animate-pulse bg-gray-100 rounded-xl my-16" />
);

function Home() {
  return (
    <>
      {/* HERO – DO NOT LAZY LOAD */}
      <Hero />

      {/* BELOW-THE-FOLD CONTENT */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Popular />
      </Suspense>

      {/* <Suspense fallback={<SectionSkeleton />}>
        <Destinations />
      </Suspense> */}
      <Suspense fallback={<SectionSkeleton />}>
        <Doubt />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonial />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTA />
      </Suspense>
    </>
  );
}

export default Home;
