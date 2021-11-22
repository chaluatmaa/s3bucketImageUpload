const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const file = imageInput.files[0];

	// get a secure URL from Server
	const { url } = await fetch("http://localhost:8080/s3Url")
		.then((res) => res.json())
		.catch((e) => console.log(e));
	console.log(url);

	// post image directly to s3 bucket

	await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: file,
	});

	const imageUrl = url.split("?")[0];
	console.log(imageUrl);

	// post request to my server to store any extra data
});
