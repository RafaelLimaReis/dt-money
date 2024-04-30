import { createContext, useEffect, useState } from "react";
import { TransactionInterface, TransactionsContextInterface, TransactionsProviderInterface } from "../interfaces/Transactions";

export const TransactionsContext = createContext({} as TransactionsContextInterface);

export function TransactionsProvider({ children }: TransactionsProviderInterface) {
    const [transactions, setTransaction] = useState<TransactionInterface[]>([]);

    async function getTransactions(query?: string) {
        const url = new URL('http://localhost:3333/transactions');

        if (query) {
            url.searchParams.append('q', query);
        }

        const responseTransactions = await fetch(url);
        const dataTransactions = await responseTransactions.json();

        setTransaction(dataTransactions);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, getTransactions }} >
            {children}
        </TransactionsContext.Provider>
    )
}