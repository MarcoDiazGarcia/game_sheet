import './WarningToast.css'

import { IonToast } from '@ionic/react';

import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

addIcons({
    'warning-outline': warningOutline
});

interface WarningToastProps {
  message: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const WarningToast: React.FC<WarningToastProps> = ({ message, show, setShow }: WarningToastProps) => {
  return (
    <IonToast
      isOpen={show}
      onDidDismiss={() => setShow(false)}
      message={message}
      icon='warning-outline'
      duration={2000}
      position='top'
      color={'warning'}
    />
  );
};

export default WarningToast;