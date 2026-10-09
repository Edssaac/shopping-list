import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const shoppingList = sqliteTable("shopping_list", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: text("created_at").notNull(),
    status: text("status").notNull(),
});

export const shoppingItem = sqliteTable("shopping_item", {
    id: text("id").primaryKey(),
    listId: text("list_id")
        .notNull()
        .references(() => shoppingList.id, {
            onDelete: "cascade",
        }),

    name: text("name").notNull(),
    notes: text("notes").notNull().default(""),
    boughtQuantity: integer("bought_quantity").notNull().default(0),
    unitPrice: integer("unit_price").notNull(),
});
