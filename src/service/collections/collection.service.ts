import {
  Collection,
  CollectionWithDrops,
  Drop,
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
    const res = await instance.get(`/nft-perk/drop/${id}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
