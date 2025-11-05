export default function WhyShop() {
  const features = [
    { title: "10% of profits to charity" },
    { title: "Planet‑friendly and proud" },
    { title: "Earn Posy Points" },
    { title: "4.7 out of 5 stars" },
    { title: "7 day freshness guarantee" }
  ];
  return (
    <section className="why-shop">
      <div className="wrap">
        <h2>Why you'll love shopping with us</h2>
        <ul className="badges">
          {features.map((f) => (
            <li key={f.title} className="badge">
              <span className="icon" aria-hidden>✿</span>
              <span>{f.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
