import "./Projects.scss";

function Projects() {
	return (
		<div className="projects-page">
			<h1>Here are my projects?</h1>
			<div>
				<h3>This VERY website!</h3>
				<p>
					That's right. This is one of my projects! It started out as just a React frontend/Express server but I
					ended up implementing MongoDB as well to make it a full-blown, flexible MERN stack. Currently working on
					building out a full REST API for the blog and a custom CMS to manage the blog content.
				</p>
			</div>
		</div>
	);
}

export default Projects;
