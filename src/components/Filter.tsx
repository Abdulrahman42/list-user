/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import InputDropdown from "./InputDropdown";

import { useFilters } from "../services/useFilters";
import type { DropdownType } from "../services/useFetch";

type FilterProps = {
  showFilterAction: boolean;
  handleCloseFilter: (arg: boolean) => void;
  cityDropdownOptions:  DropdownType
  companyDropdownOptions: DropdownType
};

const filter = {
  city: [],
  company: [],
};

type Filter = {
  city: {
    label: string;
    value: string;
  }[];
  company: {
    label: string;
    value: string;
  }[];
};

const Filter = ({ showFilterAction, handleCloseFilter, cityDropdownOptions, companyDropdownOptions }: FilterProps) => {
  const location = useLocation();
  const initialFilterValue = (): Filter => {
    const searchParams = new URLSearchParams(location.search);
    return {
      city: searchParams.get("city")
        ? [
            {
              label: searchParams.get("city")!,
              value: searchParams.get("city")!,
            },
          ]
        : [],
      company: searchParams.get("company")
        ? [
            {
              label: searchParams.get("company")!,
              value: searchParams.get("company")!,
            },
          ]
        : [],
    };
  };
  const [filterValue, setFilterValue] = useState<Filter>(initialFilterValue);

  const { saveFilters } = useFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFilterValue((prevData) => ({
      ...prevData,
      [name]: [value],
    }));
  };
  function checkButton(): boolean {
    if (filterValue.city?.[0]?.value) {
      return true;
    } else if (filterValue.company?.[0]?.value) {
      return true;
    } else {
      return false;
    }
  }

  const handleReset = () => {
    setFilterValue(filter);
  };

  const handleSave = () => {
    saveFilters({
      city: filterValue.city?.[0]?.value,
      company: filterValue.company?.[0]?.value,
    });
    handleCloseFilter(!showFilterAction);
  };

  useEffect(() => {
    setFilterValue(initialFilterValue());
  }, [location.search]);

  return (
    <div className="w-[373px]">
      <div className="flex items-center justify-between border-b py-2">
        <p
          className={`text-sm pl-5 ${
            checkButton()
              ? "cursor-pointer text-default-black-1"
              : "cursor-default text-default-black-4"
          }`}
          onClick={handleReset}>
          Reset
        </p>
        <p className="text-base text-default-black-1 font-semibold">Filter</p>
        <p
          className="text-sm text-default-secondary pr-5 cursor-pointer"
          onClick={() => (handleCloseFilter(!showFilterAction), handleSave())}>
          Done
        </p>
      </div>
      <div className="grid grid-cols-2 p-4 gap-4 overflow-auto  h-max">
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-normal text-default-black-1 text-left">
            City
          </label>
          <InputDropdown
            onSelect={handleChange}
            name="city"
            value={filterValue.city}
            options={cityDropdownOptions}
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-normal text-default-black-1 text-left">
            Company
          </label>
          <InputDropdown
            onSelect={handleChange}
            name="company"
            value={filterValue.company}
            options={companyDropdownOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
