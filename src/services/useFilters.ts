import { useNavigate, useLocation } from "react-router-dom";

type FilterOptions = {
  city?: string;
  company?: string;
};

export const useFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const saveFilters = (filters: FilterOptions) => {
    const params = new URLSearchParams(location.search);

    params.delete("city");
    params.delete("company");

    if (filters.city) params.set("city", filters.city);
    if (filters.company) params.set("company", filters.company);

    if (params.toString() !== location.search.substring(1)) {
      navigate({ pathname: location.pathname, search: params.toString() });
    }
  };

  return { saveFilters };
};
