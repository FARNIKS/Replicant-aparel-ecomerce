import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Asegúrate de que el 'base' sea './'
  base: "./",
  // Opcional: define explícitamente el directorio de salida
  build: {
    outDir: "dist",
  },
});
