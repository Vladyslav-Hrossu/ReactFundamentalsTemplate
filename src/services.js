export const createUser = async (data) => {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Network Error');
	}
};

export const login = async (data) => {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	console.log(response.ok);

	if (!response.ok) {
		throw new Error('Network Error');
	}

	return await response.json();
};

export const getCourses = async () => {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	console.log(response.ok);

	if (!response.ok) {
		throw new Error('Network Error');
	}

	return await response.json();
};

export const getAuthors = async () => {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	console.log(response.ok);

	if (!response.ok) {
		throw new Error('Network Error');
	}

	return await response.json();
};
