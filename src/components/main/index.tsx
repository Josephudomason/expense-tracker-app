import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '../../context'
import ExpenseView from '../expense-view'
import Summary from '../summary'

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const context = useContext(GlobalContext)

  const transactionGroups = useMemo(() => {
    if (!context) {
      return {
        incomeTransactions: [],
        expenseTransactions: [],
        totalIncome: 0,
        totalExpense: 0,
      }
    }

    return context.allTransactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === 'income') {
          accumulator.incomeTransactions.push(transaction)
          accumulator.totalIncome += transaction.amount
        } else {
          accumulator.expenseTransactions.push(transaction)
          accumulator.totalExpense += transaction.amount
        }

        return accumulator
      },
      {
        incomeTransactions: [] as typeof context.allTransactions,
        expenseTransactions: [] as typeof context.allTransactions,
        totalIncome: 0,
        totalExpense: 0,
      },
    )
  }, [context])

  if (!context) {
    return null
  }

  const { incomeTransactions, expenseTransactions, totalIncome, totalExpense } = transactionGroups

  return (
    <Flex
      width="100%"
      height="100%"
      overflow="hidden"
      textAlign="center"
      flexDirection="column"
      p={4}
      gap={4}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Heading color="blue.400" fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}>
          Expense Tracker
        </Heading>
        <Button onClick={onOpen} bg="blue.300" color="black" size="sm">
          Add New
        </Button>
      </Flex>

      <Flex flex={1} overflow="hidden" gap={4} direction={{ base: 'column', lg: 'row' }}>
        <Box flex={1} overflow="hidden">
          <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />
        </Box>
      </Flex>

      <Flex
        flex={1}
        overflow="hidden"
        gap={4}
        direction={{ base: 'column', md: 'row' }}
      >
        <ExpenseView type="income" data={incomeTransactions} />
        <ExpenseView type="expense" data={expenseTransactions} />
      </Flex>
    </Flex>
  )
}
