import {
  Collection,
  CollectionWithDrops,
  Drop,
  Perk,
} from "@/service/collections/collections.type";
import instance from "@/service/api/api.instance";

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const res = await instance.get("/nft-collection");
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getCollection = async (
  id: number,
): Promise<CollectionWithDrops> => {
  try {
    const res = await instance.get(`/nft-collection/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getDrop = async (id: number): Promise<Drop> => {
  try {
    const res = await instance.get(`/nft-drop/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPerks = async (): Promise<Perk[]> => {
  try {
    const res = await instance.get("/nft-perk");
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPerk = async (id: number): Promise<Perk> => {
  try {
    const res = await instance.get(`/nft-perk/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
