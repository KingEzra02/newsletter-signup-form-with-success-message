document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const signupCard = document.getElementById('signup-card');
  const successCard = document.getElementById('success-card');
  const successEmail = document.getElementById('success-email');
  const dismissBtn = document.getElementById('dismiss-btn');

  // Validating the email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handling the form submission
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
   
    emailInput.classList.remove('error');
    emailError.style.display = 'none';
    
    // Validate email
    if (!email) {
      emailError.textContent = 'Email is required';
      emailError.style.display = 'block';
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }
    
    if (!isValidEmail(email)) {
      emailError.textContent = 'Valid email required';
      emailError.style.display = 'block';
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }
    try {
     
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        successEmail.textContent = email;
        signupCard.style.display = 'none';
        successCard.style.display = 'block';
        console.log('Server response:', data);
      } else {
        emailError.textContent = data.message || 'Subscription failed';
        emailError.style.display = 'block';
        emailInput.classList.add('error');
      }
    } catch (error) {
      console.error('Error:', error);
      emailError.textContent = 'Network error - please try again';
      emailError.style.display = 'block';
      emailInput.classList.add('error');
    }
  });

  dismissBtn.addEventListener('click', () => {

    console.log('Dismiss button clicked'); 
    console.log('Success card:', successCard); 
    console.log('Signup card:', signupCard); 

    successCard.style.display = 'none';
    signupCard.style.display = 'flex';
    emailInput.value = '';
    emailInput.focus();
  });
});