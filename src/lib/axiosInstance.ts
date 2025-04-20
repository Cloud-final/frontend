import axios from "axios";

const lambda_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LAMBDA_API,
  timeout: 5000,
});

export { lambda_api };
