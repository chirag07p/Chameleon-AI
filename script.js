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
});


