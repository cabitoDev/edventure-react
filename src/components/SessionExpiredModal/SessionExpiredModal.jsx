import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateToken, updateUser } from '../../redux'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

const SessionExpiredModal = () => {
  const { t } = useTranslation('edventure')
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const onPressAccept = () => {
    dispatch(updateToken(null))
    dispatch(updateUser(null))
    navigateTo('/')
  }

  return (
      <Modal
        hideCloseButton
        className='flex mr-[23px] center w-[90%]'
        isOpen={true}
        isDismissable={false}
      >
        <ModalContent>
          <ModalBody>
            <p className='text-xl p-4 text-center'>{t('SESSION_EXPIRED')}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              data-testid='ACCEPT'
              color='primary'
              onPress={onPressAccept}
            >
              {t('ACCEPT')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
export default SessionExpiredModal
