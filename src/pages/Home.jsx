import React, { Suspense, useState } from "react";
import Hero from "../components/Hero";
import EnquiryModal from "../components/EnquiryModal";
import StickyEnquireBar from "../components/StickyEnquireBar";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <Hero openEnquiry={() => setIsModalOpen(true)} />

      {/* BELOW THE FOLD */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Popular openEnquiry={() => setIsModalOpen(true)} />
      </Suspense>

      {/* <Suspense fallback={<SectionSkeleton />}>
        <Destinations />
      </Suspense> */}

      <Suspense fallback={<SectionSkeleton />}>
        <Doubt openEnquiry={() => setIsModalOpen(true)} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonial />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTA openEnquiry={() => setIsModalOpen(true)} />
      </Suspense>

      {/* GLOBAL ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* STICKY BOTTOM BAR */}
      <StickyEnquireBar openEnquiry={() => setIsModalOpen(true)} />
    </>
  );
}

export default Home;
