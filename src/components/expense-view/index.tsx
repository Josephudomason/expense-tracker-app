import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { Transaction } from '../../context'

type ExpenseViewProps = {
  type?: 'income' | 'expense';
  data?: Transaction[];
};

export default function ExpenseView({ type = 'expense', data = [] }: ExpenseViewProps) {
  const emptyLabel = type === 'income' ? 'No income added yet.' : 'No expenses added yet.'

  return (
    <Box
      flex={1}
      minWidth="200px"
      bg={"white"}
      p={3}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"12"}
      overflow="hidden"
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Heading size="sm" color={type === 'income' ? 'green.600' : 'red.600'}>
          {type === 'income' ? 'Income' : 'Expense'}
        </Heading>
      </Flex>
      <Box overflow="auto" maxHeight="150px">
        {data.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            {emptyLabel}
          </Text>
        ) : (
          data.map((item) => (
            <Flex
              key={item.id}
              bg={type === 'expense' ? 'red.50' : 'green.50'}
              mb={2}
              justifyContent="space-between"
              alignItems="center"
              border={'1px solid'}
              borderColor={type === 'expense' ? 'red.100' : 'green.100'}
              p={2}
              borderRadius={'md'}
            >
              <Text fontSize="sm" fontWeight="bold" color="gray.600" noOfLines={1}>
                {item.description}
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={type === 'income' ? 'green.600' : 'red.600'}>
                {type === 'income' ? '+' : '-'}$ {item.amount.toFixed(2)}
              </Text>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  )
}
