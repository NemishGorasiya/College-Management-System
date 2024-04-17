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

export const uploadFile = async (formData) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/uploads/files",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};
export const uploadCircular = async (circularData) => {
  console.log("data", circularData);
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/circular",
      headers: { "Content-Type": "application/json" },
      data: circularData,
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCirculars = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/circular",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    console.log(res);
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};
export const fetchExams = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/student/exams/",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    console.log(res);
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchEvents = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/events",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    console.log(res);
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};

export const downloadCircular = async ({ url: circularLink, fileName }) => {
  try {
    const res = await axios({
      method: "get",
      url: circularLink,
      responseType: "blob",
    });
    console.log(res);
    const downloadUrl = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName || "circular";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    return true;
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
