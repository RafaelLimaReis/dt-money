import { createContext, useEffect, useState } from "react";
import { TransactionInterface, TransactionsContextInterface, TransactionsProviderInterface } from "../interfaces/Transactions";

export const TransactionsContext = createContext({} as TransactionsContextInterface);

export function TransactionsProvider({ children }: TransactionsProviderInterface) {
    const [transactions, setTransaction] = useState<TransactionInterface[]>([]);

    async function getTransaction() {
        const responseTransactions = await fetch('http://localhost:3333/transactions');
        const dataTransactions = await responseTransactions.json();

        setTransaction(dataTransactions);
    }

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }} >
            {children}
        </TransactionsContext.Provider>
    )
}