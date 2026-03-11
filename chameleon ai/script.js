document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  const tabButtons = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");
        if (!target) return;

        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        tabPanels.forEach((panel) => {
          if (panel.id === `tab-${target}`) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "";
      const company = document.getElementById("company")?.value || "";
      const workEmail = document.getElementById("email")?.value || "";
      const spend = document.getElementById("spend")?.value || "";
      const message = document.getElementById("message")?.value || "";

      const subject = encodeURIComponent("Chameleon AI – Service request");
      const bodyLines = [
        `Name: ${name}`,
        `Company / Agency: ${company}`,
        `Work email: ${workEmail}`,
        `Monthly ad spend: ${spend || "Not specified"}`,
        "",
        "What they'd like to improve:",
        message || "(No message provided)",
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:pradhanchirag03@gmail.com?subject=${subject}&body=${body}`;

      alert(
        "Your email client should now open with a prefilled service request to Chameleon AI. Please review and send it to complete the request."
      );
    });
  }

  // Ad Creator functionality
  const adForm = document.getElementById("ad-creator-form");
  const adPreview = document.getElementById("ad-preview");
  const adPreviewWrapper = document.querySelector(".ad-preview-wrapper");
  const previewHeadline = document.getElementById("preview-headline");
  const previewDescription = document.getElementById("preview-description");
  const previewCta = document.getElementById("preview-cta");
  const themeButtons = document.querySelectorAll(".theme-btn");
  
  let currentTheme = "light";

  // Initialize with default values
  if (adPreview && adPreviewWrapper) {
    updatePreviewTheme(currentTheme);
  }

  // Form field event listeners for real-time preview
  if (adForm) {
    const headlineInput = document.getElementById("ad-headline");
    const descriptionInput = document.getElementById("ad-description");
    const ctaInput = document.getElementById("ad-cta");
    const brandInput = document.getElementById("ad-brand");
    const logoInput = document.getElementById("ad-logo");
    const previewLogo = document.getElementById("preview-logo");

    if (headlineInput) {
      headlineInput.addEventListener("input", (e) => {
        if (previewHeadline) {
          previewHeadline.textContent = e.target.value || "Your headline here";
        }
      });
    }

    if (descriptionInput) {
      descriptionInput.addEventListener("input", (e) => {
        if (previewDescription) {
          previewDescription.textContent = e.target.value || "Your description here";
        }
      });
    }

    if (ctaInput) {
      ctaInput.addEventListener("input", (e) => {
        if (previewCta) {
          previewCta.textContent = e.target.value || "Learn More";
        }
      });
    }

    if (brandInput) {
      brandInput.addEventListener("input", (e) => {
        const badge = adPreview?.querySelector(".preview-badge");
        if (badge) {
          badge.textContent = e.target.value ? `${e.target.value}` : "Ad";
        }
      });
    }

    if (logoInput && previewLogo) {
      logoInput.addEventListener("input", (e) => {
        const url = e.target.value.trim();
        if (url) {
          previewLogo.src = url;
          previewLogo.style.display = "block";
        } else {
          previewLogo.src = "logo.png";
          previewLogo.style.display = "block";
        }
      });
    }
  }

  // Theme toggle buttons
  if (themeButtons.length) {
    themeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme");
        if (!theme) return;

        themeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        currentTheme = theme;
        updatePreviewTheme(theme);
      });
    });
  }

  function updatePreviewTheme(theme) {
    if (!adPreview || !adPreviewWrapper) return;

    // Remove both theme classes
    adPreview.classList.remove("light", "dark");
    adPreviewWrapper.classList.remove("light", "dark");

    // Add the selected theme class
    adPreview.classList.add(theme);
    adPreviewWrapper.classList.add(theme);
  }
});

