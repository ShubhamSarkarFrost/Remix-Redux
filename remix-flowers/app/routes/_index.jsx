// app/routes/_index.jsx
import Slider from "../sections/Slider";
import SectionGrid from "../sections/SectionGrid";
import WhyShop from "../sections/WhyShop";
import Reviews from "../sections/Reviews";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  // db is OUTSIDE /app
  const { getSectionItems } = await import("../../db/index.js");

  const flowers = await getSectionItems("flowers");
  const letterbox = await getSectionItems("letterbox");
  const handTied = await getSectionItems("hand-tied");
  const byPost = await getSectionItems("by-post");
  const birthday = await getSectionItems("birthday");
  const plants = await getSectionItems("plants");
  const christmas = await getSectionItems("christmas");
  const hampers = await getSectionItems("hampers");

  return json({
    flowers,
    letterbox,
    handTied,
    byPost,
    birthday,
    plants,
    christmas,
    hampers,
  });
}

export default function Index() {
  const data = useLoaderData();

  return (
    <main>
      <Slider />

      <SectionGrid id="flowers" title="Flower Delivery" items={data.flowers} />
      <SectionGrid
        id="letterbox"
        title="Letterbox Flowers"
        items={data.letterbox}
      />
      <SectionGrid
        id="hand-tied"
        title="Hand Tied Bouquets"
        items={data.handTied}
      />
      <SectionGrid id="by-post" title="Flowers by Post" items={data.byPost} />
      <SectionGrid
        id="birthday"
        title="Birthday Flowers and Gifts"
        items={data.birthday}
      />
      <SectionGrid id="plants" title="House Plants" items={data.plants} />
      <SectionGrid
        id="christmas"
        title="Christmas Flowers"
        items={data.christmas}
      />
      <SectionGrid id="hampers" title="Hampers" items={data.hampers} />

      <WhyShop />
      <Reviews />
    </main>
  );
}
