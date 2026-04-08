import { useState, type ReactNode } from 'react'
import { GlobalContext, initialFormData, type FormData, type Transaction } from './context'

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  function handleFormSubmit(currentFormData: FormData) {
    const description = currentFormData.description.trim()
    const amount = Number(currentFormData.amount)

    if (!description || Number.isNaN(amount) || amount <= 0) {
      return false
    }

    setAllTransactions((previousTransactions) => [
      ...previousTransactions,
      {
        id: Date.now(),
        type: currentFormData.type,
        amount,
        description,
      },
    ])
    setFormData(initialFormData)

    return true
  }

  return (
    <GlobalContext.Provider
      value={{ formData, setFormData, allTransactions, setAllTransactions, handleFormSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
