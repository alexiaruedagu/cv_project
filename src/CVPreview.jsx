import jsPDF from 'jspdf';

export function generatePDF(cvInfo) {
  if (!cvInfo || Object.keys(cvInfo).length === 0) {
    alert('CV data is not available.');
    return;
  }

  const doc = new jsPDF();
  doc.text("Curriculum Vitae", 10, 10);
  doc.text(`Name: ${cvInfo.name}`, 10, 20);
  doc.text(`Profession: ${cvInfo.profession}`, 10, 30);
  doc.text(`Email: ${cvInfo.email}`, 10, 40);
  doc.text(`Phone: ${cvInfo.phone}`, 10, 50);
  doc.text(`Ubication: ${cvInfo.ubication}`, 10, 60);

  doc.save('alexia-rueda-cv.pdf');
}
