import axios from "axios";

export const getAllCategory = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/category`);
};
export const getSingleCategory = async (slug) => {
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};
// export const createCategory = async (category, status, authtoken) => {
//   await axios.post(`${process.env.REACT_APP_API}/category`, {
//     headers: authtoken,
//   });
// };

export const createCategory = async (name, status, authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/category`,
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
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name, status },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
