export const SHOPPING_LIST_STATUS = {
    DRAFT: {
        title: "Rascunho",
        value: "draft",
    },
    SHOPPING: {
        title: "Comprando",
        value: "shopping",
    },
    FINISHED: {
        title: "Finalizada",
        value: "finished",
    },
} as const;

export type ShoppingListStatusKey = keyof typeof SHOPPING_LIST_STATUS;

export type ShoppingListStatus = (typeof SHOPPING_LIST_STATUS)[ShoppingListStatusKey];

export type ShoppingListStatusType = ShoppingListStatus["value"];
