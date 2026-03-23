import Link from "next/link";

const HomeIcon = () => (
  <svg className="size-6" viewBox="0 0 256 256" fill="currentColor">
    <path d="M218.83 103.77l-80-75.48a1.14 1.14 0 0 1-.11-.11 16 16 0 0 0-21.53-.11l-.11.11L37.17 103.77A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-84h16v84a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="size-6" viewBox="0 0 256 256" fill="currentColor">
    <path d="M208 32h-16v-8a8 8 0 0 0-16 0v8h-96v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V48h16v8a8 8 0 0 0 16 0v-8h96v8a8 8 0 0 0 16 0v-8h16Z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="size-7" viewBox="0 0 256 256" fill="currentColor">
    <path d="M208 144a15.78 15.78 0 0 0-10.42 4l-23.25-11.56L151 123.58a16 16 0 0 0 0-23.16l23.29-13.08L197.58 76a16 16 0 0 0 0-27.49l-23.29-13.08L151 22.42a16 16 0 0 0-27.49 0l-13.08 23.29L87.08 48.53a16 16 0 0 0-27.49 0L46.51 61.82 23.42 75a16 16 0 0 0 0 27.49l23.11 13.2L46.51 129a16 16 0 0 0 0 23.16l23.11 13.2-23.11 13.2a16 16 0 0 0 0 23.16l23.29 13.08L58.53 228a16 16 0 0 0 27.49 0l13.08-23.25 23.25 11.56a15.93 15.93 0 0 0 20.22-6l11.64-20.63 11.63 20.63a15.94 15.94 0 0 0 20.22 6l23.25-11.56 13.08 23.25a16 16 0 0 0 27.49 0l13.08-23.25 23.25 11.56a16 16 0 0 0 20.22-25.9Z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="size-6" viewBox="0 0 256 256" fill="currentColor">
    <path d="M232 208a8 8 0 0 0-8-8H32a8 8 0 0 0-8 8 8 8 0 0 0 8 8h192a8 8 0 0 0 8-8ZM32 168h32v32H32Zm48-40h32v72H80Zm48-40h32v112h-32Zm48-48h32v160h-32Z" />
  </svg>
);

const UserIcon = () => (
  <svg className="size-6" viewBox="0 0 256 256" fill="currentColor">
    <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0C63.78 166.78 40.31 185.66 25.08 212a8 8 0 1 0 13.85 8c18.84-32.56 52.14-54 89.07-54s70.23 21.44 89.07 54a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
  </svg>
);

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-card border-t border-border px-4 py-3 safe-area-inset-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-foreground"
          aria-current="page"
        >
          <HomeIcon />
          <span className="text-xs">Início</span>
        </Link>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
          aria-label="Calendário"
        >
          <CalendarIcon />
          <span className="text-xs">Calendário</span>
        </button>
        <Link
          href="#"
          className="flex flex-col items-center gap-1 -mt-6"
          aria-label="IA"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <SparkleIcon />
          </div>
        </Link>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
          aria-label="Estatísticas"
        >
          <ChartIcon />
          <span className="text-xs">Estatísticas</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
          aria-label="Perfil"
        >
          <UserIcon />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
