import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

import * as child from "child_process";

let commitHash = "0000000";
try {
  commitHash = child.execSync("git rev-parse --short HEAD").toString();
} catch (e) {
  console.log("Can't run git");
}

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: "generateSW",
      manifestFilename: "manifest.json",
      manifest: {
        name: "Blålange festivalen",
        short_name: "Blålange",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "nb",
        scope: "./",
        icons: [
          {
            src: "/img/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/img/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/img/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#000000",
        id: "kuk-2023-9921832113",
        description:
          "Blålange Festivalen er en norsk festival som skjer et par ganger i áret.",
        dir: "auto",
        categories: ["news", "social", "events"],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 500 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/db\.080609\.xyz\/api\/collections\/art_articles\/.*/i,
            handler: "CacheFirst",
            options: {
              backgroundSync: {
                name: "article_cache",
                options: {
                  maxRetentionTime: 60 * 60 * 0.25, // <== 15 minutes
                },
              },
              cacheName: "article_cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 1, // <== 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  define: {
    "process.env.NODE_ENV":
      process.env.NODE_ENV === "production" ? '"production"' : '"development"',

    __COMMIT_HASH__: JSON.stringify(commitHash),
    __BUILD_DATE__: JSON.stringify(new Date().getTime()),
  },
  // gz
  assetsInclude: ["**/*.gz"],
};

export default config;
