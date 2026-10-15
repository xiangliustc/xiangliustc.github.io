const links = document.querySelectorAll(".nav a");
const sections = [...links]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll(".copy").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const previous = button.textContent;
      button.textContent = "Copied";
      button.classList.add("done");
      setTimeout(() => {
        button.textContent = previous;
        button.classList.remove("done");
      }, 1400);
    } catch {
      button.textContent = "Copy failed";
    }
  });
});
