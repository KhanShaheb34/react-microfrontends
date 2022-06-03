export const AppRouteUi = {
  Root: "/rnm",
  Characters: () => `${AppRouteUi.Root}/characters`,
  Character: (id: string | number) => `${AppRouteUi.Characters()}/${id}`,
  Locations: () => `${AppRouteUi.Root}/locations`,
};
