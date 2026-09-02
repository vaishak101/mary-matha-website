// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var sharedProjectFields = [
  {
    type: "string",
    name: "title",
    label: "Project name",
    required: true,
    isTitle: true
  },
  {
    type: "string",
    name: "description",
    label: "Description",
    description: "A short paragraph shown in the pop-up. What was built, and anything the family should know.",
    required: true,
    ui: { component: "textarea" }
  },
  {
    type: "string",
    name: "location",
    label: "Location",
    description: "Area or locality, e.g. \u201CVasai West\u201D.",
    required: true
  },
  {
    type: "string",
    name: "projectType",
    label: "Type of work",
    description: "e.g. \u201CG+2 bungalow\u201D, \u201C3 BHK full renovation\u201D, \u201CShop fit-out\u201D.",
    required: true
  },
  {
    type: "object",
    name: "gallery",
    label: "Photos",
    description: "Add at least one. First photo is used as the card image.",
    list: true,
    required: true,
    ui: {
      itemProps: (item) => ({ label: item?.alt || "Photo" })
    },
    fields: [
      { type: "image", name: "image", label: "Image", required: true },
      {
        type: "string",
        name: "alt",
        label: "Describe the photo",
        description: "For screen readers and search engines, e.g. \u201CFront elevation of the completed bungalow\u201D.",
        required: true
      }
    ]
  },
  {
    type: "string",
    name: "videoUrl",
    label: "Walkthrough video link",
    description: "Optional. Paste a YouTube or Vimeo link \u2014 do not upload video files. Shown in the pop-up."
  },
  {
    type: "number",
    name: "order",
    label: "Sort order",
    description: "Lower numbers show first. Leave blank to sort automatically."
  }
];
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ---------------------------------------------------------- */
      {
        name: "featuredProperty",
        label: "Featured Properties",
        path: "content/featured-properties",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => `${values?.title || "property"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Listing title",
            description: "e.g. \u201C2 BHK Flat\u201D, \u201CResidential Plot\u201D.",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "tag",
            label: "Badge",
            description: "Optional short badge on the photo, e.g. \u201CNo brokerage\u201D, \u201CLoan assistance\u201D, \u201CClear title\u201D."
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "price",
            label: "Price",
            description: "Shown as written, e.g. \u201C\u20B943 L\u201D, \u201C\u20B91.2 Cr\u201D, \u201COn request\u201D.",
            required: true
          },
          {
            type: "number",
            name: "areaSqft",
            label: "Area (sq ft)",
            required: true
          },
          {
            type: "string",
            name: "propertyType",
            label: "Property type",
            required: true,
            options: ["Flat", "Plot", "Shop", "Bungalow", "Office"]
          },
          {
            type: "number",
            name: "bedrooms",
            label: "Bedrooms",
            description: "Leave blank for plots and shops."
          },
          {
            type: "number",
            name: "bathrooms",
            label: "Bathrooms",
            description: "Leave blank for plots and shops."
          },
          {
            type: "string",
            name: "locality",
            label: "Locality",
            description: "e.g. \u201CVasai West\u201D, \u201CNalasopara\u201D.",
            required: true
          },
          {
            type: "string",
            name: "possession",
            label: "Possession",
            options: ["Ready to move", "Under construction", "Resale"]
          },
          {
            type: "string",
            name: "facing",
            label: "Facing",
            description: "Optional, e.g. \u201CEast\u201D, \u201CNorth-East\u201D."
          },
          {
            type: "object",
            name: "gallery",
            label: "Photo gallery",
            description: "The card shows these as a carousel. Add at least one; keep files small (mobile data).",
            list: true,
            required: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Photo" })
            },
            fields: [
              { type: "image", name: "image", label: "Image", required: true },
              {
                type: "string",
                name: "alt",
                label: "Describe the photo",
                required: true
              }
            ]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on the site",
            description: "Turn on to include this listing in the Featured Properties section."
          },
          {
            type: "number",
            name: "order",
            label: "Sort order",
            description: "Lower numbers show first."
          }
        ]
      },
      /* ---------------------------------------------------------- */
      {
        name: "ongoingProject",
        label: "Ongoing Projects",
        path: "content/ongoing-projects",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => `${values?.title || "project"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          ...sharedProjectFields.slice(0, 4),
          {
            type: "number",
            name: "percentComplete",
            label: "Percent complete",
            description: "Optional. A number from 0 to 100 \u2014 shown as \u201C60% done\u201D."
          },
          {
            type: "string",
            name: "expectedCompletion",
            label: "Expected completion",
            description: "Optional, e.g. \u201CMarch 2026\u201D."
          },
          ...sharedProjectFields.slice(4)
        ]
      },
      /* ---------------------------------------------------------- */
      {
        name: "completedProject",
        label: "Completed Projects",
        path: "content/completed-projects",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => `${values?.title || "project"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          ...sharedProjectFields.slice(0, 4),
          {
            type: "number",
            name: "completedYear",
            label: "Year handed over",
            description: "Shown on the card as \u201CDelivered 2024\u201D.",
            required: true
          },
          {
            type: "number",
            name: "durationMonths",
            label: "Build duration (months)",
            description: "Optional."
          },
          ...sharedProjectFields.slice(4)
        ]
      },
      /* ---------------------------------------------------------- */
      {
        name: "stats",
        label: "Number Stats",
        path: "content/stats",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true, slugify: () => "stats" }
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Stats",
            description: "The counting numbers in the maroon band. Keep to 4\u20136. Type the value exactly as it should read \u2014 the number animates, the rest stays put.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.value && item?.label ? `${item.value} \u2014 ${item.label}` : "Stat"
              }),
              defaultItem: { value: "100+", label: "Projects delivered" }
            },
            fields: [
              {
                type: "string",
                name: "value",
                label: "Value",
                description: "e.g. \u201C30\u201D, \u201C500+\u201D, \u201C1.2M\u201D, \u201C\u20B9250 Cr\u201D.",
                required: true
              },
              {
                type: "string",
                name: "label",
                label: "Label",
                description: "e.g. \u201CYears of service\u201D.",
                required: true
              }
            ]
          }
        ]
      },
      /* ---------------------------------------------------------- */
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => `${values?.name || "client"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "quote",
            label: "What they said",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            description: "e.g. \u201CPriya & Joseph S.\u201D",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            description: "e.g. \u201CVasai West\u201D.",
            required: true
          },
          {
            type: "string",
            name: "service",
            label: "Service used",
            description: "e.g. \u201CBought a 2 BHK\u201D, \u201CNew home build\u201D, \u201CFull renovation\u201D.",
            required: true
          },
          {
            type: "number",
            name: "order",
            label: "Sort order",
            description: "Lower numbers show first."
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
