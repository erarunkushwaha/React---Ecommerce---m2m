import axios from "axios";

const URL = process.env.REACT_APP_API;

export const getAllSubCategory = async () => {
  return await axios.get(`${URL}/subCategory`);
};
export const getSingleSubCategory = async (slug) => {
  await axios.get(`${URL}/subCategory/${slug}`);
};
// export const createSubCategory = async (subCategory, status, authtoken) => {
//   await axios.post(`${URL}/subCategory`, {
//     headers: authtoken,
//   });
// };

export const createSubCategory = async (name, status, catSlug, authtoken) => {
  const res = await axios.post(
    `${URL}/subCategory`,
    { name, status, catSlug },
    {
      headers: {
        authtoken,
      },
    }
  );
  return res.data;
};

export const updateSubCategory = async (
  slug,
  name,
  status,
  parentCat,
  authtoken
) => {
  return await axios.patch(
    `${URL}/subCategory/${slug}`,
    { name, status, parentCat },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`${URL}/subCategory/${slug}`, {
    headers: {
      authtoken,
    },
  });
