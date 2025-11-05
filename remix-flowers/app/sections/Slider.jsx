import { useEffect, useState } from "react";

const QUOTES = [
  "“Where flowers bloom, so does hope.” — Lady Bird Johnson",
  "“Happiness held is the seed; happiness shared is the flower.” — John Harrigan",
  "“Earth laughs in flowers.” — Ralph Waldo Emerson",
  "“Every flower is a soul blossoming in nature.” — Gerard De Nerval",
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-slider">
      <button
        aria-label="Previous"
        className="hero-arrow left"
        onClick={() => setIndex((index - 1 + QUOTES.length) % QUOTES.length)}
      >
        ‹
      </button>
      <div className="slides">
        {QUOTES.map((q, i) => (
          <div
            key={q}
            className={`slide ${i === index ? "active" : ""}`}
            aria-hidden={i !== index}
          >
            <div className="slide-bg" />
            <div className="slide-content">
              <p>{q}</p>
              <span className="freshness">7 DAY FRESHNESS GUARANTEE</span>
            </div>
          </div>
        ))}
      </div>
      <button
        aria-label="Next"
        className="hero-arrow right"
        onClick={() => setIndex((index + 1) % QUOTES.length)}
      >
        ›
      </button>
    </section>
  );
}
