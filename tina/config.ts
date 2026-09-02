import { defineConfig, type TinaField } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/* Fields shared by Ongoing and Completed projects. Kept in one place so the
   two collections stay in step — see the note in the README on why they're
   separate collections rather than one with a status toggle. */
const sharedProjectFields: TinaField[] = [
  {
    type: "string",
    name: "title",
    label: "Project name",
    required: true,
    isTitle: true,
  },
  {
    type: "string",
    name: "description",
    label: "Description",
    description:
      "A short paragraph shown in the pop-up. What was built, and anything the family should know.",
    required: true,
    ui: { component: "textarea" },
  },
  {
    type: "string",
    name: "location",
    label: "Location",
    description: "Area or locality, e.g. “Vasai West”.",
    required: true,
  },
  {
    type: "string",
    name: "projectType",
    label: "Type of work",
    description: "e.g. “G+2 bungalow”, “3 BHK full renovation”, “Shop fit-out”.",
    required: true,
  },
  {
    type: "object",
    name: "gallery",
    label: "Photos",
    description: "Add at least one. First photo is used as the card image.",
    list: true,
    required: true,
    ui: {
      itemProps: (item) => ({ label: item?.alt || "Photo" }),
    },
    fields: [
      { type: "image", name: "image", label: "Image", required: true },
      {
        type: "string",
        name: "alt",
        label: "Describe the photo",
        description:
          "For screen readers and search engines, e.g. “Front elevation of the completed bungalow”.",
        required: true,
      },
    ],
  },
  {
    type: "string",
    name: "videoUrl",
    label: "Walkthrough video link",
    description:
      "Optional. Paste a YouTube or Vimeo link — do not upload video files. Shown in the pop-up.",
  },
  {
    type: "number",
    name: "order",
    label: "Sort order",
    description: "Lower numbers show first. Leave blank to sort automatically.",
  },
];

export default defineConfig({
  branch,
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
      /* ---------------------------------------------------------- */
      {
        name: "featuredProperty",
        label: "Featured Properties",
        path: "content/featured-properties",
        format: "json",
        ui: {
          filename: {
            slugify: (values) =>
              `${values?.title || "property"}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Listing title",
            description: "e.g. “2 BHK Flat”, “Residential Plot”.",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "tag",
            label: "Badge",
            description:
              "Optional short badge on the photo, e.g. “No brokerage”, “Loan assistance”, “Clear title”.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "price",
            label: "Price",
            description: 'Shown as written, e.g. “₹43 L”, “₹1.2 Cr”, “On request”.',
            required: true,
          },
          {
            type: "number",
            name: "areaSqft",
            label: "Area (sq ft)",
            required: true,
          },
          {
            type: "string",
            name: "propertyType",
            label: "Property type",
            required: true,
            options: ["Flat", "Plot", "Shop", "Bungalow", "Office"],
          },
          {
            type: "number",
            name: "bedrooms",
            label: "Bedrooms",
            description: "Leave blank for plots and shops.",
          },
          {
            type: "number",
            name: "bathrooms",
            label: "Bathrooms",
            description: "Leave blank for plots and shops.",
          },
          {
            type: "string",
            name: "locality",
            label: "Locality",
            description: "e.g. “Vasai West”, “Nalasopara”.",
            required: true,
          },
          {
            type: "string",
            name: "possession",
            label: "Possession",
            options: ["Ready to move", "Under construction", "Resale"],
          },
          {
            type: "string",
            name: "facing",
            label: "Facing",
            description: "Optional, e.g. “East”, “North-East”.",
          },
          {
            type: "object",
            name: "gallery",
            label: "Photo gallery",
            description:
              "The card shows these as a carousel. Add at least one; keep files small (mobile data).",
            list: true,
            required: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Photo" }),
            },
            fields: [
              { type: "image", name: "image", label: "Image", required: true },
              {
                type: "string",
                name: "alt",
                label: "Describe the photo",
                required: true,
              },
            ],
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on the site",
            description:
              "Turn on to include this listing in the Featured Properties section.",
          },
          {
            type: "number",
            name: "order",
            label: "Sort order",
            description: "Lower numbers show first.",
          },
        ],
      },

      /* ---------------------------------------------------------- */
      {
        name: "ongoingProject",
        label: "Ongoing Projects",
        path: "content/ongoing-projects",
        format: "json",
        ui: {
          filename: {
            slugify: (values) =>
              `${values?.title || "project"}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          ...sharedProjectFields.slice(0, 4),
          {
            type: "number",
            name: "percentComplete",
            label: "Percent complete",
            description: "Optional. A number from 0 to 100 — shown as “60% done”.",
          },
          {
            type: "string",
            name: "expectedCompletion",
            label: "Expected completion",
            description: "Optional, e.g. “March 2026”.",
          },
          ...sharedProjectFields.slice(4),
        ],
      },

      /* ---------------------------------------------------------- */
      {
        name: "completedProject",
        label: "Completed Projects",
        path: "content/completed-projects",
        format: "json",
        ui: {
          filename: {
            slugify: (values) =>
              `${values?.title || "project"}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          ...sharedProjectFields.slice(0, 4),
          {
            type: "number",
            name: "completedYear",
            label: "Year handed over",
            description: "Shown on the card as “Delivered 2024”.",
            required: true,
          },
          {
            type: "number",
            name: "durationMonths",
            label: "Build duration (months)",
            description: "Optional.",
          },
          ...sharedProjectFields.slice(4),
        ],
      },

      /* ---------------------------------------------------------- */
      {
        name: "stats",
        label: "Number Stats",
        path: "content/stats",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true, slugify: () => "stats" },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Stats",
            description:
              "The counting numbers in the maroon band. Keep to 4–6. Type the value exactly as it should read — the number animates, the rest stays put.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label:
                  item?.value && item?.label
                    ? `${item.value} — ${item.label}`
                    : "Stat",
              }),
              defaultItem: { value: "100+", label: "Projects delivered" },
            },
            fields: [
              {
                type: "string",
                name: "value",
                label: "Value",
                description: 'e.g. “30”, “500+”, “1.2M”, “₹250 Cr”.',
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Label",
                description: 'e.g. “Years of service”.',
                required: true,
              },
            ],
          },
        ],
      },

      /* ---------------------------------------------------------- */
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {
          filename: {
            slugify: (values) =>
              `${values?.name || "client"}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "quote",
            label: "What they said",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            description: 'e.g. “Priya & Joseph S.”',
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            description: 'e.g. “Vasai West”.',
            required: true,
          },
          {
            type: "string",
            name: "service",
            label: "Service used",
            description: 'e.g. “Bought a 2 BHK”, “New home build”, “Full renovation”.',
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Sort order",
            description: "Lower numbers show first.",
          },
        ],
      },
    ],
  },
});
