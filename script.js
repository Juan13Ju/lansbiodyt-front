// Get form elements
const nameInput = document.getElementById('name');
const dobInput = document.getElementById('dob');
const emailInput = document.getElementById('email');
const saveBtn = document.getElementById('saveBtn');

// Event listener for the Save button
saveBtn.addEventListener('click', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = parseInt(urlParams.get('id'));
  
  const name = nameInput.value.trim();
  const dob = dobInput.value;
  const email = emailInput.value.trim();

  // Validate input fields
  if (!name || !dob || !email) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Prepare the payload for the POST request
  const payload = {
    name: name,
    date_of_birth: dob,
    email: email
  };

  try {
    const response = await fetch(`http://localhost:8000/patients/${boardId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Datos guardados de manera exitosa');
    } else {
      const error = await response.json();
      alert(`Error: ${error.detail || 'Algo salió mal'}, intenta de nuevo`);
    }
  } catch (error) {
    console.error('Error enviando request:', error);
    alert('Hubo un error, por favor intenta de nuevo.');
  }
});
