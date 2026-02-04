import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import sahamLogo from "../logo_bg.png"; 
import { LocalDateTimeMapper } from "../utils/LocalDateTimeMapper";

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
      const title = `FICHE DE DÉPENSE ${expense?.location === "INSIDE_MOROCCO" ? "(AU MAROC)" : "(À L'ÉTRANGER)"}`
      doc.setFontSize(18);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text(title, 105, 25, { align: "center" });

      // ===== General Info =====
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...secondaryText);
      doc.text(`Nom et Prénom: ${expense.issueBy || "—"}`, 15, 45);
      doc.text(`Créé le: ${new Date(expense.createdAt).toLocaleString()}`, 15, 52);
      doc.text(`Devise: ${expense.currency}`, 15, 59);
      doc.text(`Motif: ${expense.motif || "—"}`, 15, 66);

      // ===== Expense Items Table =====
      doc.setFont("helvetica", "bold");
      doc.text("DETAIL DE DEPENSE", 105, 70, {align : "center"});
      const expenseColumns = ["Date", "Désignation", "Montant", "Facture"];
      const expenseRows = expense.expenseItems.map((item) => [
        LocalDateTimeMapper(item?.date),
        item.designation,
        expense.totalAmount.toLocaleString("fr-MA", {
          style: "currency",
          currency: expense.currency,
        }),
        item.invoiced === true ? "Oui" : "Non"
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
          currency: expense.currency,
        })}`,
        150,
        totalY
      );

      // ===== Signature Table =====
      const signatureTableColumns = ["Visa Intéressé", "Visa Direction", "Visa Trésorerie"];
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
