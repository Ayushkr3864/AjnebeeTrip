import React, { useState } from "react";

const Step6Itinerary = ({ formData, setFormData, prevStep,nextStep }) => {
  const [dayTitle, setDayTitle] = useState("");
  const [includeInput, setIncludeInput] = useState("");
    const [excludeInput, setExcludeInput] = useState("");
    const [dayInput, setDayInput] = useState({
      title: "",
      descriptionPoints: [],
    });

    const [dayDescInput, setDayDescInput] = useState("");

    const [itineraryDays, setItineraryDays] = useState([]);

    // ADD DAY
    const addDayDescriptionPoint = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!dayDescInput.trim()) return;

        setDayInput({
          ...dayInput,
          descriptionPoints: [
            ...dayInput.descriptionPoints,
            dayDescInput.trim(),
          ],
        });

        setDayDescInput("");
      }
    };
    const removeDayDescriptionPoint = (point) => {
      setDayInput({
        ...dayInput,
        descriptionPoints: dayInput.descriptionPoints.filter(
          (p) => p !== point,
        ),
      });
    };
    const addDay = () => {
      if (!dayInput.title) return;

      const newDay = {
        day: `Day ${itineraryDays.length + 1}`,
        title: dayInput.title,
        description: dayInput.descriptionPoints,
      };

      const updatedDays = [...itineraryDays, newDay];

      setItineraryDays(updatedDays);

      // ✅ ALSO SAVE TO formData (VERY IMPORTANT)
      setFormData({
        ...formData,
        itinerary: updatedDays,
      });

      // reset input
      setDayInput({ title: "", descriptionPoints: [] });
    };
//   const addDay = () => {
//     if (!dayTitle) return;

//     const newDay = {
//       day: `Day ${formData.itinerary.length + 1}`,
//       title: dayTitle,
//     };

//     setFormData({
//       ...formData,
//       itinerary: [...formData.itinerary, newDay],
//     });

//     setDayTitle("");
//   };

  // REMOVE DAY
 const removeDay = (index) => {
   const updated = itineraryDays.filter((_, i) => i !== index);

   setItineraryDays(updated);

   // sync with formData
   setFormData({
     ...formData,
     itinerary: updated,
   });
 };

  // ADD INCLUDE
  const addInclude = () => {
    if (!includeInput) return;

    setFormData({
      ...formData,
      includes: [...formData.includes, includeInput],
    });

    setIncludeInput("");
  };

  // REMOVE INCLUDE
  const removeInclude = (index) => {
    const updated = formData.includes.filter((_, i) => i !== index);
    setFormData({ ...formData, includes: updated });
  };

  // ADD EXCLUDE
  const addExclude = () => {
    if (!excludeInput) return;

    setFormData({
      ...formData,
      excludes: [...formData.excludes, excludeInput],
    });

    setExcludeInput("");
  };

  // REMOVE EXCLUDE
  const removeExclude = (index) => {
    const updated = formData.excludes.filter((_, i) => i !== index);
    setFormData({ ...formData, excludes: updated });
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 6: Itinerary & Details
      </h2>

      {/* ================= DAY-WISE ITINERARY ================= */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3">
          Day-wise Itinerary
        </h3>

        {/* DAY TITLE */}
        <input
          type="text"
          placeholder="Day Title (e.g. Departure from Delhi)"
          value={dayInput.title}
          onChange={(e) => setDayInput({ ...dayInput, title: e.target.value })}
          className="border p-2 rounded-lg w-full mb-2"
        />

        {/* DESCRIPTION INPUT */}
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-amber-400 mb-2">
            Day Description Points
          </h4>

          <div className="flex gap-2">
            <input
              placeholder="Add point (Hotel check-in, Trek...)"
              value={dayDescInput}
              onChange={(e) => setDayDescInput(e.target.value)}
              onKeyDown={addDayDescriptionPoint}
              className="border p-2 rounded-lg flex-1"
            />

            <button
              type="button"
              onClick={() => {
                if (!dayDescInput.trim()) return;

                setDayInput({
                  ...dayInput,
                  descriptionPoints: [
                    ...dayInput.descriptionPoints,
                    dayDescInput.trim(),
                  ],
                });

                setDayDescInput("");
              }}
              className="bg-indigo-500 px-4 rounded-lg text-white"
            >
              Add
            </button>
          </div>

          {/* CHIPS */}
          <div className="flex flex-wrap gap-2 mt-3">
            {dayInput.descriptionPoints.map((point, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
              >
                {point}
                <button
                  type="button"
                  onClick={() => removeDayDescriptionPoint(point)}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* ADD DAY BUTTON */}
        <button
          type="button"
          onClick={addDay}
          className="mt-3 bg-indigo-600 px-4 py-2 rounded-lg text-white"
        >
          ➕ Add Day
        </button>

        {/* DAY LIST */}
        <div className="space-y-3 mt-4">
          {itineraryDays.map((d, index) => (
            <div
              key={index}
              className="bg-indigo-500/10 border border-indigo-300 p-4 rounded-xl"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-indigo-400">{d.day}</p>
                  <p className="text-white font-semibold">{d.title}</p>

                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
                    {d.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <button
                          onClick={() => removeDay(index)}
                          type="button"
                  className="text-red-400"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INCLUSIONS ================= */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-green-600">Inclusions</h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add inclusion"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
                      onClick={addInclude}
                      type="button"
            className="bg-green-600 text-white px-3 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="mt-3 text-sm">
          {formData.includes.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>✅ {item}</span>
              <button
                onClick={() => removeInclude(index)}
                      className="text-red-500 text-xs"
                      type="button"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= EXCLUSIONS ================= */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-red-600">Exclusions</h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add exclusion"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
                      onClick={addExclude}
                      type="button"
            className="bg-red-600 text-white px-3 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="mt-3 text-sm">
          {formData.excludes.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>❌ {item}</span>
              <button
                onClick={() => removeExclude(index)}
                      className="text-red-500 text-xs"
                      type="button"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          ⬅️ Back
        </button>

        <button
                  onClick={nextStep}
                  type="button"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Step6Itinerary;
