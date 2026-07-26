const canvas = document.getElementById("canvas");
const templateSelect = document.getElementById("templateSelect");
const productSelect = document.getElementById("productSelect");
const metaLabel = document.getElementById("metaLabel");
const reloadBtn = document.getElementById("reloadBtn");

function fillSelects() {
  templateSelect.innerHTML = ABM_TEMPLATES.map(
    (t) => `<option value="${t.id}">${t.name}</option>`
  ).join("");
  productSelect.innerHTML = ABM_PRODUCTS.map(
    (p) => `<option value="${p.id}">${p.brand} ${p.sku} · ${p.price}</option>`
  ).join("");
}

function render() {
  const templateId = templateSelect.value;
  const product = ABM_PRODUCTS.find((p) => String(p.id) === productSelect.value) || ABM_PRODUCTS[0];
  const renderer = ABM_RENDER[templateId];
  if (!renderer) {
    canvas.innerHTML = `<div style="padding:20px;color:#fff">Missing renderer: ${templateId}</div>`;
    return;
  }
  canvas.innerHTML = renderer(product);
  const name = ABM_TEMPLATES.find((t) => t.id === templateId)?.name || templateId;
  metaLabel.textContent = `${name} · ${product.brand} ${product.sku} · 360×640`;
}

fillSelects();
render();
templateSelect.addEventListener("change", render);
productSelect.addEventListener("change", render);
reloadBtn.addEventListener("click", render);
