import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const saveUser = async (user) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
    role: user?.role,
    phone: user?.phone,
  });
};
export const updateUser = async (user) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/updateUser/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
  });
};
