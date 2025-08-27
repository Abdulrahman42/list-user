import { useState, type ComponentProps } from "react";
import Filter from "./Filter";
import type { DropdownType } from "../services/useFetch";
import ClickOutside from "./ClickOutside";

type InputAndFilterProps = ComponentProps<"input"> & {
  cityDropdownOptions: DropdownType;
  companyDropdownOptions: DropdownType;
};

const InputAndFilter = ({
  cityDropdownOptions,
  companyDropdownOptions,
  ...inputProps
}: InputAndFilterProps) => {
  const [isFilterAction, setFilterAction] = useState(false);

  return (
    <div className={`max-w-[766px] w-full flex items-center h-11`}>
      <div className="w-full flex items-center rounded border border-stroke focus:border-[#F7FCFF] border-gray-400 pl-4">
        <span className="material-symbols-outlined text-xl text-default-gray-21">
          search
        </span>
        <input
          className="w-full rounded-l h-11  bg-transparent p-[14px] outline-none"
          {...inputProps}
          type="text"
        />
      </div>
      <div className="relative">
        <span
          onClick={() => setFilterAction(!isFilterAction)}
          className="material-symbols-outlined h-11 w-11 rounded-r border border-stroke p-[10px] border-gray-400 cursor-pointer">
          tune
        </span>
        <div
          className={`absolute left-full top-full mt-2 -translate-x-full z-20 w-max max-w-[533px] rounded bg-white font-medium shadow-md ${
            isFilterAction ? "block" : "hidden"
          } `}>
          {isFilterAction && (
            <ClickOutside
              onClick={() => setFilterAction(false)}
              className="relative">
              <Filter
                showFilterAction={isFilterAction}
                handleCloseFilter={() => setFilterAction(false)}
                cityDropdownOptions={cityDropdownOptions}
                companyDropdownOptions={companyDropdownOptions}
              />
            </ClickOutside>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputAndFilter;
