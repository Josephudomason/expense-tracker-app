import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: number
  type: TransactionType
  amount: number
  description: string
}

export type FormData = {
  type: TransactionType
  amount: string
  description: string
}

export type GlobalContextValue = {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
  allTransactions: Transaction[]
  setAllTransactions: Dispatch<SetStateAction<Transaction[]>>
  handleFormSubmit: (currentFormData: FormData) => boolean
}

export const initialFormData: FormData = {
  type: 'income',
  amount: '',
  description: '',
}

export const GlobalContext = createContext<GlobalContextValue | null>(null)
