import Link from "next/link";

const Home = () => (
	<div className="admin-navigation">
		<div className="admin-navigation__mobile">
			<p className="admin-navigation__logo">
				АВТОЕЛЕКТРИК <span className="admin-navigation__logo_green">VAG GROUP</span>
			</p>
			<button type="button" className="admin-navigation__burger-menu">
				<span />
			</button>
		</div>
		<sidebar className="admin-navigation__sidebar">
			<p className="admin-navigation__logo">
				АВТОЕЛЕКТРИК <span className="admin-navigation__logo_green">VAG GROUP</span>
			</p>
			<ul className="admin-navigation__links" />
			<Link href="/" passHref>
				<a href="replace">Головна</a>
			</Link>
		</sidebar>
	</div>
);

export default Home;
