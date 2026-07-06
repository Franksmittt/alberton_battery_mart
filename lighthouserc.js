/** @type {import('@lhci/cli').LHCI.ServerCommand.Options} */
module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:3000/",
        "http://127.0.0.1:3000/about",
        "http://127.0.0.1:3000/contact",
        "http://127.0.0.1:3000/services",
        "http://127.0.0.1:3000/products",
        "http://127.0.0.1:3000/products/brand/power-plus",
        "http://127.0.0.1:3000/products/brand/eco-plus",
        "http://127.0.0.1:3000/testing",
        "http://127.0.0.1:3000/quote",
        "http://127.0.0.1:3000/faq",
        "http://127.0.0.1:3000/616-car-battery",
        "http://127.0.0.1:3000/619-car-battery",
        "http://127.0.0.1:3000/628-car-battery",
        "http://127.0.0.1:3000/646-car-battery",
        "http://127.0.0.1:3000/652-car-battery",
        "http://127.0.0.1:3000/658-car-battery",
        "http://127.0.0.1:3000/668-car-battery",
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.98 }],
        "categories:accessibility": ["error", { minScore: 0.98 }],
        "categories:best-practices": ["error", { minScore: 0.98 }],
        "categories:seo": ["error", { minScore: 0.98 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-reports/hub-audit",
    },
  },
};
