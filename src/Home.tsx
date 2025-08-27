import { useLocation } from "react-router-dom";

import useFetch from "./services/useFetch";
import { useSearchQuery } from "./services/useSearchQuery";

import UserCard from "./components/UserCard";
import InputAndFilter from "./components/InputAndFilter";
import ActiveFilter from "./components/ActiveFilter";

const Home = () => {
  const { value, setValue } = useSearchQuery("q");

  const { data, loading, error, city, company } = useFetch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const activeFilters = {
    city: searchParams.get("city")
      ? { label: searchParams.get("city")!, value: searchParams.get("city")! }
      : null,
    company: searchParams.get("company")
      ? {
          label: searchParams.get("company")!,
          value: searchParams.get("company")!,
        }
      : null,
  };

  return (
    <div className="w-full min-h-screen h-auto bg-[#F6F7F8] px-2 flex flex-col items-center py-4">
      <InputAndFilter
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        cityDropdownOptions={city}
        companyDropdownOptions={company}
      />
      <div className="flex items-start max-w-[766px] w-full mt-2">
        <ActiveFilter active={activeFilters} />
      </div>
      {loading && (
        <span className="material-symbols-outlined animate-spin mt-5">
          progress_activity
        </span>
      )}
      {error && (
        <p className="text-base text-center">Error : {error.message}</p>
      )}
      {data &&
        !loading &&
        !error &&
        data.map((user) => <UserCard user={user} key={user.id} />)}
    </div>
  );
};

export default Home;
