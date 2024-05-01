import { useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (summaryAccumulator, transaction) => {
        if (transaction.type === 'income') {
          summaryAccumulator.income += transaction.price
          summaryAccumulator.total += transaction.price
        } else {
          summaryAccumulator.outcome += transaction.price
          summaryAccumulator.total -= transaction.price
        }

        return summaryAccumulator
      },
      { income: 0, outcome: 0, total: 0 },
    )
  }, [transactions])

  return summary
}
