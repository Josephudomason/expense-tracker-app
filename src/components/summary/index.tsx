import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionForm from "../add-trasaction";
import TransactionChartSummary from "../chart";


type SummaryProps = {
  onClose: () => void;
  isOpen: boolean;
  totalExpense: number;
  totalIncome: number;
};

export default function Summary({ onClose, isOpen, totalExpense, totalIncome }: SummaryProps) {
  const balance = totalIncome - totalExpense;
  const balanceColor = balance >= 0 ? "green.600" : "red.600";

  return (
    <Box
      height="100%"
      p={4}
      border={'1px solid'}
      borderColor={'gray.100'}
      borderRadius={'10'}
      background={'white'}
    >
      <Flex
        height="100%"
        direction={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Flex
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          gap={2}
        >
          <Heading size="md" color={balanceColor}>
            Balance: ${balance}
          </Heading>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            bg="gray.50"
            width="100%"
            p={3}
            border="1px solid"
            borderColor="gray.100"
            borderRadius="md"
          >
            <Flex direction="column" alignItems="center">
              <Heading color="green.600" size="sm">${totalIncome}</Heading>
              <Text color="gray.600" fontSize="xs">Income</Text>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Heading color="red.600" size="sm">${totalExpense}</Heading>
              <Text color="gray.600" fontSize="xs">Expense</Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          flex={1}
          width="200px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TransactionChartSummary expense={totalExpense} income={totalIncome} />
        </Box>
      </Flex>
      <TransactionForm onClose={onClose} isOpen={isOpen} />
    </Box>
  )
}
