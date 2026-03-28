document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name:        document.getElementById('name').value,
    attend:      document.querySelector('input[name="attend"]:checked')?.value,
    plusone:     document.querySelector('input[name="plusone"]:checked')?.value,
    partnerName: document.getElementById('partnerName').value,
    wish:        document.getElementById('wish').value,
  };

  await fetch('https://твой-сервер.railway.app/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  // дальше показываешь success как раньше
});
