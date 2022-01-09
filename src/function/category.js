import axios from "axios";
const URL = process.env.REACT_APP_API;
export const getAllCategory = async () => {
  return await axios.get(`${URL}/category`);
};
export const getSingleCategory = async (slug) => {
  await axios.get(`${URL}/category/${slug}`);
};
// export const createCategory = async (category, status, authtoken) => {
//   await axios.post(`${URL}/category`, {
//     headers: authtoken,
//   });
// };

export const createCategory = async (name, status, authtoken) => {
  const res = await axios.post(
    `${URL}/category`,
    { name, status },
    {
      headers: {
        authtoken,
      },
    }
  );
  return res.data;
};

export const updateCategory = async (slug, name, status, authtoken) => {
  console.log(name, status, slug);

  return await axios.patch(
    `${URL}/category/${slug}`,
    { name, status },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${URL}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
