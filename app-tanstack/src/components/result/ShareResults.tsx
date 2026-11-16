import { useEffect, useState } from 'react';
import { Image as ImageIcon, Link2 } from 'lucide-react';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import { drawResultImage, type ResultImageRow } from '@app/utils/result-image';

interface ShareResultsProps {
  rows: ResultImageRow[];
  answersCount: number;
  onRequestLogin: () => void;
  onCompare: () => void;
}

const IMAGE_NAME = 'quizz-du-berger_mes-resultats.png';
const primaryButton =
  'flex-1 cursor-pointer rounded-xl bg-quizz-yellow px-4 py-3 text-base font-semibold text-quizz-dark disabled:opacity-50';
const secondaryButton =
  'flex-1 cursor-pointer rounded-xl border-2 border-quizz-dark bg-white px-4 py-3 text-base font-semibold text-quizz-dark disabled:opacity-50';

const ShareResults = ({ rows, answersCount, onRequestLogin, onCompare }: ShareResultsProps) => {
  const { user, mutate } = useUser();
  const [copyCaption, setCopyCaption] = useState('Copier');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<{ blob: Blob; url: string } | null>(null);

  const publicLink = user?.pseudo ? encodeURI(`https://www.quizz-du-berger.com/result/${user.pseudo}`) : '';
  const rowsKey = JSON.stringify(rows);

  useEffect(() => {
    if (!rows.length) return;
    let cancelled = false;
    let url = '';
    const timeout = setTimeout(async () => {
      const blob = await drawResultImage(rows, answersCount);
      if (!blob || cancelled) return;
      url = URL.createObjectURL(blob);
      setImage({ blob, url });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (url) URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsKey, answersCount]);

  // A link only works once the results are public: sharing it is the consent.
  const makePublic = async () => {
    if (user?.isPublic) return true;
    setIsLoading(true);
    const response = await API.put({ path: '/user', body: { isPublic: true } });
    setIsLoading(false);
    if (!response.ok) {
      alert(response.error);
      return false;
    }
    mutate(response.data);
    return true;
  };

  const onStopSharing = async () => {
    setIsLoading(true);
    const response = await API.put({ path: '/user', body: { isPublic: false } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    mutate(response.data);
  };

  const onCopy = async () => {
    if (!(await makePublic())) return;
    await navigator.clipboard.writeText(publicLink);
    setCopyCaption('Copié\u00a0!');
    setTimeout(() => setCopyCaption('Copier'), 2500);
  };

  const onSend = async () => {
    if (!(await makePublic())) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mes résultats au Quizz du Berger',
          text: 'Voici mes affinités politiques pour 2027. Et toi\u00a0?',
          url: publicLink,
        });
      } catch {
        // Cancelled by the user.
      }
      return;
    }
    onCopy();
  };

  const onDownload = () => {
    if (!image) return;
    const anchor = document.createElement('a');
    anchor.href = image.url;
    anchor.download = IMAGE_NAME;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const onShareImage = async () => {
    if (!image) return;
    const file = new File([image.blob], IMAGE_NAME, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: 'Mes affinités politiques pour 2027, sur quizz-du-berger.com. Et toi\u00a0?',
        });
      } catch {
        // Cancelled by the user.
      }
      return;
    }
    onDownload();
  };

  return (
    <div>
      <h2 className="mb-5 text-center font-[Merriweather] text-2xl font-bold text-quizz-dark">Partagez vos résultats</h2>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-quizz-dark">
            <Link2 size={24} />
            Votre lien
          </h3>
          {user?.pseudo ? (
            <>
              <input
                readOnly
                value={publicLink}
                onFocus={(e) => e.target.select()}
                aria-label="Lien vers vos résultats"
                className="w-full truncate rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-700"
              />
              <div className="flex gap-3">
                <button type="button" onClick={onSend} disabled={isLoading} className={primaryButton}>
                  Envoyer
                </button>
                <button type="button" onClick={onCopy} disabled={isLoading} className={secondaryButton}>
                  {copyCaption}
                </button>
              </div>
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4">
                <p className="text-sm text-gray-700">
                  Vos amis peuvent aussi se comparer à vous avec votre pseudo, dans «&nbsp;Comparer avec mes
                  amis&nbsp;»
                  {user.isPublic ? '' : ', dès que vous avez envoyé ou copié votre lien'}&nbsp;:
                </p>
                <p className="mt-2 text-center text-xl font-bold text-quizz-dark">{user.pseudo}</p>
              </div>
              {user.isPublic && (
                <p className="mt-auto text-sm text-gray-600">
                  Votre lien et votre pseudo montrent vos résultats.{' '}
                  <button
                    type="button"
                    onClick={onStopSharing}
                    disabled={isLoading}
                    className="cursor-pointer border-none bg-transparent p-0 text-sm underline"
                  >
                    Arrêter le partage
                  </button>
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-base text-gray-700">
                Pour obtenir un lien vers vos résultats, enregistrez-les d'abord : un pseudo et un mot de passe
                suffisent.
              </p>
              <button type="button" onClick={onRequestLogin} className={primaryButton + ' flex-none'}>
                Enregistrer mes résultats
              </button>
              <p className="mt-auto text-sm text-gray-600">Vos proches pourront faire le quiz et se comparer à vous.</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-quizz-dark">
            <ImageIcon size={24} />
            Votre image
          </h3>
          <div className="relative h-[200px] overflow-hidden rounded-xl border border-gray-200 bg-white">
            {image ? (
              <img src={image.url} alt="Aperçu de l'image de vos résultats" className="w-full object-cover object-top" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">Préparation de l'image...</div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onShareImage} disabled={!image} className={secondaryButton}>
              Partager
            </button>
            <button type="button" onClick={onDownload} disabled={!image} className={secondaryButton}>
              Télécharger
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 text-balance border-t border-gray-200 pt-4 text-center text-base text-gray-700">
        ▸ Vous connaissez le pseudo d'un ami&nbsp;?{' '}
        <button
          type="button"
          onClick={onCompare}
          className="cursor-pointer border-none bg-transparent p-0 text-base font-bold text-quizz-dark underline"
        >
          Comparez-vous
        </button>
      </div>
    </div>
  );
};

export default ShareResults;
