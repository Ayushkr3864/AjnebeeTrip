import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import Step1BasicInfo from "./addSteps/Step1BasicInfo";
import Step2TripDates from "./addSteps/Step2TripDates";
import Step3Pricing from "./addSteps/Step3Pricing";
import Step4Seats from "./addSteps/Step4Seats";
import Step5Highlights from "./addSteps/Step5Highlights";
import Step6itenary from "./addSteps/Step6itenary";
import Step7Info from "./addSteps/Step7Info";

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState(null);

  // 🔥 FETCH EXISTING TRIP
  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, "Upcommingtrips", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setFormData({ id: snap.id, ...snap.data() });
      }

      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!formData) return <p>Trip not found</p>;

  // 🔥 UPDATE HANDLER
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const tripRef = doc(db, "Upcommingtrips", id);

      // ✅ Clean numeric fields
      const updatedData = {
        ...formData,
        pricingDetails: {
          ...formData.pricingDetails,
          pricePerPerson: Number(formData.pricingDetails.pricePerPerson),
          discountPrice: Number(formData.pricingDetails.discountPrice || 0),
          earlyBird: Number(formData.pricingDetails.earlyBird || 0),
          partialAmount: Number(formData.pricingDetails.partialAmount || 0),
        },
        seats: {
          ...formData.seats,
          totalSeats: Number(formData.seats.totalSeats),
          seatsLeft: Number(formData.seats.seatsLeft),
        },
      };

      await updateDoc(tripRef, updatedData);

      alert("Trip updated successfully ✅");
      navigate("/admin/trips");
    } catch (error) {
      console.error(error);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
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
          />
        )}

        {/* FINAL SAVE BUTTON */}
        {step === 7 && (
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Update Trip 🚀
          </button>
        )}
      </form>
    </div>
  );
};

export default EditTrip;
