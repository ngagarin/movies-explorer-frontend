import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>

      <ul className="about-project__thesis-list">
        <li className="about-project__thesis-list-item">
          <h3 className="about-project__thesis-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__thesis-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>

        <li className="about-project__thesis-list-item">
          <h3 className="about-project__thesis-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__thesis-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <ul className="about-project__timeline">
        <li className="about-project__timeline-item">
          <h4 className="about-project__timeline-interval about-project__timeline-interval_type_highlighted">1 неделя</h4>
          <p className="about-project__timeline-caption">Back-end</p>
        </li>

        <li className="about-project__timeline-item">
          <h4 className="about-project__timeline-interval">4 недели</h4>
          <p className="about-project__timeline-caption">Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;
