import { createFileRoute } from "@tanstack/react-router";
import { CategoryTemplate, categoryHead } from "@/components/CategoryTemplate";
import { CATEGORIES } from "@/lib/site-data";

const category = CATEGORIES[1]!;

export const Route = createFileRoute("/paintball")({
  head: categoryHead(category),
  component: () => <CategoryTemplate category={category} />,
});
