document.addEventListener("DOMContentLoaded", () => {
  // --- 1. TLAČÍTKO PRO NÁVRAT NAHORU (Společné) ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      // Zobrazit ikonku, pokud uživatel odscrolloval o více než 300px
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- 2. NAČÍTÁNÍ FILMŮ Z API (Stránka filmy.html) ---
  const movieSelect = document.getElementById("movieSearchSelect");
  const moviesContainer = document.getElementById("moviesContainer");

  if (movieSelect && moviesContainer) {
    movieSelect.addEventListener("change", async (event) => {
      const searchTerm = event.target.value;
      if (!searchTerm) return;

      // Vyčištění předchozích výsledků
      moviesContainer.innerHTML = "";

      try {
        // Fetch API je moderní asynchronní metoda pro HTTP požadavky.
        // Vrací Promise, proto se používá async/await syntaxe.
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${searchTerm}`,
        );
        const data = await response.json();

        data.forEach((item) => {
          // API může u některých seriálů vracet null obrázky, je potřeba to ošetřit
          if (item.show && item.show.image && item.show.image.medium) {
            const img = document.createElement("img");
            img.src = item.show.image.medium;
            img.alt = item.show.name;
            moviesContainer.appendChild(img);
          }
        });
      } catch (error) {
        console.error("Chyba při načítání dat z API:", error);
        moviesContainer.innerHTML = "<p>Nepodařilo se načíst filmy.</p>";
      }
    });
  }

  // --- 3. VALIDACE HESEL (Stránka registrace.html) ---
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirm");

  if (passwordInput && passwordConfirmInput) {
    // Zjišťování události 'input' reaguje na každé stisknutí klávesy ihned
    const validatePasswords = () => {
      const pass1 = passwordInput.value;
      const pass2 = passwordConfirmInput.value;

      // Zamezení spuštění validace, pokud jsou pole prázdná
      if (pass1 === "" || pass2 === "") {
        passwordInput.classList.remove("input-valid", "input-invalid");
        passwordConfirmInput.classList.remove("input-valid", "input-invalid");
        return;
      }

      // Přidávání CSS tříd místo manipulace s element.style
      if (pass1 === pass2) {
        passwordInput.classList.remove("input-invalid");
        passwordConfirmInput.classList.remove("input-invalid");

        passwordInput.classList.add("input-valid");
        passwordConfirmInput.classList.add("input-valid");
      } else {
        passwordInput.classList.remove("input-valid");
        passwordConfirmInput.classList.remove("input-valid");

        passwordInput.classList.add("input-invalid");
        passwordConfirmInput.classList.add("input-invalid");
      }
    };

    passwordInput.addEventListener("input", validatePasswords);
    passwordConfirmInput.addEventListener("input", validatePasswords);
  }
});
