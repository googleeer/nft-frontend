import {
  Collection,
  CollectionWithDrops,
} from "@/service/collections/collections.type";
import instance from "@/service/api/api.instance";
import { useCollectionsStore } from "@/store/collections.store";

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const res = await instance.get("/nft-collection");
    const collectionStore = useCollectionsStore();
    collectionStore.setCollections(res.data);
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
