"use server"
import axios from "axios";
import { cookies } from "next/headers";

async function fetchApi({
  endpoint,
  method = "GET",
  data,
}: {
  endpoint: string;
  method?: string;
  data?: any;
}) {
  const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api${endpoint}`;

  const options = {
    method,
    credentials: "include",
    url,
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString()
    },
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error: any) {
    console.error("API Error Response:", error);
    return error.response.data || error.message;
  }
}

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  return await fetchApi({
    endpoint: "/auth/register",
    method: "POST",
    data,
  });
};

export const getAllCourses = async () => {
  return await fetchApi({ endpoint: "/course" });
};

export const getCourse = async (id: string) => {
  return await fetchApi({ endpoint: `/course/${id}` });
};

export const getMyCourses = async (filter: any) => {
  return await fetchApi({
    endpoint: `/my-course?filter=${JSON.stringify(filter)}`,
  });
};

export const addToMyCourse = async (id: string) => {
  return await fetchApi({
    endpoint: "/my-course",
    method: "POST",
    data: { id },
  });
};

export const updateMyCourse = async (data: any) => {
  return await fetchApi({ endpoint: `/my-course`, method: "PATCH", data });
};
