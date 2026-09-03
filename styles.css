const DATA_URL = "data/site.json";
const REFERENCES_URL = "data/references.json";
const BLOG_URL = "data/blog.json";
const CACHE_BUST = "?v=" + Date.now();
let galleryItems = [];
let currentGalleryIndex = 0;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function loadSite() {
  try {
    const [siteResponse, refsResponse, blogResponse] = await Promise.all([
      fetch(DATA_URL + CACHE_BUST, { cache: "no-store" }),
      fetch(REFERENCES_URL + CACHE_BUST, { cache: "no-store" }),
      fetch(BLOG_URL + CACHE_BUST, { cache: "no-store" })
    ]);
    if (!siteResponse.ok) throw new Error("Nepodarilo sa načítať obsah.");
    const data = await siteResponse.json();
    data.references = refsResponse.ok ? await refsResponse.json() : (data.references || []);
    data.blog = blogResponse.ok ? await blogResponse.json() : (data.blog || []);
    render(data);
  } catch (error) {
    console.error(error);
    $("#about-copy").innerHTML = "<p>Obsah stránky sa momentálne nepodarilo načítať.</p>";
  }
}

function render(data) {
  const branding = data.branding || {};
  if (branding.logo) document.querySelector(".brand img").src = branding.logo;
  if (branding.hero) document.querySelector(".hero img").src = branding.hero;
  const about = data.about || {};
  $("#about-title").textContent = about.title || "";
  const copy = $("#about-copy");
  copy.innerHTML = "";
  (about.paragraphs || []).forEach((p, i) => copy.appendChild(el("p", i === 2 ? "location-note" : "", p)));
  if (about.highlight) copy.appendChild(el("p", "highlight", about.highlight));
  if (about.closing) copy.appendChild(el("p", "closing", about.closing));
  if (about.signature) copy.appendChild(el("p", "signature", about.signature));

  const pillars = $("#pillars");
  pillars.innerHTML = "";
  (about.pillars || []).forEach(p => pillars.appendChild(el("div","pillar",p)));

  renderServices(data.services || []);
  renderReferences(data.references || []);
  renderGallery(data.gallery || []);
  renderBlog(data.blog || []);
  renderContact(data.contact || {});

  $("#year").textContent = new Date().getFullYear();
}

function renderServices(services) {
  const grid = $("#services-grid");
  grid.innerHTML = "";
  services.forEach(service => {
    const card = el("article","service-card");
    if ((service.title || "").toLowerCase().includes("zelená domácnostiam")) card.classList.add("green-service");
    if (!service.details || !service.details.length) {
      card.classList.add("static");
      const name = el("div","service-name");
      name.appendChild(el("span","mark"));
      name.appendChild(el("span","",service.title));
      card.appendChild(name);
    } else {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-expanded","false");
      const left = el("span");
      left.appendChild(el("span","mark"));
      left.appendChild(el("span","",service.title));
      left.style.display="flex"; left.style.alignItems="center"; left.style.gap="18px";
      btn.appendChild(left);
      btn.appendChild(el("span","plus","+"));
      const details = el("div","service-details");
      const ul = el("ul");
      service.details.forEach(item => ul.appendChild(el("li","",item)));
      details.appendChild(ul);
      btn.addEventListener("click", () => {
        const open = card.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        details.style.maxHeight = open ? details.scrollHeight + "px" : "0px";
      });
      card.append(btn, details);
    }
    grid.appendChild(card);
  });
}

function referenceImages(ref) {
  if (!ref || typeof ref !== "object") return [];
  const raw = Array.isArray(ref.images) ? ref.images : (ref.images ? [ref.images] : []);
  return raw.flatMap(item => {
    if (!item) return [];
    if (typeof item === "string") return [item];
    if (typeof item === "object") return [item.path, item.src, item.url, item.image].filter(Boolean);
    return [];
  });
}

function renderReferences(references) {
  const list = $("#references-list");
  list.innerHTML = "";
  references.forEach((ref, index) => {
    const item = el("button","reference");
    item.type = "button";
    const title = typeof ref === "string" ? ref : (ref.title || "");
    const titleBox = el("span", "reference-title", title);
    item.appendChild(titleBox);
    const count = referenceImages(ref).length;
    if (count) {
      const badge = el("span", "reference-photo-badge", `📷 ${count} ${count === 1 ? "fotografia" : count < 5 ? "fotografie" : "fotografií"}`);
      item.appendChild(badge);
      item.classList.add("has-photos");
    }
    item.appendChild(el("span", "reference-arrow", "›"));
    item.addEventListener("click", () => openReference(ref, index));
    list.appendChild(item);
  });
}

function assetPath(path) {
  if (!path) return "";
  return path.replace(/^\.\//, "").replace(/^\//, "");
}

function openReference(ref, index) {
  const title = typeof ref === "string" ? ref : (ref.title || "");
  const description = typeof ref === "string" ? "" : (ref.description || "");
  $("#reference-modal-title").textContent = title;
  $("#reference-modal-description").textContent = description;
  const gallery = $("#reference-modal-gallery");
  gallery.innerHTML = "";
  const images = referenceImages(ref);
  if (!images.length) {
    gallery.appendChild(el("div", "reference-no-photos", "Fotografie projektu zatiaľ nie sú pridané."));
  }
  images.forEach((path, i) => {
    const button = el("button", "reference-photo");
    button.type = "button";
    const img = document.createElement("img");
    img.src = assetPath(path);
    img.alt = title + " – fotografia " + (i + 1);
    img.loading = "lazy";
    button.appendChild(img);
    button.addEventListener("click", () => openStandalonePhoto(img.src, img.alt));
    gallery.appendChild(button);
  });
  $("#reference-modal").classList.add("show");
  $("#reference-modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReference() {
  $("#reference-modal").classList.remove("show");
  $("#reference-modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openStandalonePhoto(src, alt) {
  $("#lightbox-image").src = src;
  $("#lightbox-image").alt = alt || "";
  $("#lightbox").classList.add("show");
  $("#lightbox").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function normalizeGalleryItems(items) {
  return (Array.isArray(items) ? items : []).flatMap(item => {
    if (!item) return [];
    if (typeof item === "string") return [{ image: item }];
    if (typeof item === "object") {
      const image = item.image || item.path || item.src || item.url;
      return image ? [{ ...item, image }] : [];
    }
    return [];
  });
}

function renderGallery(items) {
  const grid = $("#gallery-grid");
  grid.innerHTML = "";
  galleryItems = normalizeGalleryItems(items);
  galleryItems.forEach((item, index) => {
    const button = el("button","gallery-item");
    button.type = "button";
    const img = document.createElement("img");
    img.src = assetPath(item.image);
    img.alt = "Fotografia realizácie " + (index + 1);
    img.loading = "lazy";
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(index));
    grid.appendChild(button);
  });
}

function renderBlog(posts) {
  const section = $("#blog");
  const grid = $("#blog-grid");
  section.hidden = false;
  grid.innerHTML = "";
  if (!posts.length) {
    const empty = el("div", "blog-empty", "Blog pripravujeme. Už čoskoro tu nájdete novinky, rady a informácie od Adamčiak s.r.o.");
    grid.appendChild(empty);
    return;
  }
  posts.forEach(post => {
    const card = el("article","blog-card");
    if (post.date) card.appendChild(el("div","blog-date",post.date));
    card.appendChild(el("h3","",post.title || ""));
    if (post.body) card.appendChild(el("p","",post.body));
    grid.appendChild(card);
  });
}

function renderContact(c) {
  const email = c.email || "";
  const phones = Array.isArray(c.phones) && c.phones.length ? c.phones : (c.phone ? [c.phone] : []);
  const phone = phones[0] || "";
  $("#registered-address").textContent = c.registered || "";
  $("#operation-address").textContent = c.operation || "";
  $("#map-link").href = c.map || "#";
  $("#contact-email").textContent = email;
  $("#contact-email").href = email ? "mailto:" + email : "#";
  const phoneBox = $("#contact-phones");
  phoneBox.innerHTML = "";
  phones.forEach((number, index) => {
    const link = el("a", "contact-phone-link", number);
    link.href = "tel:" + number.replace(/\s+/g, "");
    phoneBox.appendChild(link);
  });
  $("#email-button").href = email ? "mailto:" + email : "#";
  $("#phone-button").href = phone ? "tel:" + phone.replace(/\s+/g,"") : "#";
  const socialBox = $("#social-links");
  socialBox.innerHTML = "";
  const socials = c.socials || {};
  if (socials.facebook) {
    const a = el("a", "social-link", "Facebook ↗");
    a.href = socials.facebook; a.target = "_blank"; a.rel = "noopener noreferrer"; socialBox.appendChild(a);
  }
  if (socials.instagram) {
    const a = el("a", "social-link", "Instagram ↗");
    a.href = socials.instagram; a.target = "_blank"; a.rel = "noopener noreferrer"; socialBox.appendChild(a);
  }
  $("#hours").textContent = c.hours || "";
  $("#ico").textContent = c.ico || "";
  $("#icdph").textContent = c.icdph || "";
  $("#contact-form").dataset.endpoint = c.formspreeEndpoint || "";
}

function openLightbox(index) {
  currentGalleryIndex = index;
  updateLightbox();
  $("#lightbox").classList.add("show");
  $("#lightbox").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLightbox() {
  $("#lightbox").classList.remove("show");
  $("#lightbox").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function updateLightbox() {
  const item = galleryItems[currentGalleryIndex];
  if (!item) return;
  $("#lightbox-image").src = item.image;
  $("#lightbox-image").alt = "Fotografia realizácie " + (currentGalleryIndex + 1);
}
function nextPhoto() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
  updateLightbox();
}
function prevPhoto() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

$("#lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});
$(".lightbox-close").addEventListener("click", closeLightbox);
$(".reference-modal-close").addEventListener("click", closeReference);
$(".reference-modal-backdrop").addEventListener("click", closeReference);
$(".lightbox-next").addEventListener("click", nextPhoto);
$(".lightbox-prev").addEventListener("click", prevPhoto);
document.addEventListener("keydown", (e) => {
  if (!$("#lightbox").classList.contains("show")) return;
  if (e.key === "Escape") { closeLightbox(); closeReference(); }
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

$(".menu-toggle").addEventListener("click", () => {
  const nav = $(".main-nav");
  const open = nav.classList.toggle("open");
  $(".menu-toggle").setAttribute("aria-expanded", open ? "true" : "false");
});
$$(".main-nav a").forEach(a => a.addEventListener("click", () => $(".main-nav").classList.remove("open")));

$("#contact-form").addEventListener("submit", (e) => {
  const endpoint = e.currentTarget.dataset.endpoint;
  if (endpoint) {
    e.currentTarget.action = endpoint;
    e.currentTarget.method = "POST";
    return;
  }
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const subject = encodeURIComponent("Nezáväzný dopyt – Adamčiak s.r.o.");
  const body = encodeURIComponent(
    `Meno a priezvisko: ${form.get("name")}\n` +
    `E-mail: ${form.get("email")}\n` +
    `Telefón: ${form.get("phone") || "-"}\n\n` +
    `Správa:\n${form.get("message")}`
  );
  const email = $("#contact-email").textContent;
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

loadSite();
