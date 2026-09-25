## 📌 ETAPA 3: Componente `ThemeToggle.astro` (Modo Claro / Modo Oscuro)

Ahora agregamos el botón de alternar tema con los iconos de Remix Icon (`ri-sun-line` y `ri-moon-clear-line`), colocado a la derecha del botón *"Let's Talk"*.

### 1. Crear `src/components/ui/ThemeToggle.astro`:

```astro
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

En `src/components/header/Header.astro`, impórtalo en el frontmatter:
```astro
import ThemeToggle from '@/components/ui/ThemeToggle.astro';
```

Y agrégalo justo al lado del botón *"Let's Talk"*:
```astro
    <!-- Contenedor Desktop (Menú + Botón CTA + ThemeToggle) -->
    <div class="hidden md:flex items-center gap-6">
      <MainNav />

      <a href="#contact" class="btn-primary">
        <span>Let's Talk</span>
        <i class="ri-arrow-right-up-line text-base"></i>
      </a>

      <ThemeToggle />
    </div>
```

### Commit sugerido para la Etapa 3:
```bash
git add src/components/ui/ThemeToggle.astro src/components/header/Header.astro
git commit -m "feat(header): add theme toggle button with sun and moon icons"
```

---

## 📌 ETAPA 4: Menú Móvil Completo (Full Mobile Overlay / Drawer)

En la última etapa del Header, conectamos el botón hamburguesa con el menú móvil de pantalla completa tal como aparece en tu diseño de Figma:
- Cabecera con el texto `CODE ATD` a la izquierda y la `✕` a la derecha.
- Los enlaces grandes en lista vertical con el resaltado activo en amarillo.
- El bloque inferior con *"Ready to build something?"* y el botón *"Let's Talk ↗"*.

*(Las instrucciones y código completo para el Drawer móvil las ejecutaremos una vez quede listo el ThemeToggle)*.