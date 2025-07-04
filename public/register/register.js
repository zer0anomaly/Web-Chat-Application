let submit = document.getElementById('submit_button');

submit.addEventListener('click', () => {

	let email = document.getElementById('email_input').value.trim();
	let password = document.getElementById('password_password_input').value;
	let password_confirm = document.getElementById('password_confirmation_input').value

	if(!email || !password || !password_confirm){
		document.getElementById('result').textContent = "Please fill out all fields.";
		return
	}

	if (password === password_confirm){
		fetch('http://127.0.0.1:3000', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, password})
		})
		.then(response => response.json())
		.then(data => {
			if(data.message === 'Registration Successful'){
				window.location.href = '../login/login.html'
			}else{
				document.getElementById('result').textContent = "Registration Failed, " + data.message
			}
		})
		.catch(error => {
			console.error('Error:', error);
			document.getElementById('result').textContent = 'Server error'
		});
	}else {
		document.getElementById('result').textContent = "Passwords do not match."
	}

})