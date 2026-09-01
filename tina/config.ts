import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title",
            required: true,
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            required: true,
          },
          {
            type: "string",
            name: "ctaLabel",
            label: "CTA label",
          },
          {
            type: "string",
            name: "ctaLink",
            label: "CTA link",
          },
          {
            type: "object",
            name: "highlights",
            label: "Highlights",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        fields: [
          {
            type: "string",
            name: "companyName",
            label: "Company Name",
            required: true,
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
          },
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Href",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
