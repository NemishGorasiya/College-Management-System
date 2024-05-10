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
export const deleteEvent = async (eventId) => {
  try {
    const res = await axios({
      method: "delete",
      url: BASE_URL + `/events/${eventId}`,
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCircular = async (circularId) => {
  try {
    const res = await axios({
      method: "delete",
      url: BASE_URL + `/circular/${circularId}`,
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const approveRequest = async (requestId) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + `/admin/requests/${requestId}/approve`,
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const reviewRequest = async ({ requestId, updatedStatus }) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + `/admin/requests/${requestId}/${updatedStatus}`,
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const rejectRequest = async (requestId) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + `/admin/requests/${requestId}/approve`,
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const downloadResult = async (examType) => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + `/student/final-results/${examType}/download`,
      responseType: "blob",
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    console.log(res.data);
    const downloadUrl = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${examType}_result` || "result";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    return true;
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
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const uploadCircular = async (circularData) => {
  try {
    console.log("res");
    const res = await axios({
      method: "post",
      url: BASE_URL + "/circular",
      headers: { "Content-Type": "application/json" },
      data: circularData,
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const createNewEvent = async (eventData) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/events",
      headers: { "Content-Type": "application/json" },
      data: eventData,
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

export const loginUser = async ({ userType, data }) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + `/${userType}/login`,
      headers: { "Content-Type": "application/json" },
      data: data,
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const logoutUser = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + `/user/logout`,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    return res;
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
export const fetchResults = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/student/results",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchSubjectDetails = async (subjectId) => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + `/subject/${subjectId}`,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRequests = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/admin/requests",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      redirect: "follow",
    });
    console.log(res);
    return res.data;
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
export const requestEditProfile = async ({ userType, data, userId }) => {
  try {
    const res = await axios({
      method: "patch",
      url:
        BASE_URL +
        `/${userType}/update/request?${
          userType === "student" ? "studentId" : "facultyId"
        }=${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
      data: data,
    });
    console.log(res.data);
    return res.data;
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

export const fetchProfileData = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/user/my-profile",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
