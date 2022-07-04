import { Mint } from "@/service/mint/mint.type";
import instance from "@/service/api/api.instance";

export const getMint = async (id: number): Promise<Mint> => {
  try {
    const res = await instance.get(`/nft-drop/${id}/mint`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const putActivate = async (id: number) => {
  try {
    await instance.post(`/nft-drop/${id}/mint`);
  } catch (e) {
    return Promise.reject(e);
  }
};
