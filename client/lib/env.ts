export const BUILDER_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;

if (BUILDER_KEY === "__BUILDER_PUBLIC_KEY__") {
  console.warn("⚠️ VITE_PUBLIC_BUILDER_KEY is still a placeholder");
}
