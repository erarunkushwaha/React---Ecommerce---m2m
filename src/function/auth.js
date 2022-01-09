import axios from "axios";

export const createOrUpateUser = async (authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/users/createOrUpdateUser
`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

  return res;
};

export const currentUser = async (authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/users/currentUser`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
  return res.data;
};
