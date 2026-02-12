import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    site: "https://cinfo-ifal.github.io/",
    integrations: [tailwind()],
});
