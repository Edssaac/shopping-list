export interface ShoppingListItemProps {
    id: string;
    listId: string;
    name: string;
    notes: string;
    boughtQuantity: number;
    unitPrice: number;
}

export class ShoppingListItem {
    private readonly id: string;
    private readonly listId: string;

    private name: string;
    private notes: string;
    private boughtQuantity: number;
    private unitPrice: number;

    constructor(props: ShoppingListItemProps) {
        if (!props.id.trim()) {
            throw new Error("O id do produto não pode ser vazio.");
        }

        if (!props.listId.trim()) {
            throw new Error("O id da lista não pode ser vazio.");
        }

        if (props.boughtQuantity < 0) {
            throw new Error("Quantidade comprada não pode ser negativa.");
        }

        if (props.unitPrice < 0) {
            throw new Error("Preço unitário não pode ser negativo.");
        }

        this.id = props.id;
        this.listId = props.listId;
        this.name = props.name;
        this.notes = props.notes;
        this.boughtQuantity = props.boughtQuantity;
        this.unitPrice = props.unitPrice;
    }

    getId(): string {
        return this.id;
    }

    getListId(): string {
        return this.listId;
    }

    getName(): string {
        return this.name;
    }

    getNotes(): string {
        return this.notes;
    }

    getBoughtQuantity(): number {
        return this.boughtQuantity;
    }

    getUnitPrice(format: boolean = false): number | string {
        if (format) {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(this.unitPrice);
        }

        return this.unitPrice;
    }

    getSubtotal(format: boolean = false): number | string {
        const subtotal = this.boughtQuantity * this.unitPrice;

        if (format) {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(subtotal);
        }

        return subtotal;
    }

    rename(name: string): void {
        if (!name.trim()) {
            throw new Error("O nome do produto não pode ser vazio.");
        }

        this.name = name;
    }

    changeNotes(notes: string): void {
        this.notes = notes;
    }

    registerPurchase(quantity: number, unitPrice: number): void {
        if (quantity < 0) {
            throw new Error("Quantidade comprada não pode ser negativa.");
        }

        if (unitPrice < 0) {
            throw new Error("Preço unitário não pode ser negativo.");
        }

        this.boughtQuantity = quantity;
        this.unitPrice = unitPrice;
    }

    resetPurchase(): void {
        this.boughtQuantity = 0;
        this.unitPrice = 0;
    }
}
