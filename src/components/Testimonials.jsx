import React from "react";

const testimonials = [
  {
    name: "Rohit Sharma",
    location: "Delhi",
    quote:
      "Ajnabee Trip handled everything perfectly. The journey felt effortless and memorable.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sneha Verma",
    location: "Mumbai",
    quote:
      "Beautiful destinations and smooth planning. I never had to worry about anything.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Kapoor",
    location: "Bangalore",
    quote:
      "Very professional team. Hotels, travel, and support were all top-notch.",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Neha Singh",
    location: "Pune",
    quote: "One of the best travel experiences I’ve had. Highly recommended!",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Karan Mehta",
    location: "Ahmedabad",
    quote: "Everything was well planned and stress-free. Will book again!",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TestimonialsInfinite = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Space+Grotesk:wght@400;500;600&display=swap');

        :root {
          --bg-base: #f6f8fb;
          --ink-primary: #243047;
          --ink-muted: #5f6b7a;
          --card-bg: rgba(255,255,255,0.9);
          --card-border: rgba(36,48,71,0.08);
        }

        .marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <section
        className="py-28 overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{
              fontFamily: "Fraunces, serif",
              color: "var(--ink-primary)",
            }}
          >
            What Our Travelers Say
          </h2>

          <p
            className="text-lg"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "var(--ink-muted)",
            }}
          >
            Real experiences from people who traveled with Ajnabee Trip.
          </p>
        </div>
        <div className="relative w-full">
          <div className="marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="mx-4 w-[320px] border-[#101828] border-4 shrink-0 rounded-3xl p-6"
                style={{
                  background: "var(--card-bg)",
                  border: "2px solid #101828 ",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                <div className="flex items-center  gap-4 mb-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: "var(--ink-primary)" }}
                    >
                      {t.name}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {t.location}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ink-muted)" }}
                >
                  “{t.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsInfinite;
