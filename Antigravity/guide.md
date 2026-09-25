### 1. Crear `src/components/ui/ThemeToggle.astro`:

---
// src/components/ui/ThemeToggle.astro
---

<button
  id="theme-toggle"
  type="button"
  class="size-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
  aria-label="Cambiar tema de color"
>
  <!-- Icono Sol: Se muestra en modo oscuro (para volver a claro) -->
  <i class="ri-sun-line text-lg hidden dark:block"></i>

  <!-- Icono Luna con estrellas: Se muestra en modo claro (para pasar a oscuro) -->
  <i class="ri-moon-clear-line text-lg block dark:hidden"></i>
</button>

<script>
  const toggleBtn = document.getElementById("theme-toggle");

  toggleBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
</script>
```

### 2. Integrar `ThemeToggle` en `src/components/header/Header.astro`:

En `src/components/header/Header.astro`, importamos `ThemeToggle` y lo colocamos dentro del grupo de acciones para que esté disponible **tanto en móvil (al lado del menú hamburguesa) como en escritorio (al lado del botón CTA)**:

```astro
---
// src/components/header/Header.astro
import MainNav from "@/components/header/MainNav.astro";
import ThemeToggle from "@/components/ui/ThemeToggle.astro";
import Logo from "@/assets/logos/logo-circle.svg";
---

<header
  class="w-full sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md transition-colors duration-300"
>
  <div class="max-w-7xl mx-auto px-4 py-3 md:px-8 flex items-center justify-between">
    <!-- 1. Logo -->
    <a href="/" class="flex items-center gap-2 group" aria-label="Ir al inicio">
      <div class="size-12 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
        <Logo class="size-12" />
      </div>
    </a>

    <!-- 2. Navegación Desktop -->
    <div class="hidden md:flex items-center">
      <MainNav />
    </div>

    <!-- 3. Acciones Derecha (CTA + ThemeToggle + Hamburguesa) -->
    <div class="flex items-center gap-3 md:gap-6">
      <!-- Botón Let's Talk (Solo Desktop) -->
      <a href="#contact" class="hidden md:inline-flex btn-primary">
        <span>Let's Talk</span>
        <i class="ri-arrow-right-up-line text-base"></i>
      </a>

      <!-- ThemeToggle (Visible en Móvil y Escritorio) -->
      <ThemeToggle />

      <!-- Botón Hamburguesa (Solo Móvil) -->
      <button
        id="mobile-menu-btn"
        type="button"
        class="md:hidden size-10 rounded-full bg-primary-500 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer hover:brightness-105 transition"
        aria-label="Abrir menú"
      >
        <span class="w-5 h-0.5 bg-black rounded-full"></span>
        <span class="w-5 h-0.5 bg-black rounded-full"></span>
      </button>
    </div>
  </div>
</header>
```

### Commit sugerido para la Etapa 3:
```bash
git add src/components/ui/ThemeToggle.astro src/components/header/Header.astro Antigravity/guide.md
git commit -m "feat(header): add theme toggle button with mobile and desktop support"
```

---

## 📌 ETAPA 4: Menú Móvil Completo (Full Mobile Overlay / Drawer)

En la última etapa del Header, conectamos el botón hamburguesa con el menú móvil de pantalla completa tal como aparece en tu diseño de Figma:
- Cabecera con el texto `CODE ATD` a la izquierda y la `✕` a la derecha.
- Los enlaces grandes en lista vertical con el resaltado activo en amarillo.
- El bloque inferior con *"Ready to build something?"* y el botón *"Let's Talk ↗"*.

*(Las instrucciones y código completo para el Drawer móvil las ejecutaremos una vez quede listo el ThemeToggle)*.