import React, { useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2TripDates from "./Step2TripDates";
import Step3Pricing from "./Step3Pricing";
import Step4Seats from "./Step4Seats";
import Step5Highlights from "./Step5Highlights";
import Step6itenary from "./Step6itenary"
import Step7Info from "./Step7Info";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddTrip = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    category: "",
    duration: "",
    departureDate: "",
    returnDate: "",
    bookingDeadline: "",
    batchDates: [],
    pricingDetails: {
      pricePerPerson: "",
      discountPrice: "",
      earlyBird: "",
      groupDiscount: "",
      paymentType: "full",
      partialAmount: "",
    },
    seats: {
      totalSeats: "",
      seatsLeft: "",
      status: "",
    },
    highlights: [],
    coverImage: "",
    itinerary: [],
    includes: [],
    excludes: [],
    importantInfo: {
      whatToCarry: "",
      weather: "",
      idProof: "",
      cancellation: "",
    },

    organizer: {
      name: "",
      phone: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Validation (important)
      if (!formData.coverImage) {
        alert("Please upload cover image");
        return;
      }

      if (formData.itinerary.length === 0) {
        alert("Please add itinerary");
        return;
      }

      // ✅ Save to Firestore
      const docRef = await addDoc(collection(db, "Upcommingtrips"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      console.log("Trip added with ID:", docRef.id);

      alert("Trip created successfully 🚀");

      // ✅ Reset form (optional)
      setFormData({
        title: "",
        destination: "",
        category: "",
        duration: "",
        departureDate: "",
        returnDate: "",
        bookingDeadline: "",
        batchDates: [],
        pricingDetails: {
          pricePerPerson: "",
          discountPrice: "",
          earlyBird: "",
          groupDiscount: "",
          paymentType: "full",
          partialAmount: "",
        },
        seats: {
          totalSeats: "",
          seatsLeft: "",
          status: "",
        },
        highlights: [],
        coverImage: "",
        itinerary: [],
        includes: [],
        excludes: [],
        importantInfo: {
          whatToCarry: "",
          weather: "",
          idProof: "",
          cancellation: "",
        },
        organizer: {
          name: "",
          phone: "",
        },
      });

      setStep(1); // go back to start
    } catch (error) {
      console.error("Error adding trip:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 p-6 rounded-2xl w-full max-w-2xl"
      >
        {step === 1 && (
          <Step1BasicInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2TripDates
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(1)}
            nextStep={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3Pricing
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(2)}
            nextStep={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <Step4Seats
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(3)}
            nextStep={() => setStep(5)}
          />
        )}
        {step === 5 && (
          <Step5Highlights
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(4)}
            nextStep={() => setStep(6)}
          />
        )}
        {step === 6 && (
          <Step6itenary
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(5)}
            nextStep={() => setStep(7)}
          />
        )}
        {step === 7 && (
          <Step7Info
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(6)}
            nextStep={() => setStep(8)}
          />
        )}
      </form>
    </div>
  );
};

export default AddTrip;
