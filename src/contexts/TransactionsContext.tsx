import { createContext, useEffect, useState } from "react";
import { TransactionInterface, TransactionsContextInterface, TransactionsProviderInterface, createTransactionInputInterface } from "../interfaces/Transactions";
import { api } from "../lib/axios";

export const TransactionsContext = createContext({} as TransactionsContextInterface);

export function TransactionsProvider({ children }: TransactionsProviderInterface) {
    const [transactions, setTransaction] = useState<TransactionInterface[]>([]);

    async function getTransactions(query?: string) {
        const responseTransactions = await api.get('/transactions', { 
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        });
        
        setTransaction(responseTransactions.data);
    }

    async function createTransaction(data: createTransactionInputInterface) {
        const { description, price, category, type } = data;
        
        const responseNewTransaction = await api.post('/transactions', {
            description, price, category, type, createdAt: new Date()
        });

        setTransaction(state => [ responseNewTransaction.data, ...state]);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, getTransactions, createTransaction }} >
            {children}
        </TransactionsContext.Provider>
    )
}