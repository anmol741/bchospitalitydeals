import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function captureElementAsPDF(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  const canvas = await html2canvas(element, {
    backgroundColor: "#0D0D0D",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width / 2, canvas.height / 2],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
  pdf.save(filename);
}

export async function captureMultipleAsPDF(
  elementIds: string[],
  filename: string
): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < elementIds.length; i++) {
    const element = document.getElementById(elementIds[i]);
    if (!element) continue;

    const canvas = await html2canvas(element, {
      backgroundColor: "#0D0D0D",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height / canvas.width) * imgWidth;

    if (i > 0) pdf.addPage();

    let y = 0;
    while (y < imgHeight) {
      if (y > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        -y,
        imgWidth,
        imgHeight
      );
      y += pageHeight;
    }
  }

  pdf.save(filename);
}

export function generateSignedNDAPDF(data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  date: string;
  signatureDataURL: string;
}): void {
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
  const margin = 60;
  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = margin;

  // Header
  pdf.setFillColor(13, 13, 13);
  pdf.rect(0, 0, pageWidth, 800, "F");

  pdf.setTextColor(201, 168, 76);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("BC HOSPITALITY DEALS", pageWidth / 2, y, { align: "center" });

  y += 24;
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.text("NON-DISCLOSURE AGREEMENT", pageWidth / 2, y, { align: "center" });

  y += 40;
  pdf.setDrawColor(201, 168, 76);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 20;

  // Body text
  pdf.setFontSize(10);
  pdf.setTextColor(200, 200, 200);
  pdf.setFont("helvetica", "normal");

  const bodyText = `This Non-Disclosure Agreement ("Agreement") is entered into on ${data.date} by and between BC Hospitality Deals / CJ Kalra, Century 21 Coastal Realty Ltd. ("Disclosing Party") and the undersigned party ("Receiving Party").

CONFIDENTIAL INFORMATION: The Receiving Party agrees to keep confidential all information regarding the business opportunities, financial data, operational details, and any other proprietary information disclosed by the Disclosing Party in connection with the potential purchase of any hospitality or restaurant business listed by BC Hospitality Deals.

NON-DISCLOSURE: The Receiving Party agrees not to disclose, copy, or use any Confidential Information for any purpose other than evaluating the potential acquisition of a listed business.

NON-CIRCUMVENTION: The Receiving Party agrees not to contact sellers, landlords, suppliers, or employees of the listed businesses directly without written consent from the Disclosing Party.

TERM: This Agreement shall remain in effect for a period of two (2) years from the date of signing.

GOVERNING LAW: This Agreement shall be governed by the laws of British Columbia, Canada.`;

  const lines = pdf.splitTextToSize(bodyText, pageWidth - margin * 2);
  pdf.text(lines, margin, y);
  y += lines.length * 14 + 30;

  // Signatory details
  pdf.setTextColor(201, 168, 76);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("SIGNED BY:", margin, y);
  y += 20;

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(`Full Name: ${data.name}`, margin, y); y += 16;
  pdf.text(`Email: ${data.email}`, margin, y); y += 16;
  pdf.text(`Phone: ${data.phone}`, margin, y); y += 16;
  pdf.text(`City/Province: ${data.city}`, margin, y); y += 16;
  pdf.text(`Date: ${data.date}`, margin, y); y += 30;

  // Signature
  pdf.setTextColor(201, 168, 76);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("SIGNATURE:", margin, y); y += 14;

  if (data.signatureDataURL) {
    pdf.addImage(data.signatureDataURL, "PNG", margin, y, 200, 60);
    y += 70;
  }

  pdf.setDrawColor(201, 168, 76);
  pdf.line(margin, y, margin + 200, y);
  y += 10;
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Authorized Signature", margin, y);

  // Footer
  const footerY = pdf.internal.pageSize.getHeight() - 40;
  pdf.setDrawColor(42, 42, 42);
  pdf.line(margin, footerY, pageWidth - margin, footerY);
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    "Century 21 Coastal Realty Ltd. · Unit #105 - 7928 128 St, Surrey, BC V3W 4E8 · 778-896-9552 · cj.kalra@century21.ca",
    pageWidth / 2,
    footerY + 16,
    { align: "center" }
  );

  pdf.save(`NDA_Signed_${data.name.replace(/\s+/g, "_")}.pdf`);
}
