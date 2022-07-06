import instance from "@/service/api/api.instance";
import { Perk, PerkWithDrops } from "@/service/perk/perk.type";

export const getPerks = async (): Promise<Perk[]> => {
  try {
    const res = await instance.get("/nft-perk");
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPerk = async (id: number): Promise<PerkWithDrops> => {
  try {
    const res = await instance.get(`/nft-perk/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const putActivate = async (id: number) => {
  try {
    await instance.put(`/nft-perk/${id}/activate`);
  } catch (e) {
    return Promise.reject(e);
  }
};
