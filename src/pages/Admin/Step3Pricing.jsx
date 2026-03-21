import React from "react";

const Step3Pricing = ({ formData, setFormData, prevStep, nextStep }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-amber-400 mb-6">
        Step 3: Pricing Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Price per person */}
        <input
          type="number"
          placeholder="Price per person"
          value={formData.pricingDetails.pricePerPerson}
          onChange={(e) =>
            setFormData({
              ...formData,
              pricingDetails: {
                ...formData.pricingDetails,
                pricePerPerson: e.target.value,
              },
            })
          }
          className="input"
        />

        {/* Discount price */}
        <input
          type="number"
          placeholder="Discount price (optional)"
          value={formData.pricingDetails.discountPrice}
          onChange={(e) =>
            setFormData({
              ...formData,
              pricingDetails: {
                ...formData.pricingDetails,
                discountPrice: e.target.value,
              },
            })
          }
          className="input"
        />

        {/* Early Bird */}
        <input
          type="text"
          placeholder="Early bird offer (e.g. ₹500 off till 10 Oct)"
          value={formData.pricingDetails.earlyBird}
          onChange={(e) =>
            setFormData({
              ...formData,
              pricingDetails: {
                ...formData.pricingDetails,
                earlyBird: e.target.value,
              },
            })
          }
          className="input"
        />

        {/* Group Discount */}
        <input
          type="text"
          placeholder="Group discount (e.g. 5% for 4+ people)"
          value={formData.pricingDetails.groupDiscount}
          onChange={(e) =>
            setFormData({
              ...formData,
              pricingDetails: {
                ...formData.pricingDetails,
                groupDiscount: e.target.value,
              },
            })
          }
          className="input"
        />
      </div>

      {/* Payment Options */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3">
          Payment Options
        </h3>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="full"
              checked={formData.pricingDetails.paymentType === "full"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricingDetails: {
                    ...formData.pricingDetails,
                    paymentType: e.target.value,
                  },
                })
              }
            />
            Full Payment
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="partial"
              checked={formData.pricingDetails.paymentType === "partial"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricingDetails: {
                    ...formData.pricingDetails,
                    paymentType: e.target.value,
                  },
                })
              }
            />
            Partial Booking
          </label>
        </div>

        {/* Partial Amount */}
        {formData.pricingDetails.paymentType === "partial" && (
          <input
            type="number"
            placeholder="Enter partial booking amount"
            value={formData.pricingDetails.partialAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                pricingDetails: {
                  ...formData.pricingDetails,
                  partialAmount: e.target.value,
                },
              })
            }
            className="input mt-3"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          ⬅️ Back
        </button>

        <button
          onClick={nextStep}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Step3Pricing;
