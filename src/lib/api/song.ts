import api from "../axiosInstance";
import type { SongData } from "@/types/song";
import { DifficultyValue } from "@/config/difficulty";

export const fetchSongData = async (
  level: DifficultyValue,
  id: string
): Promise<SongData | null> => {
  try {
    const res = await api.get(`/${level}/${id}`);
    return res.data.body;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return null;
  }
};
