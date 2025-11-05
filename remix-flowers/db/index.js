// db/index.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let _db;

/** Singleton SQLite connection */
export async function getDb() {
  if (_db) return _db;
  _db = await open({
    filename: process.env.DB_FILE || "./db/data.sqlite",
    driver: sqlite3.Database,
  });
  await bootstrap(_db);
  return _db;
}

/** Create tables (footer + catalog) and seed when empty */
async function bootstrap(db) {
  await db.exec(`
    PRAGMA foreign_keys = ON;

    /* ---------- FOOTER TABLES ---------- */
    CREATE TABLE IF NOT EXISTS site_info (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      about_title TEXT NOT NULL DEFAULT 'About Us',
      about_text TEXT NOT NULL DEFAULT '',
      copyright_text TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS contact_info (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      email TEXT,
      phone_local TEXT,
      phone_intl TEXT
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS footer_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS footer_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER NOT NULL REFERENCES footer_sections(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS payment_methods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    /* ---------- CATALOG TABLES (for SectionGrid) ---------- */
    CREATE TABLE IF NOT EXISTS catalog_sections (
      slug TEXT PRIMARY KEY,        -- e.g. 'flowers', 'letterbox', ...
      title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS catalog_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_slug TEXT NOT NULL REFERENCES catalog_sections(slug) ON DELETE CASCADE,
      title TEXT NOT NULL,
      price TEXT NOT NULL,          -- keep string to match your UI (e.g. "£24.75")
      image_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);

  /* ---------- SEED: catalog (only when empty) ---------- */
  const catalogCount = await db.get(
    "SELECT COUNT(*) AS c FROM catalog_sections"
  );
  if ((catalogCount?.c ?? 0) === 0) {
    const sections = [
      ["flowers", "Flower Delivery"],
      ["letterbox", "Letterbox Flowers"],
      ["hand-tied", "Hand Tied Bouquets"],
      ["by-post", "Flowers by Post"],
      ["birthday", "Birthday Flowers and Gifts"],
      ["plants", "House Plants"],
      ["christmas", "Christmas Flowers"],
      ["hampers", "Hampers"],
    ];
    for (const [slug, title] of sections) {
      await db.run("INSERT INTO catalog_sections (slug, title) VALUES (?, ?)", [
        slug,
        title,
      ]);
    }

    const add = async (slug, items) => {
      let i = 0;
      for (const it of items) {
        await db.run(
          "INSERT INTO catalog_items (section_slug, title, price, image_url, sort_order) VALUES (?, ?, ?, ?, ?)",
          [slug, it.title, it.price, it.image_url, ++i]
        );
      }
    };

    // Seed a few per section (swap to your own images if you like)
    await add("flowers", [
      {
        title: "Mauve Magic",
        price: "£24.75",
        image_url: "/assets/flowers/mauve-magic.jpg",
      },
      {
        title: "Autumn Sunrise",
        price: "£26.75",
        image_url: "/assets/flowers/autumn-sunrise.jpg",
      },
      {
        title: "Strawberry Sunset",
        price: "£29.85",
        image_url: "/assets/flowers/strawberry-sunset.jpg",
      },
    ]);

    await add("letterbox", [
      {
        title: "Spray Cascade Letterbox",
        price: "£22",
        image_url: "/assets/letterbox/spray-cascade.jpg",
      },
      {
        title: "Sweet Sunshine Letterbox",
        price: "£25.50",
        image_url: "/assets/letterbox/sweet-sunshine.jpg",
      },
      {
        title: "Autumn Warmth Letterbox",
        price: "£21.50",
        image_url: "assets/letterbox/autumn-warmth.jpg",
      },
    ]);

    await add("hand-tied", [
      {
        title: "Rose and Lily Bouquet",
        price: "£32.35",
        image_url: "assets/handtied/rose-lily.jpg",
      },
      {
        title: "Elderberry Elegance",
        price: "£35.25",
        image_url: "assets/handtied/elderbelly-elegance.jpg",
      },
      {
        title: "Secret Garden",
        price: "£29.95",
        image_url: "assets/handtied/secret-garden.jpg",
      },
    ]);

    await add("by-post", [
      {
        title: "Blue Moon Bouquet",
        price: "£32.35",
        image_url: "assets/bypost/blue-moon.jpg",
      },
      {
        title: "Clasabanca",
        price: "£35.25",
        image_url: "assets/bypost/clasabanca.jpg",
      },
      {
        title: "Strawberry Swirl",
        price: "£29.95",
        image_url: "assets/bypost/strawberry-swirl.jpg",
      },
    ]);

    await add("birthday", [
      {
        title: "Blue Moon Bouquet",
        price: "£32.35",
        image_url: "assets/bypost/blue-moon.jpg",
      },
      {
        title: "Clasabanca",
        price: "£35.25",
        image_url: "assets/bypost/clasabanca.jpg",
      },
      {
        title: "Strawberry Swirl",
        price: "£29.95",
        image_url: "assets/bypost/strawberry-swirl.jpg",
      },
    ]);

    await add("plants", [
      {
        title: "Blue Moon Bouquet",
        price: "£32.35",
        image_url: "assets/bypost/blue-moon.jpg",
      },
      {
        title: "Clasabanca",
        price: "£35.25",
        image_url: "assets/bypost/clasabanca.jpg",
      },
      {
        title: "Strawberry Swirl",
        price: "£29.95",
        image_url: "assets/bypost/strawberry-swirl.jpg",
      },
    ]);

    await add("christmas", [
      {
        title: "Blue Moon Bouquet",
        price: "£32.35",
        image_url: "assets/bypost/blue-moon.jpg",
      },
      {
        title: "Clasabanca",
        price: "£35.25",
        image_url: "assets/bypost/clasabanca.jpg",
      },
      {
        title: "Strawberry Swirl",
        price: "£29.95",
        image_url: "assets/bypost/strawberry-swirl.jpg",
      },
    ]);

    await add("hampers", [
      {
        title: "Blue Moon Bouquet",
        price: "£32.35",
        image_url: "assets/bypost/blue-moon.jpg",
      },
      {
        title: "Clasabanca",
        price: "£35.25",
        image_url: "assets/bypost/clasabanca.jpg",
      },
      {
        title: "Strawberry Swirl",
        price: "£29.95",
        image_url: "assets/bypost/strawberry-swirl.jpg",
      },
    ]);

    // (Add by-post, birthday, plants, christmas, hampers the same way if needed)
  }

  /* ---------- SEED: footer (only when empty) ---------- */
  const footerCount = await db.get("SELECT COUNT(*) as c FROM footer_sections");
  if ((footerCount?.c ?? 0) === 0) {
    await db.run(
      "INSERT INTO site_info (id, about_title, about_text, copyright_text) VALUES (1, ?, ?, ?)",
      [
        "About Bunches",
        "At Bunches we believe that business can and should have a positive impact. Bunches doesn’t exist simply to create profits. We want to make a positive difference to both the world we live in and the people in it.",
        "© Copyright Bunches Florapost Ltd | All rights reserved.",
      ]
    );

    await db.run(
      "INSERT INTO contact_info (id, email, phone_local, phone_intl) VALUES (1, ?, ?, ?)",
      [
        "flowers@bunches.co.uk",
        "01623 750343 (UK)",
        "+44 1623 750343 (International)",
      ]
    );

    const footerSections = [
      [
        "Information & Help",
        1,
        [
          ["Customer Service", "#"],
          ["Delivery", "#"],
          ["Freshness Guarantee", "#"],
          ["Posy Points™", "#"],
          ["Refer a Friend", "#"],
          ["FAQ", "#"],
          ["Become an Affiliate", "#"],
          ["Corporate Gifts", "#"],
          ["Check a Gift Card", "#"],
          ["Terms & Privacy", "#"],
          ["Returns Policy", "#"],
        ],
      ],
      [
        "About Us",
        2,
        [
          ["About Us", "#"],
          ["Our History", "#"],
          ["Why Choose Bunches?", "#"],
          ["Ethical Flowers", "#"],
          ["Making a Difference", "#"],
          ["Bunches’ Journal", "#"],
          ["Flower Care & Advice", "#"],
          ["Plant Care & Advice", "#"],
          ["Sitemap", "#"],
        ],
      ],
      [
        "Our Collections",
        3,
        [
          ["Flowers by Post", "#"],
          ["Mother’s Day Flowers", "#"],
          ["Christmas Flowers", "#"],
          ["Valentine’s Day Flowers", "#"],
          ["Birthday Flowers", "#"],
          ["Hamper Delivery", "#"],
          ["Christmas Hampers", "#"],
        ],
      ],
    ];

    for (const [title, order, links] of footerSections) {
      const res = await db.run(
        "INSERT INTO footer_sections (title, sort_order) VALUES (?, ?)",
        [title, order]
      );
      const sectionId = res.lastID;
      let i = 0;
      for (const [label, url] of links) {
        await db.run(
          "INSERT INTO footer_links (section_id, label, url, sort_order) VALUES (?, ?, ?, ?)",
          [sectionId, label, url, ++i]
        );
      }
    }

    const payments = [
      ["VISA", "/visa.png", 1],
      ["Apple Pay", "/applepay.png", 2],
      ["Google Pay", "/googlepay.png", 3],
      ["Mastercard", "/mastercard.png", 4],
      ["PayPal", "/paypal.png", 5],
    ];
    for (const [name, url, order] of payments) {
      await db.run(
        "INSERT INTO payment_methods (name, image_url, sort_order) VALUES (?, ?, ?)",
        [name, url, order]
      );
    }
  }
}

/* ---------- Footer data (unchanged API) ---------- */
export async function getFooterData() {
  const db = await getDb();
  const site = await db.get("SELECT * FROM site_info WHERE id = 1");
  const contact = await db.get("SELECT * FROM contact_info WHERE id = 1");
  const socials = await db.all(
    "SELECT * FROM social_links ORDER BY sort_order ASC, id ASC"
  );
  const sections = await db.all(
    "SELECT * FROM footer_sections ORDER BY sort_order ASC, id ASC"
  );
  const links = await db.all(
    "SELECT * FROM footer_links ORDER BY section_id ASC, sort_order ASC, id ASC"
  );
  const payments = await db.all(
    "SELECT * FROM payment_methods ORDER BY sort_order ASC, id ASC"
  );

  const grouped = sections.map((s) => ({
    id: s.id,
    title: s.title,
    links: links
      .filter((l) => l.section_id === s.id)
      .map((l) => ({ label: l.label, url: l.url })),
  }));

  return { site, contact, socials, sections: grouped, payments };
}

/* ---------- Catalog helpers for SectionGrid ---------- */
export async function getSectionItems(sectionSlug) {
  const db = await getDb();
  return db.all(
    "SELECT title, price, image_url FROM catalog_items WHERE section_slug = ? ORDER BY sort_order ASC, id ASC",
    sectionSlug
  );
}

export async function getCatalogTitle(sectionSlug) {
  const db = await getDb();
  const row = await db.get(
    "SELECT title FROM catalog_sections WHERE slug = ?",
    sectionSlug
  );
  return row?.title ?? sectionSlug;
}
