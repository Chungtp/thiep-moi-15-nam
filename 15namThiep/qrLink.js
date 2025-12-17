function generateQR(link) {
  $("#qrcode").empty();
  new QRCode(document.getElementById("qrcode"), {
    text: link,
    width: 140,
    height: 140,
  });
}
