import * as React from "react";
import {Link} from "react-router-dom"

function NotFoundPage() {
  return (
    <div>
      <p>404</p>
      <p>Страница не найдена</p>
      <Link to={"/"}>На главную</Link>
    </div>
  );
}

export default NotFoundPage;