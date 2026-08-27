import { createFileRoute } from "@tanstack/react-router";
import { CategoryTemplate, categoryHead } from "@/components/CategoryTemplate";
import { CATEGORIES } from "@/lib/site-data";

const category = CATEGORIES[3]!;

export const Route = createFileRoute("/gloves")({
  head: categoryHead(category),
  component: () => <CategoryTemplate category={category} />,
});
