import { Mint } from "@/service/mint/mint.type";
import instance from "@/service/api/api.instance";
import { getMintedDropsCount } from "@/service/drop/drop.service";

export const getMint = async (id: number): Promise<Mint> => {
  try {
    const res = await instance.get(`/nft-drop/${id}/mint`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postMint = async (id: number) => {
  try {
    await instance.post(`/nft-drop/${id}/mint`);
    await getMintedDropsCount();
  } catch (e) {
    return Promise.reject(e);
  }
};
