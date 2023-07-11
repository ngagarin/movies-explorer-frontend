import './Promo.css';
import bgrImg from '../../../images/main/main.svg';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__bgr-img" src={bgrImg} alt="Фоновое изображение"/>
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб‑разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href="#about-project">Узнать больше</a>
      </div>
    </section>
  );
};

export default Promo;
