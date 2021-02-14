// W G Y T A P I
const app = require("express")(); // install express
const fsextra = require("fs-extra"); // install fsextra
const request = require("request"); // install request
const version = "2.0-WEB"; // set version
	function scratchApiUser(user) {
		// setup scratch user api
		fsextra.ensureFile(`${__dirname}/jeffalo/${user}.json`).catch((err) => {console.error(err);}); // ensure jeffalo data file
		fsextra.ensureFile(`${__dirname}/lefty/${user}.json`).catch((err) => {console.error(err);}); // ensure lefty data file
		jeffaloapi = `https://my-ocular.jeffalo.net/api/user/${user}`; // jeffalo data url endpoint
		leftymainapi = `https://scratchdb.lefty.one/v2/user/info/${user}/`; // lefty data url endpoint
		request(jeffaloapi, { json: true }, (error, res, body) => {
			if (error) {
				return console.log(error);
			}
			if (!error && res.statusCode == 200) {
				fsextra.writeJson(
					`${__dirname}/jeffalo/${user}.json`,
					{ color: body.color, status: body.status, name: body.name },
					(err) => {
						if (err) return console.error(err);
					}
				);
			}
		}); // jeffalo data goes to jeffalo data file
		request(leftymainapi, { json: true }, (error, res, body) => {
			if (error) {
				return console.log(error);
			}
			if (!error && res.statusCode == 200) {
				fsextra.writeJson(
					`${__dirname}/lefty/${user}.json`,
					{
						username: body.username,
						id: body.id,
						joined: body.joined,
						followers: body.followers,
						following: body.following,
						country: body.country,
						bio: body.bio,
						work: body.work,
						type: body.status,
					},
					(err) => {
						if (err) return console.error(err);
					}
				);
			}
		}); // lefty data goes to lefty data file
		jeffalo = fsextra.readJsonSync(`${__dirname}/jeffalo/${user}.json`)
		lefty = fsextra.readJsonSync(`${__dirname}/lefty/${user}.json`)
		var result = Object.assign(jeffalo, lefty)
		return result
	}
	app.all("/", (req, res) => {
		res
			.status(200)
			.json({
				path: "/",
				description: "Hi there! This is WGYTAPI",
				docs: "/docs",
				version: version
			});
	});
	app.all("/about", function (req, res) {
		res
			.status(200)
			.json({
				path: "/about",
				description: "Hi there!",
				version: version
			});
	});
	app.all("/docs", function (req, res) {
		res.redirect(301, "https://documentation.wgyt.tk/apiwgyttk");
	});
	app.all("/scratch", (req, res) => {
		res
			.status(200)
			.json({
				path: "/scratch",
				description: "Hi there! This is the Scratch API",
				docs: "/docs",
				version: version
			});
	});
	app.all("/scratch/user", function (req, res) {
		data = scratchApiUser(req.query.username);
		res
			.status(200)
			.json({
				path: "/scratch/user",
				description: "Hi there! This is the Scratch User API",
				data: data,
				docs: "/docs",
				version: version
			});
	});
app.listen(3000, () => {}); // listen on port 3000
