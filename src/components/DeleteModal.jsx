import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react'
import React from 'react'

const DeleteModal = ({ isOpen, setIsOpen, onDelete }) => {
  return (
    <Modal
      className='flex mr-[23px] center w-[90%]'
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <>
          <ModalBody>
            <p className='text-xl p-4'>
              Are you sure you want to delete this event?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              variant='light'
              onPress={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button color='danger' onPress={onDelete}>
              Delete
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  onDelete: PropTypes.func,
  setIsOpen: PropTypes.func
}
export default DeleteModal
