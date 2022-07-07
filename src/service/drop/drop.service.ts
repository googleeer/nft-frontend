import { Drop } from "@/service/drop/drop.type";
import instance from "@/service/api/api.instance";

export const getDrop = async (id: number): Promise<Drop> => {
  try {
    const res = await instance.get(`/nft-drop/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getMintedDrops = async (): Promise<Drop[]> => {
  try {
    const res = await instance.get("/nft-drop/minted");
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
