import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DeleteModal = ({ isOpen, setIsOpen, onDelete }) => {
  const { t } = useTranslation('edventure')

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
            <p className='text-xl p-4'>{t('DELETE_MODAL_TEXT')}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              variant='light'
              onPress={() => setIsOpen(false)}
            >
              {t('CANCEL')}
            </Button>
            <Button color='danger' onPress={onDelete}>
              {t('DELETE')}
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
