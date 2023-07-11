import './AboutMe.css';
import avatar from '../../../images/aboutMe/aboutMe.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">О себе</h2>
      <div className="about-me__wrapper">
        <img className="about-me__image" src={avatar} alt="Моя фотография" />
        <div className="about-me__info">
          <h3 className="about-me__name">Николай Гагарин</h3>
          <p className="about-me__profession">Веб-разработчик, 32 года</p>
          <p className="about-me__description">
            Здесь&nbsp;будет отображаться какой-то текст, может краткая биография.
          </p>
          <ul className="about-me__link-list">
            <li><a className="about-me__link" href="https://github.com/ngagarin" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
