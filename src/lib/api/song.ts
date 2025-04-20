import { lambda_api } from "../axiosInstance";
import type { SongData } from "@/types/song";
import { DifficultyValue } from "@/config/difficulty";

export const fetchSongData = async (
  level: DifficultyValue,
  id: string
): Promise<SongData | null> => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    // const res = await lambda_api.get(`/${level}/${id}`);
    const res = await lambda_api.post(`/${level}/${id}`, {
      backend_url: BACKEND_URL
    });
    // const res = await lambda_api.post(`/${level}/${id}`, {
    //   backend_url: BACKEND_URL
    // });
    return res.data.body;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return null;
  }
};
