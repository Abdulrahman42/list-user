/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useSearchQuery = (paramKey: string = "q") => {
  const navigate = useNavigate();
  const location = useLocation();

  const getParamValue = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(paramKey) || "";
  };

  const [value, setValue] = useState(getParamValue());

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(location.search);

      if (value.trim() === "") {
        params.delete(paramKey);
      } else {
        params.set(paramKey, value);
      }
      if (params.toString() !== location.search.substring(1)) {
        navigate({ pathname: location.pathname, search: params.toString() });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [value, navigate, location.pathname, location.search, paramKey]);

  useEffect(() => {
    const currentValue = getParamValue();
    if (currentValue !== value) {
      setValue(currentValue);
    }
  }, [location.search]);

  return { value, setValue };
};
