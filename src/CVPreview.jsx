import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export function CVPreview() {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    fetch("http://172.17.22.170/html/api.php?table=cv_info")
      .then((res) => res.json())
      .then((data) => setCvData(data[0]))
      .catch((err) => console.error("Error fetching CV data:", err));
  }, []);

  const generatePDF = () => {
    if (!cvData) return;

    const doc = new jsPDF();
    doc.text("Curriculum Vitae", 10, 10);
    doc.text(`Name: ${cvData.name}`, 10, 20);
    doc.text(`Profession: ${cvData.profession}`, 10, 30);
    doc.text(`Email: ${cvData.email}`, 10, 40);
    doc.text(`Phone: ${cvData.phone}`, 10, 50);
    doc.text(`Ubication: ${cvData.ubication}`, 10, 60);
    doc.save("cv-preview.pdf");
  };

  if (!cvData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold">{cvData.name}</h1>
      <p>{cvData.profession}</p>
      <p>{cvData.email}</p>
      <p>{cvData.phone}</p>
      <p>{cvData.ubication}</p>
      <button
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        onClick={generatePDF}
      >
        Download PDF
      </button>
    </div>
  );
}
