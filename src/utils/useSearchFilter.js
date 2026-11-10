import { useLocation } from "react-router-dom";

const normalize = (s = "") =>
String(s).toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();

const toToken = (w) => (w.endsWith("s") && w.length > 3 ? w.slice(0, -1) : w);

const matchesSearch = (text = "", q = "") => {
if (!q.trim()) return true;
const a = normalize(text).split(" ").map(toToken);
const b = normalize(q).split(" ").map(toToken);
return b.every((w) => a.some((p) => p.includes(w) || w.includes(p)));
};

export const useSearchFilter = (products = []) => {
const location = useLocation();
const searchQuery = new URLSearchParams(location.search).get("search") || "";
if (!searchQuery.trim()) return products;

return products.filter((p) => {
const text = `${p.name || ""} ${p.img || ""}`;
return matchesSearch(text, searchQuery);
});
};