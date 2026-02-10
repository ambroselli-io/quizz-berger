import { useNavigate } from 'react-router';
import QuizzModal from '../QuizzModal';
import QuizzButton from '../QuizzButton';

interface ModalAccessToResultsProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalAccessToResults = ({ isActive, onClose }: ModalAccessToResultsProps) => {
  const navigate = useNavigate();
  return (
    <QuizzModal title="Bravo !" isActive={isActive} onClose={onClose} center>
      <p>
        Vous pouvez déjà voir quel est le candidat le plus proche de vos idées avec ce thème, ou bien vous pouvez
        continuer le quizz et accéder à vos résultats plus tard.
        <br /><br />
        Pas d'inquiétude, vous pouvez de toutes façons aller et venir entre les résultats et le quizz, et changer vos
        réponses à tout moment.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <QuizzButton onClick={onClose}>Je continue</QuizzButton>
        <QuizzButton onClick={() => navigate('/result')}>Voir mes résultats</QuizzButton>
      </div>
    </QuizzModal>
  );
};

export default ModalAccessToResults;
