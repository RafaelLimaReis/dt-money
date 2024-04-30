import { ReactNode } from "react";

export interface PriceHighlightProps {
    variant: 'income' | 'outcome';
}

export interface TransactionTypeButtonPropsInterface {
    variant: 'income' | 'outcome';
}

export interface TransactionInterface {
    id: number;
    description: string;
    price: number;
    category: string;
    type: 'income'|'outcome';
    createdAt: string;
}

export interface TransactionsContextInterface {
    transactions: TransactionInterface[];
}

export interface TransactionsProviderInterface {
    children: ReactNode;
}