export interface Transaction {
    id?: string; // Opcional, se genera al crearse
    amount: number;
    description: string;
    categoryId: string;
    date: string; // Fecha en formato ISO
    userId: string;
}

export interface CreateTransaction {
    amount: number;
    description: string;
    categoryId: string;
    date: string;
}

export interface UpdateTransaction {
    id?: string;
    amount?: number;
    description?: string;
    categoryId?: string;
    date?: string;
}
