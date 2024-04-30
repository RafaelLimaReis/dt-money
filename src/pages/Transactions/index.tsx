import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionInterface } from "../../interfaces/Transactions";

export function Transactions() {
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
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {
                            transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td width="50%">{transaction.description}</td>
                                        <td>
                                            <PriceHighlight variant={transaction.type}>{transaction.price}</PriceHighlight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.createdAt}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}