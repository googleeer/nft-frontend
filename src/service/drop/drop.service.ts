import { Drop } from "@/service/drop/drop.type";
import instance from "@/service/api/api.instance";
import { useUserStore } from "@/store/user.store";
import { useDropsStore } from "@/store/drop.store";

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

export const getDrops = async (): Promise<Drop[]> => {
  try {
    const res = await instance.get("/nft-drop");
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getDropsByCollectionId = async (id: number) => {
  try {
    const res = await instance.get(`/nft-drop/collection/${id}`);
    const dropsStore = useDropsStore();
    dropsStore.setDrops(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
