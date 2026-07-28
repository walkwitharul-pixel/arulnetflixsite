"use client"

import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

export default function ThemeAwareToaster() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "light" ? "light" : "dark"

  return <Toaster theme={theme} position="bottom-center" richColors closeButton />
}
