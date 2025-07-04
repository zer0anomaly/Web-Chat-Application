let submit = document.getElementById('submit_button');

submit.addEventListener('click', () => {
	event.preventDefault();
	let email = document.getElementById('email_input').value;
	let password = document.getElementById('password_input').value;

	fetch('http://localhost:3000/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username, password})
	})
	.then(response => response.json())
	.then(data => {
		if(data.message === 'Login successful'){
			window.location.href = '../main/main.html'
		}else {
			document.getElementById('result').textContent = 'Login failed: ' + data.message;
		}
	})
	.catch(error => {
		console.error('Error:', error);
		document.getElementById('result').textContent = 'Server error'
	})
})