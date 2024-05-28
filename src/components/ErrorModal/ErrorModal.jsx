import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateToken, updateUser } from '../../redux'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import Constants from '../../constants'
import { useLogout } from '../../hooks'

const ErrorModal = ({ error }) => {
  const { t } = useTranslation('edventure')
  const logout = useLogout()
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const onPressAccept = () => {
    if (error === Constants.ERRORS.SESSION_EXPIRED) {
      logout()
    }
    dispatch(updateError(null))
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
          <p className='text-xl p-4 text-center'>{t(error)}</p>
        </ModalBody>
        <ModalFooter>
          <Button data-testid='ACCEPT' color='primary' onPress={onPressAccept}>
            {t('ACCEPT')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ErrorModal.propTypes = {
  error: PropTypes.string
}
export default ErrorModal
