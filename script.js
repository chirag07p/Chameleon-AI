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
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Disable form and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.style.opacity = "0.7";

      const name = document.getElementById("name")?.value || "";
      const company = document.getElementById("company")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const spend = document.getElementById("spend")?.value || "";
      const message = document.getElementById("message")?.value || "";

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            company,
            email,
            spend,
            message,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Show success message
          alert(
            "✅ Thank you! Your service request has been submitted successfully.\n\n" +
            "We'll get back to you within 2 business days. Check your email for a confirmation message."
          );
          
          // Reset form
          contactForm.reset();
        } else {
          // Show error message
          alert(
            "❌ " + (result.message || "Failed to send your request. Please try again or contact us directly at pradhanchirag03@gmail.com")
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "❌ There was an error sending your request. Please try again later or contact us directly at pradhanchirag03@gmail.com"
        );
      } finally {
        // Re-enable form
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = "1";
      }
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

