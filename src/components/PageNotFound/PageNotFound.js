import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page-404">
      <div className="page-404__container">
        <h1 className="page-404__title">404</h1>
        <p className="page-404__text">Страница не найдена</p>
        <button onClick={() => navigate(-1)} className="page-404__link">Назад</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
