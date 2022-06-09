export const ROUTES = {
  HOME: {
    path: "/",
    name: "home",
  },
  LOGIN: {
    path: "/login",
    name: "login",
  },
  LOGIN_VERIFY: {
    path: "/login/verify",
    name: "verifyLogin",
  },
  MY_NFTS: {
    path: "/my-nft",
    name: "myNft",
  },
  COLLECTIONS: {
    path: "/collections",
    name: "collections",
  },
  COLLECTION: {
    path: "/collection/:id",
    name: "collection",
  },
  DROP: {
    path: "/collection/:collectionId/drop/:id",
    name: "drop",
  },
  MINT: {
    path: "/collection/:collectionId/drop/:id/mint",
    name: "mint",
  },
  DROPS: {
    path: "/drops",
    name: "drops",
  },
  PERKS: {
    path: "/perks",
    name: "perks",
  },
  USER_SETTINGS: {
    path: "/user-settings",
    name: "userSettings",
  },
  USER_SETTINGS_WALLET: {
    path: "wallet",
    name: "userSettingsWallet",
  },
  USER_SETTINGS_FAQ: {
    path: "faq",
    name: "userSettingsFaq",
  },
  USER_SETTINGS_REFERRAL: {
    path: "referral",
    name: "userSettingsReferral",
  },
};
