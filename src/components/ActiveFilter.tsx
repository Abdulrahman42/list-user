/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";

type LabeledValue = { label: string; value: string };
type ActiveFilter = Record<
  string,
  { label: string; value: string } | { label: string; value: string } | null
>;


type ActiveFilterProps = {
  active: ActiveFilter;
};

const ActiveFilter = ({active}: ActiveFilterProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClearFilter = (key: string, valueToRemove?: string) => {
    const params = new URLSearchParams(location.search);

    if (Array.isArray(active[key])) {
      if (valueToRemove) {
        const filtered = (active[key] as LabeledValue[]).filter(
          v => v.value !== valueToRemove
        );
        params.delete(key);
        filtered.forEach(v => params.append(key, v.value));
      } else {
        params.delete(key);
      }
    } else {
      params.delete(key);
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const findValidKeys = (obj: ActiveFilter) =>
    Object.entries(obj)
      .filter(([_, val]) => {
        if (Array.isArray(val)) return val.length > 0;
        return val?.label && val?.value;
      })
      .map(([key, val]) => ({ key, val }));


  return (
    <div className='w-max flex items-center overflow-x-auto whitespace-nowrap overflow-y-hidden'>
     {findValidKeys(active).map(({key, val}, index: number) => {
        return (
          <div key={index} className="flex mr-2 items-center border bg-gray-400 text-white rounded-full w-max px-3 py-2 font-medium text-xs gap-2 h-8">
            <p className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}: {val?.label}</p>
            <span className="material-symbols-outlined text-sm cursor-pointer" onClick={() => handleClearFilter(key)}>close</span>
          </div>
        );
      })}
    </div>
  )
}

export default ActiveFilter;