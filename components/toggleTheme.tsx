"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

  return (
    <Button
      variant="ghost"
      className="flex justify-center"
      size="md"
      onClick={toggleTheme}
    >
      <MoonIcon size={45} className="scale-0 dark:scale-100" />
      <SunIcon size={45} className="stroke-yellow-400 scale-100 dark:scale-0" />
    </Button>
  );
};

export default ToggleTheme;