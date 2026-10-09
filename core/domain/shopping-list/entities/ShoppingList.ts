import {
    SHOPPING_LIST_STATUS,
    type ShoppingListStatus,
    type ShoppingListStatusType,
} from "~~/core/domain/shopping-list/enums/ShoppingListStatus";

import type { ShoppingListItem } from "~~/core/domain/shopping-list/entities/ShoppingListItem";

export interface ShoppingListProps {
    id: string;
    name: string;
    createdAt: string;
    status: ShoppingListStatusType;
    items?: ShoppingListItem[];
}

export class ShoppingList {
    private readonly id: string;
    private name: string;
    private status: ShoppingListStatusType;
    private readonly createdAt: string;
    private items: ShoppingListItem[];

    constructor(props: ShoppingListProps) {
        if (!props.id.trim()) {
            throw new Error("O id da lista não pode ser vazio.");
        }

        if (!props.name.trim()) {
            throw new Error("O nome da lista não pode ser vazio.");
        }

        this.id = props.id;
        this.name = props.name;
        this.createdAt = props.createdAt;
        this.status = props.status;
        this.items = props.items ?? [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCreatedAt(format: boolean = false): string {
        if (format) {
            return new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date(this.createdAt));
        }

        return this.createdAt;
    }

    getStatus(): ShoppingListStatusType {
        return this.status;
    }

    getStatusInfo(): ShoppingListStatus {
        return (
            Object.values(SHOPPING_LIST_STATUS).find((status) => status.value === this.status) ??
            SHOPPING_LIST_STATUS.DRAFT
        );
    }

    setItems(items: ShoppingListItem[]): void {
        this.items = [...items];
    }

    addItem(item: ShoppingListItem): void {
        this.items.push(item);
    }

    getItems(): ShoppingListItem[] {
        return [...this.items];
    }

    hasItem(itemId: string): boolean {
        return this.items.some((item) => item.getId() === itemId);
    }

    removeItem(itemId: string): void {
        this.items = this.items.filter((item) => item.getId() !== itemId);
    }

    updateItem(updatedItem: ShoppingListItem): void {
        const itemIndex = this.items.findIndex((item) => item.getId() === updatedItem.getId());

        if (itemIndex !== -1) {
            this.items[itemIndex] = updatedItem;
        }
    }

    getTotalValue(format: boolean = false): number | string {
        const totalValue = this.items.reduce((total, item) => total + Number(item.getSubtotal()), 0);

        if (format) {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(totalValue);
        }

        return totalValue;
    }

    rename(name: string): void {
        if (!name.trim()) {
            throw new Error("O nome da lista não pode ser vazio.");
        }

        this.name = name;
    }

    setStatus(status: ShoppingListStatusType): void {
        this.status = status;
    }

    startShopping(): void {
        this.status = SHOPPING_LIST_STATUS.SHOPPING.value;
    }

    finish(): void {
        this.status = SHOPPING_LIST_STATUS.FINISHED.value;
    }

    isDraft(): boolean {
        return this.status === SHOPPING_LIST_STATUS.DRAFT.value;
    }

    isShopping(): boolean {
        return this.status === SHOPPING_LIST_STATUS.SHOPPING.value;
    }

    isFinished(): boolean {
        return this.status === SHOPPING_LIST_STATUS.FINISHED.value;
    }
}
