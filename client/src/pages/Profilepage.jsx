import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const Profilepage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const { authUser, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  useEffect(() => {
    setName(authUser?.fullName || "");
    setBio(authUser?.bio || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      const res = await updateProfile({ fullName: name, bio });
      // Agar updateProfile response deta hai to state update karein
      if (res && res.user) {
        setName(res.user.fullName || "");
        setBio(res.user.bio || "");
      }
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      const res = await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio,
      });
      if (res && res.user) {
        setName(res.user.fullName || "");
        setBio(res.user.bio || "");
      }
      navigate("/");
    };
  };
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="your name"
            className="p-2 border border-gray-500 rounded-md"
            type="text"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="write profile bio"
            required
            className="p-2 border border-gray-500 rounded-md"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white cursor-pointer text-lg p-2 rounded-full"
          >
            save
          </button>
        </form>
        <img
          src={authUser?.profilePic || assets.logo_icon}
          alt=""
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${
            selectedImg && "rounded-full"
          }`}
        />
      </div>
    </div>
  );
};

export default Profilepage;
