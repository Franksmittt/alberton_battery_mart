(function () {
  function img(p, className) {
    if (!p.imageUrl) return "";
    return `<div class="${className}" style="background-image:url('${p.imageUrl}')"></div>`;
  }

  function imgTag(p, className) {
    if (!p.imageUrl) return `<div class="${className}"></div>`;
    return `<div class="${className}"><img src="${p.imageUrl}" alt="${p.title}" /></div>`;
  }

  const warrantyShort = (p) => p.warranty.replace("-Month Warranty", "-Months");
  const warrantyMo = (p) => p.warranty.replace("-Month Warranty", "-Mo");
  const warrantyMonths = (p) => p.warranty.replace("-Month Warranty", " Months");

  window.ABM_RENDER = {
    industrial(p) {
      return `
        <div class="tpl tpl-industrial">
          ${imgTag(p, "bg-img")}
          <div class="content">
            <div class="badge">${p.badge}</div>
            <h1>${p.brand} <span>${p.sku}</span></h1>
            <p class="specs">${p.sku} · ${p.tech} · Fits: ${p.fits}</p>
            <div class="price">${p.price}</div>
            <div class="features">
              <div class="feature-item">${p.capacity}</div>
              <div class="feature-item">${p.cranking}</div>
              <div class="feature-item">${p.warranty}</div>
              <div class="feature-item">Free Fitment</div>
            </div>
            <div class="footer">CALL ${p.phone}<br><span>ALBERTON BATTERY MART</span></div>
          </div>
        </div>`;
    },

    modern(p) {
      return `
        <div class="tpl tpl-modern">
          ${imgTag(p, "img-wrapper")}
          <div class="content">
            <div class="status">● ${p.badge}</div>
            <h2>${p.brand.toUpperCase()} ${p.sku}</h2>
            <p class="subtext">Premium ${p.tech} Battery<br>For ${p.fits}</p>
            <div class="price-box"><h3>${p.price}</h3></div>
            <div class="tags">
              <div class="tag">${p.capacity}</div>
              <div class="tag">${p.cranking}</div>
              <div class="tag">${p.warranty}</div>
              <div class="tag">Free Fitment</div>
            </div>
            <div class="cta">Call ${p.phone}</div>
            <p class="store">ALBERTON BATTERY MART</p>
          </div>
        </div>`;
    },

    editorial(p) {
      return `
        <div class="tpl tpl-editorial">
          ${img(p, "image-box")}
          <div class="content">
            <div class="store-name">Alberton Battery Mart</div>
            <h2>${p.brand.toUpperCase()} ${p.sku}</h2>
            <div class="stock">⬤ ${p.badge}</div>
            <div class="specs-grid">
              <div class="spec">${p.tech}</div>
              <div class="spec">${p.capacity}</div>
              <div class="spec">${p.cranking}</div>
              <div class="spec">${p.warranty}</div>
            </div>
            <p class="fits">Fits: ${p.fits}. Free fitment included.</p>
          </div>
          <div class="bottom-block">
            <div class="price">${p.price}</div>
            <div class="phone">CALL: ${p.phone}</div>
          </div>
        </div>`;
    },

    diagonal(p) {
      return `
        <div class="tpl tpl-diagonal">
          ${imgTag(p, "top-img")}
          <div class="slash"></div>
          <div class="overlay">
            <div><span class="stock-badge">${p.badge}</span></div>
            <h2>${p.brand} ${p.sku}</h2>
            <div class="sub">${p.tech} Car Battery</div>
            <div class="price-tag">${p.price}</div>
            <ul class="bullet-list">
              <li><span>/</span> ${p.capacity} & ${p.cranking}</li>
              <li><span>/</span> ${p.warranty}</li>
              <li><span>/</span> Free Fitment</li>
            </ul>
            <div class="footer">
              <div class="footer-text">FITS ${p.fits.toUpperCase()}</div>
              <div class="footer-phone">${p.phone}</div>
            </div>
            <div class="store">ALBERTON BATTERY MART</div>
          </div>
        </div>`;
    },

    power(p) {
      return `
        <div class="tpl tpl-power">
          <div class="header">Alberton <span>Battery Mart</span></div>
          ${imgTag(p, "image-circle")}
          <div class="stock">NOW IN STOCK</div>
          <div class="title">${p.brand.toUpperCase()} ${p.sku}</div>
          <div class="subtitle">${p.tech} • Fits ${p.fits}</div>
          <div class="price-pill">${p.price}</div>
          <div class="specs-wrap">
            <div class="spec-pill">${p.capacity}</div>
            <div class="spec-pill">${p.cranking}</div>
            <div class="spec-pill">${p.warranty}</div>
            <div class="spec-pill">Free Fitment</div>
          </div>
          <div class="cta-button">Call ${p.phone}</div>
        </div>`;
    },

    essentials(p) {
      return `
        <div class="tpl tpl-essentials">
          <div class="store-header">ALBERTON BATTERY MART</div>
          <div class="title-wrap">
            <h1>The Power <strong>Series</strong></h1>
            <p class="in-stock">⬤ ${p.badge}</p>
          </div>
          ${imgTag(p, "img-box")}
          <div class="specs">
            <div class="spec-item"><strong>${p.brand.toUpperCase()} ${p.sku}</strong><span>Car Battery</span></div>
            <div class="spec-item"><strong>${p.tech}</strong><span>Technology</span></div>
            <div class="spec-item"><strong>${p.capacity} / ${p.cranking}</strong><span>Performance</span></div>
            <div class="spec-item"><strong>${warrantyShort(p)}</strong><span>Warranty</span></div>
          </div>
          <p class="fits">Designed for: ${p.fits}. Free fitment included.</p>
          <div class="cta-section">
            <div class="price">${p.price}</div>
            <div class="cta-button">CALL ${p.phone}</div>
          </div>
        </div>`;
    },

    "dark-ui"(p) {
      return `
        <div class="tpl tpl-dark-ui">
          <div class="top-bar">
            <div class="store-name">Alberton Battery Mart</div>
            <div class="badge">${p.badge}</div>
          </div>
          <h2>${p.brand}<br><b>${p.sku}</b></h2>
          ${imgTag(p, "img-container")}
          <div class="specs-row">
            <div><b>${p.capacity}</b>Capacity</div>
            <div><b>${p.cranking}</b>Cold Cranking</div>
            <div><b>${warrantyMo(p)}</b>Warranty</div>
          </div>
          <p class="fits">Fits ${p.fits}. Free Fitment.</p>
          <div class="action-box">
            <div class="price">${p.price}</div>
            <div class="call">Call ${p.phone} ➔</div>
          </div>
        </div>`;
    },

    "spec-sheet"(p) {
      return `
        <div class="tpl tpl-spec-sheet">
          <div class="header-split">
            <h3>${p.brand.toUpperCase()}<br>${p.sku}</h3>
            <span>${p.badge}</span>
          </div>
          ${imgTag(p, "hero-image")}
          <div class="big-price">${p.price}</div>
          <ul class="data-list">
            <li><span>Type</span><span>${p.tech}</span></li>
            <li><span>Specs</span><span>${p.capacity} / ${p.cranking}</span></li>
            <li><span>Compatibility</span><span>${p.fits}</span></li>
            <li><span>Warranty</span><span>${warrantyMonths(p)}</span></li>
            <li><span>Fitment</span><span>Free Installation</span></li>
          </ul>
          <div class="bottom-cta">CALL ${p.phone}</div>
          <div class="store-footer">Alberton Battery Mart</div>
        </div>`;
    },

    air(p) {
      return `
        <div class="tpl tpl-air">
          <div class="store">Alberton Battery Mart</div>
          <h1>${p.brand} ${p.sku}.</h1>
          <div class="subtitle">${p.tech}. ${p.capacity}. ${p.cranking}.</div>
          ${imgTag(p, "hero-img")}
          <div class="price-row">
            <div class="price">${p.price}</div>
            <div class="buy-btn">Call ${p.phone}</div>
          </div>
          <div class="fine-print">
            Includes free fitment and ${p.warranty.toLowerCase()}.<br>
            Fits ${p.fits}.
          </div>
        </div>`;
    },

    pro(p) {
      return `
        <div class="tpl tpl-pro">
          <div class="top-nav">
            <span>Alberton Battery Mart</span>
            <span>${p.badge}</span>
          </div>
          <h2>Pro power.</h2>
          <div class="specs-highlight">${p.brand} ${p.sku} ${p.tech} Battery.</div>
          ${imgTag(p, "hero-img")}
          <ul class="list">
            <li class="strong">${p.capacity} / ${p.cranking}</li>
            <li>${p.warranty}</li>
            <li>Fits ${p.fits}</li>
          </ul>
          <div class="info-panel">
            <div class="info-left">
              <p>Free Fitment Included</p>
              <div class="price">${p.price}</div>
            </div>
            <div class="call-link">Call Now ›</div>
          </div>
        </div>`;
    },

    widget(p) {
      return `
        <div class="tpl tpl-widget">
          <div class="widget hero-widget" style="--hero:url('${p.imageUrl}')">
            <h3>${p.brand}<br>${p.sku}</h3>
          </div>
          <div class="grid-row">
            <div class="small-widget">
              <div class="icon-circle">Ah</div>
              <div class="widget-val">${p.capacity}</div>
              <div class="widget-lbl">${p.cranking} Power</div>
            </div>
            <div class="small-widget">
              <div class="icon-circle red-circle">OK</div>
              <div class="widget-val">${warrantyMo(p)}</div>
              <div class="widget-lbl">Full Warranty</div>
            </div>
          </div>
          <div class="widget compat">
            <div class="widget-val">Compatibility</div>
            <div class="widget-lbl">${p.fits}</div>
          </div>
          <div class="widget action-widget">
            <div>
              <div class="widget-lbl light">Free Fitment</div>
              <div class="price">${p.price}</div>
            </div>
            <div class="action-btn">${p.phone}</div>
          </div>
          <div class="store-lbl">ALBERTON BATTERY MART</div>
        </div>`;
    },

    mesh(p) {
      return `
        <div class="tpl tpl-mesh">
          <div class="sidebar"><div class="sidebar-text">ALBERTON BATTERY MART</div></div>
          <div class="main-content">
            <h2>${p.brand.toUpperCase()} ${p.sku}</h2>
            <div class="tagline">Now In Stock</div>
            ${imgTag(p, "image-box")}
            <div class="stat-row">Type <span>${p.tech}</span></div>
            <div class="stat-row">Power <span>${p.capacity} / ${p.cranking}</span></div>
            <div class="stat-row">Warranty <span>${warrantyMonths(p)}</span></div>
            <div class="stat-row last">Fitment <span>Free Included</span></div>
            <p class="compat">COMPATIBLE WITH ${p.fits.toUpperCase()}.</p>
            <div class="bottom-action">
              <div class="price">${p.price}</div>
              <div class="btn">CALL ${p.phone}</div>
            </div>
          </div>
        </div>`;
    },
  };
})();
