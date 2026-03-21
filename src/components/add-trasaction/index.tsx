import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup } from "@chakra-ui/react";
import { useContext, type ChangeEvent } from "react";
import { GlobalContext, type FormData } from "../../context";



export default function TransactionForm({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) {

  const { formData, setFormData, value, setValue, handleFormSubmit } = useContext(GlobalContext)!

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleFormSubmit(formData as FormData);
  }

  return <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Enter Description</FormLabel>
            <Input
              placeholder="Enter Transaction Description"
              name="description"
              type="text"
              onChange={handleFormChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Enter Amount</FormLabel>
            <Input
              placeholder="Enter Transaction Amount"
              name="amount"
              type="number"
              onChange={handleFormChange} />
          </FormControl>

          <RadioGroup mt={'5'} value={value} onChange={setValue}>
            <Radio
              isChecked={formData.type === 'income'}
              value="income"
              name="type"
              colorScheme="blue"
              onChange={handleFormChange}>
              Income
            </Radio>

            <Radio ml={'5'}
              isChecked={formData.type === 'expense'}
              value="expense"
              name="type"
              colorScheme="red"
              onChange={handleFormChange}>
              Expense
            </Radio>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button mr={'4'} onClick={onClose}>cancel</Button>
          <Button onClick={onClose} type="submit">Add</Button>
        </ModalFooter>
      </ModalContent>
    </form>
  </Modal>


}
