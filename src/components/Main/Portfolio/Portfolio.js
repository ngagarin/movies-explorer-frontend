import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>

      <ul className="portfolio__link-list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/ngagarin/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/ngagarin/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/ngagarin/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
