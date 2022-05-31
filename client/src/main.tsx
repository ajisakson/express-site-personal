import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import App from "./App";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Dashboard from "./Pages/Dashboard";

const rootElement = document.getElementById("root");
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Home />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	rootElement
);
