import axios from "axios";
import * as authservice from "./authServices";

const getToken = () => {
  if (authservice.isLoggedIn()) {
    const { userToken } = authservice.getUser();

    if (!userToken) {
      return;
    }

    return {
      Authorization: `Bearer ${userToken}`,
    };
  } else {
    return;
  }
};

export async function getData(url) {
  try {
    let responseData;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      {
        headers: getToken(),
        timeout: parseInt(process.env.REACT_APP_AXIOS_API_TIMEOUT),
      }
    );

    if (response.status === 200) {
      responseData = response.data;
    }
    return responseData;
  } catch (error) {
    console.log(`getData URL=${url}`, error);

    return error?.response?.data ? error?.response?.data : undefined;
  }
}

export async function upload(url, data, timeout) {
  let responseData;
  let response = null;
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getToken(),
        },
        timeout: parseInt(
          timeout ? timeout : process.env.REACT_APP_AXIOS_API_TIMEOUT
        ),
      }
    );

    if (response.status === 201 || response.status === 200) {
      responseData = response.data
        ? response.data
        : "request success without data";
    }
    return responseData;
  } catch (error) {
    let errorRes;
    if (error.response) {
      errorRes = error.response.data;
    }

    console.log(`Upload URL=${url}`, error);

    return errorRes;
  }
}

export async function postData(url, data, accessToken) {
  let responseData;
  let response = null;
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      data,
      {
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : getToken(),
        timeout: parseInt(process.env.REACT_APP_AXIOS_API_TIMEOUT),
      }
    );

    if (response.status === 201 || response.status === 200) {
      responseData = response.data
        ? response.data
        : "request success without data";
    }
    return responseData;
  } catch (error) {
    let errorRes;
    if (error.response) {
      errorRes = error.response.data;
    }

    console.log(`postData URL=${url}`, error);

    return errorRes;
  }
}
