export const AppRouteUi = {
  Root: "/got",
  Characters: () => `${AppRouteUi.Root}/characters`,
  Character: (id: string | number) => `${AppRouteUi.Characters()}/${id}`,
  Continents: () => `${AppRouteUi.Root}/continents`,
};
