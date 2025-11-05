// app/sections/SectionGrid.jsx
export default function SectionGrid({ id, title, items }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
          <a className="view-all" href="#">
            View all
          </a>
        </div>

        <div className="cards">
          {items.map((item) => (
            <article key={item.title} className="card">
              {/* Image on top */}
              <div className="card-img">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} loading="lazy" />
                ) : null}
              </div>

              {/* Text below image */}
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="price">{item.price}</p>
                <button className="btn">♡ Add to favourites</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
