import React from "react";

function Doubt() {
  return (
    <section className="py-16 px-6 flex justify-center bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          In Doubt? Can't Decide?
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Don't hesitate & hand over your queries to our travel experts. Let
          them assist you with authentic insights and personalized
          recommendations for your perfect journey.
        </p>

        <button
          type="button"
          className="
            px-8 py-3 rounded-full text-white font-semibold
            bg-gradient-to-r from-blue-500 to-green-500
            hover:from-blue-600 hover:to-green-600
            transition-all duration-300
            shadow-md hover:shadow-lg
            hover:scale-105 active:scale-95
          "
        >
          Reach Out To Us
        </button>
      </div>
    </section>
  );
}

export default Doubt;
