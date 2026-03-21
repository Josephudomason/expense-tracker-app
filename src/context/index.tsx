import { createContext, useState, type ReactNode } from "react";


export type Transaction = {
  id: number;
  type: 'income' | 'expense';
  amount: string;
  description: string;
};

export type FormData = {
  type: 'income' | 'expense';
  amount: number | string;
  description: string;
};

export const GlobalContext = createContext<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  totalExpense: number;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  totalIncome: number;
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
  allTransactions: Transaction[];
  setAllTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  handleFormSubmit: (currentFormData: FormData) => void;
} | null>(null);



export default function GlobalContextState({ children }: { children: ReactNode }) {

  const [formData, setFormData] = useState<FormData>({
    type: 'income',
    amount: '',
    description: '',
  });

  const [value, setValue] = useState('expense')
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])


  function handleFormSubmit(currentFormData: FormData) {
    console.log(currentFormData);

    if (!currentFormData.description || !currentFormData.amount) return;

    setAllTransactions([...allTransactions, {
      ...currentFormData,
      amount: String(currentFormData.amount),
      id: Date.now()
    }])
  }

  console.log(allTransactions)


  return <GlobalContext.Provider value={{ formData, setFormData, value, setValue, totalExpense, setTotalExpense, totalIncome, setTotalIncome, allTransactions, setAllTransactions, handleFormSubmit }}>
    {children}
  </GlobalContext.Provider>
}

