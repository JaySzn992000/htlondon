import { useLocation } from "react-router-dom";

const normalize = (s = "") =>
s.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();

const toToken = (w) => (w.endsWith("s") && w.length > 3 ? w.slice(0, -1) : w);

const matchesSearch = (name = "", q = "") => {
if (!q.trim()) return true;
const a = normalize(name).split(" ").map(toToken);
const b = normalize(q).split(" ").map(toToken);
return b.every((w) => a.some((p) => p.includes(w) || w.includes(p)));
};

export const useSearchFilter = (products = [], getName = (p) => p.name) => {
const location = useLocation();
const searchQuery = new URLSearchParams(location.search).get("search") || "";
return products.filter((p) => matchesSearch(getName(p), searchQuery));
};