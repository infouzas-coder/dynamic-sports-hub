import { createFileRoute } from "@tanstack/react-router";
import { CategoryTemplate, categoryHead } from "@/components/CategoryTemplate";
import { CATEGORIES } from "@/lib/site-data";

const category = CATEGORIES[2]!;

export const Route = createFileRoute("/martial-arts-combat-sports")({
  head: categoryHead(category),
  component: () => <CategoryTemplate category={category} />,
});
