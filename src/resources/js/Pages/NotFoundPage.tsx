import {Link} from "react-router-dom"

function NotFoundPage() {
  return (
    <div>
      <p>404</p>
      <p>Страница не найдена</p>
      <Link to={`${process.env.REACT_APP_REPO}/`}>На главную</Link>
    </div>
  );
}

export default NotFoundPage;