import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="card bg-base-200 p-4 space-y-2">
        <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>UID:</strong> {user?.uid}</p>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-error mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
