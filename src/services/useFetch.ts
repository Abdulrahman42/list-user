/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchUser, type UserType } from "./api";

type FilterOptions = {
  company?: string;
  city?: string;
};

export type DropdownType = {
  label: string;
  value: string;
}[];

const useFetch = (autoFetch = true) => {
  const [data, setData] = useState<UserType[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<DropdownType>([]);
  const [company, setCompany] = useState<DropdownType>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get("q") || "";
  const cityFilter = searchParams.get("city") || undefined;
  const companyFilter = searchParams.get("company") || undefined;

  const filters: FilterOptions = useMemo(
    () => ({ city: cityFilter, company: companyFilter }),
    [cityFilter, companyFilter]
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchUser();
      setData(result);
      const dropdownCity = result.map((item) => ({
        label: item.address?.city,
        value: item.address?.city,
      }));
      setCity(dropdownCity);
      const dropdownCompany = result.map((item) => ({
        label: item.company?.name,
        value: item.company?.name,
      }));
      setCompany(dropdownCompany);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(t);
    }
  }, [query, cityFilter, companyFilter, data]);

  const filteredData = useMemo(() => {
    if (!data) return null;
    const lowerQuery = query.toLowerCase();

    return data.filter((user) => {
      const matchesQuery =
        query === "" ||
        user.name.toLowerCase().includes(lowerQuery) ||
        user.username.toLowerCase().includes(lowerQuery);

      const matchesCompany =
        !filters.company ||
        user.company?.name.toLowerCase() === filters.company.toLowerCase();

      const matchesCity =
        !filters.city ||
        user.address?.city.toLowerCase() === filters.city.toLowerCase();

      return matchesQuery && matchesCompany && matchesCity;
    });
  }, [data, query, filters]);

  return {
    data: filteredData,
    error,
    loading,
    refetch: fetchData,
    city,
    company,
  };
};

export default useFetch;
