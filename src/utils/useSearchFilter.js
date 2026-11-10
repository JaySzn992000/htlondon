import { useLocation } from "react-router-dom";
import { matchesSearch } from "./searchUtils";

export const useSearchFilter = (products, getName = (p) => p.name) => {
const location = useLocation();
const searchQuery = new URLSearchParams(location.search).get("search") || "";
return products.filter((p) => matchesSearch(getName(p), searchQuery));
};