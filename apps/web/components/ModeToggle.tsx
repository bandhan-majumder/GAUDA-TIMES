"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, Switch } from "@repo/ui";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log("mode is: ", theme)
  const isDarkMode =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  console.log("current dark mode is: ", isDarkMode);

  const renderToggle = () => (
    <div className="flex items-center gap-2">
        <Sun className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? "text-white" : "text-black"}`} />
        <Switch checked={true} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} className="bg-red-200" />
        <Moon className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? "text-blue-600" : "text-black"}`} />
      </div>
  )

  return renderToggle();
}
