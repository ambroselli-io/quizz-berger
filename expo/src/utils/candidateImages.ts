import type { ImageSourcePropType } from 'react-native';

// Map candidate slugs to their bundled images
// These images are resized to 100px from the web app's public/candidates/ folder
export const candidateImages: Record<string, ImageSourcePropType> = {
  'bernard-cazeneuve': require('../../assets/candidates/bernard-cazeneuve.png'),
  'bruno-retailleau': require('../../assets/candidates/bruno-retailleau.png'),
  'clementine-autain': require('../../assets/candidates/clementine-autain.png'),
  'david-lisnard': require('../../assets/candidates/david-lisnard.png'),
  'delphine-batho': require('../../assets/candidates/delphine-batho.png'),
  'dominique-de-villepin': require('../../assets/candidates/dominique-de-villepin.png'),
  'edouard-philippe': require('../../assets/candidates/edouard-philippe.png'),
  'eric-zemmour': require('../../assets/candidates/eric-zemmour.png'),
  'fabien-roussel': require('../../assets/candidates/fabien-roussel.png'),
  'francois-asselineau': require('../../assets/candidates/francois-asselineau.png'),
  'francois-bayrou': require('../../assets/candidates/francois-bayrou.png'),
  'francois-hollande': require('../../assets/candidates/francois-hollande.png'),
  'francois-ruffin': require('../../assets/candidates/francois-ruffin.png'),
  'gabriel-attal': require('../../assets/candidates/gabriel-attal.png'),
  'gerald-darmanin': require('../../assets/candidates/gerald-darmanin.png'),
  'jean-luc-melenchon': require('../../assets/candidates/jean-luc-melenchon.png'),
  'jerome-guedj': require('../../assets/candidates/jerome-guedj.png'),
  'juan-branco': require('../../assets/candidates/juan-branco.png'),
  'laurent-wauquiez': require('../../assets/candidates/laurent-wauquiez.png'),
  'marine-le-pen': require('../../assets/candidates/marine-le-pen.png'),
  'marine-tondelier': require('../../assets/candidates/marine-tondelier.png'),
  'nathalie-arthaud': require('../../assets/candidates/nathalie-arthaud.png'),
  'nicolas-dupont-aignan': require('../../assets/candidates/nicolas-dupont-aignan.png'),
  'patrick-sebastien': require('../../assets/candidates/patrick-sebastien.png'),
  'raphael-glucksmann': require('../../assets/candidates/raphael-glucksmann.png'),
  'xavier-bertrand': require('../../assets/candidates/xavier-bertrand.png'),
};
