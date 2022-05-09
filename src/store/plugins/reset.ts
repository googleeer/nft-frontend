import cloneDeep from "lodash.clonedeep";
import { PiniaPluginContext } from "pinia";

export const resetStorePlugin = ({ store }: PiniaPluginContext) => {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
};
