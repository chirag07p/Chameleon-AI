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
  const REQUEST_TIMEOUT_MS = 15000;
  const isLocalPreview =
    ["127.0.0.1", "localhost", ""].includes(window.location.hostname);
  const apiBaseCandidates = window.CHAMELEON_API_BASE
    ? [window.CHAMELEON_API_BASE]
    : isLocalPreview
      ? ["http://localhost:3002", "http://localhost:3000", "http://localhost:3001"]
      : [""];

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
        const adminEmail = "pradhanchirag03@gmail.com";
        const emailJsServiceId = "service_xc8ajbl";
        const adminTemplateId = "template_kb7hnyr";
        const userTemplateId = "template_muh29fa";

        const spendMap = {
          lt5: 'Below INR 5L',
          '5-25': 'INR 5L - INR 25L',
          '25-100': 'INR 25L - INR 1Cr',
          gt100: 'Above INR 1Cr'
        };
        const spendText = spendMap[spend] || 'Not specified';
        const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const adminParams = {
          admin_email: adminEmail,
          user_email: email,
          name: name || 'Not provided',
          company: company || 'Not provided',
          email: email,
          spend: spendText,
          message: message || 'No specific goals mentioned',
          submitted_at: `${submittedAt} IST`
        };

        const userParams = {
          user_email: email,
          name: name || 'there',
          email: email,
          spend: spendText,
          message: message || 'General inquiry'
        };

        // Send to Admin
        await emailjs.send(emailJsServiceId, adminTemplateId, adminParams);
        
        // Send to User
        await emailjs.send(emailJsServiceId, userTemplateId, userParams);

        // Show success message
        alert(
          "✅ Thank you! Your service request has been submitted successfully.\n\n" +
          "We'll get back to you within 2 business days. Check your email for a confirmation message."
        );
        
        // Reset form
        contactForm.reset();

      } catch (error) {
        console.error("Error submitting form via EmailJS:", error);
        
        let errorReason = error.text || error.message || "Unknown error";
        
        alert(
          "❌ EmailJS Error: \n\n" + errorReason + "\n\nPlease check your EmailJS Template's 'To Email' field!"
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

