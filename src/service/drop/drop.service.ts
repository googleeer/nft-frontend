import { Drop } from "@/service/drop/drop.type";
import instance from "@/service/api/api.instance";
import { useUserStore } from "@/store/user.store";

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

export const getMintedDropsCount = async (): Promise<void> => {
  try {
    const res = await instance.get("/nft-drop/minted/count");
    const userStore = useUserStore();
    userStore.setUserNftCount(res.data.count);
  } catch (e) {
    return Promise.reject(e);
  }
};
