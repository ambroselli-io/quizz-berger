import LoginContainer from '../LoginContainer';
import QuizzModal from '../QuizzModal';

interface ModalLoginProps {
  isActive: boolean;
  onClose: () => void;
  title?: string;
}

const ModalLogin = ({ isActive, onClose, title = 'Inscription' }: ModalLoginProps) => (
  <QuizzModal title={title} isActive={isActive} onClose={onClose}>
    <LoginContainer showSignup forceSignup onSuccess={onClose} />
  </QuizzModal>
);

export default ModalLogin;
