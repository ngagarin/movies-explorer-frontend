import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import "../Popups/Popups.css";

function InfoTooltip({ authStatus, isOpen, onClose }) {
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("root_type_hidden");
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleOutsideClick);

      const autoCloseTimer = setTimeout(() => {
        onClose();
      }, 1500);

      setIsAnimationStopped(false);
      setAnimationKey((prevKey) => prevKey + 1);

      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.removeEventListener("mousedown", handleOutsideClick);
        clearTimeout(autoCloseTimer);
      };
    } else {
      document.body.classList.remove("root_type_hidden");
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isOpen, onClose]);

  return (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <figure className="popup__infoTooltip-container">
        <Lottie
          key={animationKey}
          isStopped={isAnimationStopped}
          className="popup__icon"
          animationData={authStatus.image}
          loop={false}
          autoplay
        />
        <figcaption className="popup__icon-caption">{authStatus.message}</figcaption>
      </figure>
    </section>
  );
}

export default InfoTooltip;
