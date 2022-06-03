<script lang="ts">
import { defineComponent } from "vue";
import { ROUTES } from "@/constants/routes.constants";
import CollectionDrop from "@/components/collections/Drop.vue";
import MenuInfo from "@/components/collections/MenuInfo.vue";
import data from "../../test-data.json";
import router from "@/router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CollectionView",
  components: { MenuInfo, CollectionDrop },
  setup() {
    const { t } = useI18n();
    const currentCollectionId = +router.currentRoute.value.params.id;
    const collections = data[0].collections;
    const currentCollection = collections[currentCollectionId];
    const properties = {
      artist: currentCollection.artist,
      brand: currentCollection.brand,
    };
    const drops = currentCollection.drops;
    return { ROUTES, currentCollection, properties, drops, t };
  },
});
</script>

<template>
  <div class="collection flex flex-grow-1">
    <div class="collection__img--wrap">
      <img
        :src="require(`@/assets/images/${currentCollection.gif}`)"
        class="collection__img"
      />
    </div>
    <MenuInfo
      :properties="properties"
      :drops="drops"
      :collection="currentCollection"
    >
      <CollectionDrop
        v-for="drop of drops"
        :key="drop.name"
        :drop="drop"
      ></CollectionDrop>
    </MenuInfo>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  &__img--wrap {
    width: 100%;
    @media screen and (max-width: 523px) {
      display: none;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
