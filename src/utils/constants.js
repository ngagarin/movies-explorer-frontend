// общие для кино
const SHORT_MOVIE = 40;
const INPUT_SEARCH_TEXT_MSG = 'Введите поисковый запрос';
const MOVIES_LIST_ERROR_MSG = 'При получении списка фильмов что-то пошло не так';
const MOVIES_SAVED_LIST_ERROR_MSG = 'При получении списка сохраненных фильмов что-то пошло не так';
const MOVIE_ADD_ERROR_MSG = 'При сохранении фильма что-то пошло не так';
const MOVIE_DELETE_ERROR_MSG = 'При удалении фильма что-то пошло не так';

// фильмы
const HAVE_NO_MOVIE_MSG = 'У вас нет сохраненных фильмов. Подберите что-нибудь интересное на странице Фильмы';
const SEARCH_MOVIE_ERROR_MSG = 'Среди фильмов нет ни одного соответствующего вашему запросу';

// короткометражки
const HAVE_NO_SHORTMOVIE_MSG = 'У вас нет сохраненных короткометражек. Подберите что-нибудь интересное на странице Фильмы';
const SEARCH_SHORTMOVIE_ERROR_MSG = 'Среди короткометражек нет соответствующих вашему запросу';

// InfoTooltip
const PROFILE_UPDATED_MSG = 'Профиль успешно обновлён!';
const SOMETHING_WENT_WRONG_MSG = 'Что-то пошло не так! Попробуйте еще раз';
const REQUEST_ERROR_MSG = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз';

function getGreetingMessage(name) {
  const currentHour = new Date().getHours();
  let greeting = '';

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Доброе утро';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Добрый день';
  } else if (currentHour >= 18 && currentHour < 24) {
    greeting = 'Добрый вечер';
  } else {
    greeting = 'Доброй ночи';
  }

  return `${greeting}, ${name}!`;
}

export {
  SHORT_MOVIE,
  INPUT_SEARCH_TEXT_MSG,
  MOVIES_LIST_ERROR_MSG,
  MOVIES_SAVED_LIST_ERROR_MSG,
  MOVIE_ADD_ERROR_MSG,
  MOVIE_DELETE_ERROR_MSG,
  HAVE_NO_MOVIE_MSG,
  SEARCH_MOVIE_ERROR_MSG,
  HAVE_NO_SHORTMOVIE_MSG,
  SEARCH_SHORTMOVIE_ERROR_MSG,
  PROFILE_UPDATED_MSG,
  SOMETHING_WENT_WRONG_MSG,
  REQUEST_ERROR_MSG,
  getGreetingMessage,
}
