import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const handleLogin = async ({ userType, data }) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + `/${userType}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: data,
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
export const handleStudentLogin = async () => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/student/login",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: {
        username: "1234567890",
        password: "password123",
      },
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const downloadResult = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/student/login",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: {
        username: "1234567890",
        password: "password123",
      },
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const registerStudent = async ({ data }) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/student/register",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: data,
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const adminLogin = async ({ data }) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/student/register",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: data,
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
