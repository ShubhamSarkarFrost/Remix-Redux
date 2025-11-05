// app/root.jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
  useLoaderData,
} from "@remix-run/react";
import Footer from "../app/sections/Footer.jsx";

export const links = () => [
  { rel: "stylesheet", href: "/styles/global.css" },
  { rel: "stylesheet", href: "/styles/slider.css" },
  { rel: "stylesheet", href: "/styles/cards.css" },
  { rel: "stylesheet", href: "/styles/reviews.css" },
  { rel: "stylesheet", href: "/styles/footer.css" },
];

// 👇 Remix v2: meta must return an ARRAY of meta objects

export async function loader() {
  // Lazy import to keep client bundle lean
  const { getFooterData } = await import("../db/index.js");
  const data = await getFooterData();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
export const meta = () => [
  { charSet: "utf-8" },
  { title: "Bunches • Flowers & Gifts (Remix Demo)" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

export default function App() {
  const footerData = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <a className="brand" href="/">
              bunches
            </a>
            <nav className="nav">
              <a href="#flowers">Flowers</a>
              <a href="#letterbox">Letterbox Flowers</a>
              <a href="#hand-tied">Hand Tied Bouquets</a>
              <a href="#plants">House Plants</a>
              <a href="#hampers">Hampers</a>
            </nav>
          </div>
        </header>

        <Outlet />

        <Footer data={footerData} />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
