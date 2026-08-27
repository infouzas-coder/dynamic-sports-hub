import { createFileRoute } from "@tanstack/react-router";
import { CategoryTemplate, categoryHead } from "@/components/CategoryTemplate";
import { CATEGORIES } from "@/lib/site-data";

const category = CATEGORIES[4]!;

export const Route = createFileRoute("/custom-patches")({
  head: categoryHead(category),
  component: () => <CategoryTemplate category={category} />,
});
