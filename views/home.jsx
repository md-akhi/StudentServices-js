var React = require("react");
//var DefaultLayout = require("./layouts/default");

function home(props) {
  return (
    <div>
      <div>Hello {props.name}</div>
      <ul>
        <li>
          <a href="/auth/login">ورود</a>
        </li>
        <li>
          <a href="/auth/signup">ثبت نام</a>
        </li>
        <li>
          <a href="/auth/logout">خروج</a>
        </li>
        <li>
          <a href="/dashboard">داشبورد کاربر</a>
        </li>
        <li>
          <a href="#!/admin/dashboard">داشبورد مدیریت</a>
        </li>
      </ul>
    </div>
  );
}

module.exports = home;
