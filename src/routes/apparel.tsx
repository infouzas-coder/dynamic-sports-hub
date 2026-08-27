import { createFileRoute } from "@tanstack/react-router";
import { CategoryTemplate, categoryHead } from "@/components/CategoryTemplate";
import { CATEGORIES } from "@/lib/site-data";

const category = CATEGORIES[0]!;

export const Route = createFileRoute("/apparel")({
  head: categoryHead(category),
  component: () => <CategoryTemplate category={category} />,
});
