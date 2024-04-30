import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
    const { transactions } = useContext(TransactionsContext);

    const summary = transactions.reduce((summaryAccumulator, transaction) => {
        if (transaction.type === 'income') {
            summaryAccumulator.income += transaction.price;
            summaryAccumulator.total += transaction.price;
        } else {
            summaryAccumulator.outcome += transaction.price;
            summaryAccumulator.total -= transaction.price;
        }
        
        return summaryAccumulator;
    }, { income: 0, outcome: 0, total: 0 });

    return summary;
}