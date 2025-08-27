import type { UserType } from "../services/api";

type UserCardProps = {
  user: UserType;
};
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div
      key={user.id}
      className="max-w-[766px] w-full h-max bg-white mt-4 rounded-md mb-2 flex flex-col items-start p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="grid grid-cols-12 gap-1">
        <div className="lg:col-span-2 col-span-3">
          <div className="min-w-[110px] h-20 rounded-full">
            <img src={`https://i.pravatar.cc/250?u=${user.email}`}     className="w-20 h-20 rounded-full"/>
          </div>
        </div>
        <div className="lg:col-span-9 col-span-9">
          <p className="text-xl font-medium text-[#101828]">{user.name}</p>
          <p className="text-base text-gray-500">{user.company.name}</p>
          <div className="grid grid-cols-2 text-left gap-x-10 mt-2 ">
            <p className="text-base text-gray-500 flex items-center">
              <span className="material-symbols-rounded text-xs mr-2">
                phone
              </span>
              {user.phone}
            </p>
            <p className="text-base text-gray-500  flex items-center">
              <span className="material-symbols-rounded text-xs mr-2">
                home
              </span>
              {user.address.city}
            </p>
            <p className="text-base text-gray-500 flex items-center truncate">
              <span className="material-symbols-rounded text-xs mr-2">
                email
              </span>
              {user.email}
            </p>
            <p className="text-base text-gray-500 flex items-center">
              <span className="material-symbols-rounded text-xs mr-2">
                language
              </span>
              {user.website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
