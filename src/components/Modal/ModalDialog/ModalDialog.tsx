import React, { ReactNode, useEffect } from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';

import cssReset from '../../../css-reset.module.css';
import styles from './ModalDialog.module.css';

type Props = {
  title?: string;
  isOpen?: boolean;
  onEscKeyDown?: () => void;
  className?: string;
  children?: ReactNode;
};

const disableBodyScroll = (isDisabled: boolean) => {
  if (isDisabled) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'inherit';
  }
};

const ModalDialog: React.FC<Props> = ({
  title,
  isOpen = false,
  onEscKeyDown,
  className,
  children,
}: Props) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    disableBodyScroll(isOpen);
    // eslint-disable-next-line no-unused-expressions
    if (isOpen) modalRef.current?.focus();
  }, [isOpen, modalRef]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 27) {
      if (onEscKeyDown) onEscKeyDown();
    }
  };

  const overlayClassNames = classNames(cssReset.ventura, styles.overlay, className);

  return isOpen ? (
    <Portal>
      <div className={overlayClassNames} role="article">
        <article
          ref={modalRef}
          className={styles.modal}
          onKeyDown={handleKeyDown}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="presentation"
        >
          {Boolean(title) && <h1 className={styles.title}>{title}</h1>}
          {children}
        </article>
      </div>
    </Portal>
  ) : null;
};

export default ModalDialog;
