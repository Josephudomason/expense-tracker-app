import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import ExpenseView from "../expense-view";
import Summary from "../summary";
import { useContext, useEffect, useMemo } from "react";
import { GlobalContext, type Transaction } from "../../context";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { totalExpense, allTransactions, setTotalExpense, totalIncome, setTotalIncome } = context;

  const { incomeTransactions, expenseTransactions } = useMemo(() => {
    const incomeTransactions = allTransactions.filter((t: Transaction) => t.type === 'income');
    const expenseTransactions = allTransactions.filter((t: Transaction) => t.type === 'expense');
    return { incomeTransactions, expenseTransactions };
  }, [allTransactions]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransactions.forEach((item: Transaction) => {
      if (item.type === 'income') {
        income += parseFloat(item.amount);
      } else {
        expense += parseFloat(item.amount);
      }
    });

    setTotalExpense(expense);
    setTotalIncome(income);
  }, [allTransactions, setTotalExpense, setTotalIncome]);

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
        <Heading color="blue.400" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
          Expense Tracker
        </Heading>
        <Button onClick={onOpen} bg="blue.300" color="black" size="sm">
          Add New
        </Button>
      </Flex>

      <Flex flex={1} overflow="hidden" gap={4} direction={{ base: "column", lg: "row" }}>
        <Box flex={1} overflow="hidden">
          <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />
        </Box>
      </Flex>

      <Flex
        flex={1}
        overflow="hidden"
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        <ExpenseView type="income" data={incomeTransactions} />
        <ExpenseView type="expense" data={expenseTransactions} />
      </Flex>
    </Flex>
  );
}
