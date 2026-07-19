document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('.btn-submit');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    status.textContent = '';
    status.removeAttribute('data-state');

    const payload = {
      fullName: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      helpNeeded: document.getElementById('help-needed').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to send your message.');
      }

      form.reset();
      status.textContent = "Message sent! I'll get back to you soon.";
      status.setAttribute('data-state', 'success');
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again or email me directly.';
      status.setAttribute('data-state', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});
