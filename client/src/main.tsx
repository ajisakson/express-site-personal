import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import App from "./App";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";

const rootElement = document.getElementById("root");
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Home />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	rootElement
);
