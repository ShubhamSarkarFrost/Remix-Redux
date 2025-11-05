// app/components/Footer.jsx
import { Link } from "@remix-run/react";

export default function Footer({ data }) {
  if (!data) return null;
  const { site, contact, sections = [], payments = [] } = data;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About / Contact */}
          <div className="footer-about">
            <h3>{site?.about_title ?? "About Us"}</h3>
            <p>{site?.about_text}</p>

            <h4>Get in Touch</h4>
            <p>
              <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
            </p>
            {contact?.phone_local && <p>{contact.phone_local}</p>}
            {contact?.phone_intl && <p>{contact.phone_intl}</p>}
          </div>

          {/* Dynamic link columns */}
          {sections.map((section) => (
            <div key={section.id} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((l, idx) => (
                  <li key={idx}>
                    {l.url?.startsWith("http") ? (
                      <a href={l.url}>{l.label}</a>
                    ) : (
                      <Link to={l.url}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment icons row */}
        <div className="footer-payments">
          {payments.map((p) => (
            <span key={p.id} className="payment-item">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} />
              ) : (
                <span>{p.name}</span>
              )}
            </span>
          ))}
        </div>

        <p className="footer-copy">{site?.copyright_text}</p>
      </div>
    </footer>
  );
}
