import QuizzModal from '../QuizzModal';
import QuizzButton from '../QuizzButton';

interface ModalFirstThemeSelectionProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalFirstThemeSelection = ({ isActive, onClose }: ModalFirstThemeSelectionProps) => (
  <QuizzModal title="Choisissez votre premier thème" isActive={isActive} onClose={onClose} center>
    <p>
      Répondez au quizz, thème après thème, en commençant par
      <br />
      <strong>celui&nbsp;qui&nbsp;vous&nbsp;tient le&nbsp;plus&nbsp;à&nbsp;coeur.</strong>
      <br /><br />
      <small>
        Libre à vous ensuite de répondre à tous les thèmes, pour avoir plus de détails sur les points communs entre
        votre pensée politique et celle des candidats
      </small>
      <br /><br /><br />
    </p>
    <div>
      <QuizzButton onClick={onClose}>Bien compris !</QuizzButton>
    </div>
  </QuizzModal>
);

export default ModalFirstThemeSelection;
