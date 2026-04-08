import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useContext, type ChangeEvent } from 'react'
import { GlobalContext } from '../../context'

export default function TransactionForm({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) {
  const context = useContext(GlobalContext)

  if (!context) {
    return null
  }

  const { formData, setFormData, handleFormSubmit } = context

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handleTypeChange(value: 'income' | 'expense') {
    setFormData((currentFormData) => ({
      ...currentFormData,
      type: value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const didSubmit = handleFormSubmit(formData)

    if (didSubmit) {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                placeholder="Enter transaction description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleFormChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Enter transaction amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleFormChange}
              />
            </FormControl>

            <RadioGroup mt={5} value={formData.type} onChange={handleTypeChange}>
              <Radio value="income" colorScheme="blue">
                Income
              </Radio>

              <Radio ml={5} value="expense" colorScheme="red">
                Expense
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={4} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
