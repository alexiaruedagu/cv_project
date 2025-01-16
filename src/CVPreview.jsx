import jsPDF from "jspdf";

function generatePDF() {
  const doc = new jsPDF();
  doc.text("Curriculum Vitae", 10, 10);
  doc.save("alexia-rueda-cv.pdf");
}