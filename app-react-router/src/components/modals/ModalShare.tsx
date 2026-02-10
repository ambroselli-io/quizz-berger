import { useState, useMemo } from 'react';
import useUser from '@app/hooks/useUser';
import API from '@app/services/api';
import QuizzModal from '../QuizzModal';
import QuizzButton from '../QuizzButton';

interface ModalShareProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalShare = ({ isActive, onClose }: ModalShareProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, mutate } = useUser();
  const [copyButtonCaption, setCopyButtonCaption] = useState('Copier le lien');
  const showPublicMessage = useMemo(() => !!user?.isPublic, [user?.isPublic]);

  const onEnablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: '/user', body: { isPublic: true } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    mutate(response.data);
  };

  const onDisablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: '/user', body: { isPublic: false } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    mutate(response.data);
    onClose();
  };

  const publicLink = encodeURI(`https://www.quizz-du-berger.com/result/${user?.pseudo}`);

  const onCopy = async () => {
    await navigator.clipboard.writeText(publicLink);
    setCopyButtonCaption('Copié !');
    await new Promise((res) => setTimeout(res, 2500));
    setCopyButtonCaption('Copier le lien');
  };

  return (
    <QuizzModal center isActive={isActive} onClose={onClose} title="Partagez vos résultats">
      {!showPublicMessage ? (
        <>
          <span className="mb-6 w-4/5">En cliquant sur le bouton ci-dessous:</span>
          <ul className="mb-6 w-4/5 list-inside">
            <li>
              Vos amis pourront se comparer à vous en cliquant sur le bouton
              <b> Se&nbsp;comparer&nbsp;à&nbsp;mes&nbsp;amis</b> et en ajoutant votre pseudo{' '}
              <b>{user?.pseudo}</b>
            </li>
            <br />
            <li>nous vous fournirons un lien qui permettra à vos amis de voir vos résultats</li>
          </ul>
          <QuizzButton onClick={onEnablePublicLink} disabled={isLoading}>
            {isLoading ? 'Chargement...' : "J'ai compris, afficher le lien"}
          </QuizzButton>
        </>
      ) : (
        <>
          <span className="mb-6 w-4/5">Vous pouvez partager vos résultats avec vos amis en leur donnant ce lien:</span>
          <a href={publicLink} target="_blank" rel="noreferrer" className="mb-6 text-center underline">
            {publicLink}
          </a>
          <QuizzButton onClick={onCopy}>{copyButtonCaption}</QuizzButton>
          <button
            onClick={onDisablePublicLink}
            disabled={isLoading}
            className="mt-2.5 cursor-pointer border-none bg-transparent text-xs underline"
          >
            Arrêter le partage
          </button>
        </>
      )}
    </QuizzModal>
  );
};

export default ModalShare;
