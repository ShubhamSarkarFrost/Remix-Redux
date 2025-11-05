export default function Reviews() {
  const reviews = [
    { name: "Jane Gerry", time: "16 hours ago", text: "Delivery was as promised and the recipient was so pleased with her bouquet which was still blooming." },
    { name: "Arun", time: "1 day ago", text: "Great variety and the flowers lasted well over a week!" },
    { name: "Sophie", time: "3 days ago", text: "Beautiful arrangements and quick delivery." }
  ];
  return (
    <section className="reviews">
      <div className="wrap">
        <div className="score">
          <span className="pill excellent">EXCELLENT</span>
          <div>
            <strong>4.66 Average</strong>
            <div>203,303 Reviews</div>
          </div>
        </div>
        <ul className="review-list">
          {reviews.map((r) => (
            <li key={r.name} className="review">
              <div className="stars" aria-label="5 stars">★★★★★</div>
              <div className="meta">{r.name} • {r.time}</div>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
