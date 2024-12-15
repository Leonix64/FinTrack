export interface Category {
    id?: string;
    name: string;
    color: string;
    userId: string;
}

export interface CreateCategory {
    name: string;
    color: string;
}

export interface UpdateCategory {
    id: string;
    name?: string;
    color?: string;
}
