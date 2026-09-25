

### 1. Crear `src/components/ui/MainNav.astro`

Crea este archivo con los enlaces exactos de tu Figma (`About`, `Experience`, `Projects`, `Blog`, `Contact`):

```astro
---
// src/components/ui/MainNav.astro

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const currentPath = Astro.url.pathname;
const isActive = (href: string) => {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
};
---

<nav class="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
  {
    navigation.map((item) => (
      <a
        href={item.href}
        class="text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors duration-200"
      >
        {item.name}
      </a>
    ))
  }
</nav>
```

> **Fíjate en las clases de color:**
> - En claro: `text-neutral-600 hover:text-black` (gris elegante que pasa a negro al pasar el ratón).
> - En oscuro: `dark:text-neutral-400 dark:hover:text-white` (gris claro que pasa a blanco puro al pasar el ratón).

---

### 2. Conectar `MainNav.astro` en `src/components/ui/Header.astro`

Ahora abres tu `src/components/ui/Header.astro`, importas `MainNav` y agregas el botón **"Let's Talk ↗"** en el contenedor de escritorio:

```astro
---
// src/components/ui/Header.astro
import Logo from '@/assets/logos/logo-circle.svg';
import MainNav from '@/components/ui/MainNav.astro';
---

<header
  class="w-full sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md transition-colors duration-300"
>
  <div class="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 group" aria-label="Ir al inicio">
      <div class="size-12 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
        <Logo class="size-12" />
      </div>
    </a>

    <!-- Hamburger icon (Visible solo en móvil) -->
    <button
      id="mobile-menu-btn"
      type="button"
      class="md:hidden size-10 rounded-full bg-primary-500 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer hover:brightness-105 transition"
      aria-label="Abrir menú"
    >
      <span class="w-5 h-0.5 bg-black rounded-full"></span>
      <span class="w-5 h-0.5 bg-black rounded-full"></span>
    </button>

    <!-- Contenedor Desktop (Menú + Botón CTA) -->
    <div class="hidden md:flex items-center gap-8">
      <MainNav />

      <!-- Botón "Let's Talk" con sus estilos de Modo Claro / Modo Oscuro -->
      <a
        href="#contact"
        class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 
               bg-black text-white hover:bg-neutral-800 
               dark:bg-primary-500 dark:text-black dark:hover:bg-primary-400"
      >
        <span>Let's Talk</span>
        <i class="ri-arrow-right-up-line text-base"></i>
      </a>

      <!-- Aquí colocaremos el ThemeToggle más adelante -->
    </div>
  </div>
</header>
```

---

### ¿Cómo comprobarlo en tu navegador?
1. En pantalla ancha (Desktop): verás el Logo a la izquierda, los 5 enlaces al centro/derecha y el botón **"Let's Talk ↗"** (negro en modo claro, amarillo en modo oscuro).
2. Si achicas la ventana (Mobile): los enlaces y el botón desaparecen limpiamente y solo queda el botón circular amarillo.

---

### Commit para este paso:
```bash
git add src/components/ui/MainNav.astro src/components/ui/Header.astro src/styles/global.css package.json package-lock.json
git commit -m "feat(header): add desktop main navigation and standardized cta button"
```

---

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

### 2. Integrar `ThemeToggle` en `src/components/ui/Header.astro`:

En `src/components/ui/Header.astro`, impórtalo en el frontmatter:
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
git add src/components/ui/ThemeToggle.astro src/components/ui/Header.astro
git commit -m "feat(header): add theme toggle button with sun and moon icons"
```

---

## 📌 ETAPA 4: Menú Móvil Completo (Full Mobile Overlay / Drawer)

En la última etapa del Header, conectamos el botón hamburguesa con el menú móvil de pantalla completa tal como aparece en tu diseño de Figma:
- Cabecera con el texto `CODE ATD` a la izquierda y la `✕` a la derecha.
- Los enlaces grandes en lista vertical con el resaltado activo en amarillo.
- El bloque inferior con *"Ready to build something?"* y el botón *"Let's Talk ↗"*.

*(Las instrucciones y código completo para el Drawer móvil las ejecutaremos una vez quede listo el ThemeToggle)*.