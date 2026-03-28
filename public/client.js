document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name:        document.getElementById('name').value,
    attend:      document.querySelector('input[name="attend"]:checked')?.value,
    plusone:     document.querySelector('input[name="plusone"]:checked')?.value,
    partnerName: document.getElementById('partnerName').value,
    wish:        document.getElementById('wish').value,
  };

  const res = await fetch('/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    // Show success state
    document.getElementById('rsvpForm').style.display = 'none';
    const success = document.getElementById('success');
    if (success) success.style.display = 'block';
  }
});
