const STORAGE_KEY = "EVENT_INVITE";

function getQuery() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

function renderInvite(data) {
  document.getElementById('formBox').style.display = 'none';
  document.getElementById('inviteBox').style.display = 'block';

  document.getElementById('iName').innerText = data.name;
  document.getElementById('iPhone').innerText = data.phone;
  document.getElementById('iGuests').innerText = data.guests;

 // generateQR(data.link);
}

$(document).ready(function () {
  $('#submitBtn').on('click', function () {
    const name = $('#name').val().trim();
    const phone = $('#phone').val().trim();
    const guests = $('#guests').val();

    if (!name || !phone) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const params = new URLSearchParams({ name, phone, guests }).toString();
    const link = window.location.origin + window.location.pathname + '?' + params;

    const data = { name, phone, guests, link };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    renderInvite(data);
  });

  

  $('#saveImg').on('click', function () {
    html2canvas(document.getElementById('inviteContent')).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'thiep-moi.png';
      a.click();
    });
  });

  $('#savePdf').on('click', function () {
    html2canvas(document.getElementById('inviteContent')).then(canvas => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
      pdf.save('thiep-moi.pdf');
    });
  });
});
