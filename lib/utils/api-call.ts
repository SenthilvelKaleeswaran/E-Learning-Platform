import axios from "axios";

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
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error: any) {
    console.error("API Error Response:", error);
    return error.response.data || error.message
    
  }
}

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await fetchApi({
    endpoint: "/auth/register",
    method: "POST",
    data,
  });
  return response;
};


