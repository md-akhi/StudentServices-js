import React from "react";

export default (props) => {
	const { name: dataName = "", title: dataTitle = "" } = props;
	return (
		<div>
			<div>
				Hello {dataName}+{dataTitle}
			</div>
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
					<a href="/users">کاربران</a>
				</li>
				<li>
					<a href="/projects">پروژه‌ها</a>
				</li>
				<li>
					<a href="/dashboard/admin">داشبورد مدیریت</a>
				</li>
			</ul>
		</div>
	);
};
