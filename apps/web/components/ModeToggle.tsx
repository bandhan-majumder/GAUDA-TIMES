"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@repo/ui";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);


  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderToggle = () =>
    <Button variant="outline" size="sm" onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))} className="relative flex h-10 w-10 items-center justify-center rounded-full p-0 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accent/50">
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only text-red-500">Toggle theme</span>
    </Button>

  return renderToggle();
}
