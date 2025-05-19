import axios from "axios";

const BASE_URL = "https://api.spacexdata.com/v5";

export const getLaunches = async () => {
  const queryOptions = {
    select: "id name date_utc success upcoming details failures links",
    sort: "date_utc",
    limit: 150,
  };

  try {
    const response = await axios.post(`${BASE_URL}/launches/query`, {
      options: queryOptions,
    });
    return { data: response.data.docs, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};
