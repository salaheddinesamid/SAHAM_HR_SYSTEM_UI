import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import sahamLogo from "../logo_bg.png"; 

export const ExpensePdfGenerator = (expense) => {
  try {
    const doc = new jsPDF();

    // ===== Colors =====
    const primaryColor = [0, 0, 0];
    const secondaryText = [85, 85, 85];

    // ===== Header with Logo =====
    const logoWidth = 25;
    const logoHeight = 15;

    
    const img = new Image();
    img.src = sahamLogo;
    img.onload = () => {
      doc.addImage(img, "PNG", 15, 10, logoWidth, logoHeight);
      drawPDF(); // continue once image is loaded
    };

    // Separate the rest of the PDF generation
    const drawPDF = () => {
      doc.setFontSize(18);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text("FICHE DE DÉPENSE", 105, 25, { align: "center" });

      // ===== General Info =====
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...secondaryText);
      doc.text(`Nom et Prénom: ${expense.issueBy || "—"}`, 15, 45);
      doc.text(`Date: ${expense.date || "—"}`, 15, 52);
      doc.text(`Créé le: ${new Date(expense.createdAt).toLocaleString()}`, 15, 59);
      doc.text(`Motif: ${expense.motif || "—"}`, 15, 66);

      // ===== Expense Items Table =====
      const expenseColumns = ["Date", "Désignation", "Montant (MAD)"];
      const expenseRows = expense.expenseItems.map((item) => [
        item.date,
        item.designation,
        item.amount.toLocaleString("fr-MA", {
          style: "currency",
          currency: "MAD",
        }),
      ]);

      autoTable(doc, {
        startY: 75,
        head: [expenseColumns],
        body: expenseRows,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          halign: "center",
        },
        columnStyles: {
          0: { halign: "center" },
          1: { halign: "left" },
          2: { halign: "right" },
        },
      });

      // ===== Total Section =====
      const totalY = doc.lastAutoTable.finalY + 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(
        `Total: ${expense.totalAmount.toLocaleString("fr-MA", {
          style: "currency",
          currency: "MAD",
        })}`,
        160,
        totalY
      );

      // ===== Signature Table =====
      const signatureTableColumns = ["Visa Intéressé", "Visa Trésorerie", "Visa Direction"];
      const signatureRows = [["", "", ""]];

      autoTable(doc, {
        startY: totalY + 20,
        head: [signatureTableColumns],
        body: signatureRows,
        theme: "grid",
        styles: { minCellHeight: 25, halign: "center", valign: "middle" },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
      });

      // ===== Footer =====
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...secondaryText);
      doc.text("Saham HR System © 2025", 105, 285, { align: "center" });

      // ===== Save PDF =====
      doc.save(`depense_${expense.id}.pdf`);
    };
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
  }
};
