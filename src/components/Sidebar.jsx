import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assests";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border border-gray-200/50 p-5 sticky top-15.25 z-20  ">
      <div className="flex items-center justify-center flex-col gap-3 mt-3 mb-7 ">
        {user?.profileImageURL ? (
          <img
            src={user.profileImageURL}
            alt="profile image"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-950 leading-6 font-medium">
          {user?.fullname || ""}
        </h5>
      </div>
      {SIDE_BAR_DATA.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${item.id}`}
            className={`w-full cursor-pointer flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3
                ${activeMenu === item.label ? "text-white bg-purple-600": ""}`}
          >
            <Icon className="text-xl " />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
