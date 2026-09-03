const DATA_URL = "data/site.json";
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
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Nepodarilo sa načítať obsah.");
    const data = await response.json();
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

function renderReferences(references) {
  const list = $("#references-list");
  list.innerHTML = "";
  references.forEach(ref => {
    const item = el("div","reference");
    item.appendChild(el("span","",ref));
    list.appendChild(item);
  });
}

function renderGallery(items) {
  const grid = $("#gallery-grid");
  grid.innerHTML = "";
  galleryItems = items;
  items.forEach((item, index) => {
    const button = el("button","gallery-item");
    button.type = "button";
    const img = document.createElement("img");
    img.src = item.image;
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
  if (!posts.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  grid.innerHTML = "";
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
  const phone = c.phone || "";
  $("#registered-address").textContent = c.registered || "";
  $("#map-link").href = c.map || "#";
  $("#contact-email").textContent = email;
  $("#contact-email").href = email ? "mailto:" + email : "#";
  $("#contact-phone").textContent = phone;
  $("#contact-phone").href = phone ? "tel:" + phone.replace(/\s+/g,"") : "#";
  $("#email-button").href = email ? "mailto:" + email : "#";
  $("#phone-button").href = phone ? "tel:" + phone.replace(/\s+/g,"") : "#";
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
$(".lightbox-next").addEventListener("click", nextPhoto);
$(".lightbox-prev").addEventListener("click", prevPhoto);
document.addEventListener("keydown", (e) => {
  if (!$("#lightbox").classList.contains("show")) return;
  if (e.key === "Escape") closeLightbox();
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
