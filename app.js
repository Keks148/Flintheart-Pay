const tg = window.Telegram.WebApp;
tg.ready();

function showClient() {
  document.getElementById('client').classList.remove('hidden');
  document.getElementById('trader').classList.add('hidden');
}

function showTrader() {
  document.getElementById('trader').classList.remove('hidden');
  document.getElementById('client').classList.add('hidden');
}
