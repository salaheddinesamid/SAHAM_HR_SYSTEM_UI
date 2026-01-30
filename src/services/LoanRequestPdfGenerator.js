import jsPDF from "jspdf";
import sahamLogo from "../logo_bg.png";
import autoTable from "jspdf-autotable";
import { LocalDateTimeMapper } from "../utils/LocalDateTimeMapper";

const mapTitle = (type)=>{
    switch (type){
        case "NORMAL":
            return "DEMANDE DE PRET";
        case "ADVANCE":
            return "DEMANDE D'AVANCE";
        default:
            return ''
    }
}
export const LoanRequestPdfGenerator = (loanRequest) =>{
    try{
        const doc = new jsPDF();
        // set the colors:
        const primaryColor = [0, 0, 0];
        const secondaryText = [85, 85, 85];

        // Set the header with logo:
        const logoWidth = 25;
        const logoHeight = 15;

        const logoImage = new Image();
        logoImage.src = sahamLogo;
        logoImage.onload = ()=> {
            doc.addImage(logoImage, "PNG", 15, 10, logoWidth, logoHeight);
            drawPDF();
        }
        //
        const drawPDF = () =>{
            const title = mapTitle(loanRequest?.type);
            doc.setFontSize(18);
            doc.setTextColor(...primaryColor);
            doc.setFont("helvetica", "bold");
            doc.text(title, 105, 25, {align : "center"});
            // General Information:
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...secondaryText);
            doc.text(`N de Reference: ${loanRequest?.refNumber || "Indisponible"}`, 15, 35)
            doc.text(`Nom et Prénom: ${loanRequest?.employeeDetails?.employeeName}`, 15, 45);
            doc.text(`Matricule: ${loanRequest?.employeeDetails?.employeeMatriculation}`, 15, 52)
            doc.text(`Poste: ${loanRequest?.employeeDetails?.occupation}`, 15, 59)
            doc.text(`Entite: ${loanRequest?.employeeDetails?.entity}`, 15, 66)

            // Loan request details:
            const detailsColumns = ["Date", "Montant (DH)", "Motif"]
            const detailsRows = [[LocalDateTimeMapper(loanRequest?.issueDate), loanRequest?.amount, loanRequest?.motif]];

            autoTable(doc, {
                startY : 75,
                head : [detailsColumns],
                body : detailsRows,
                theme : "grid",
                styles : { fontSize : 10},
                headStyles : {
                    fillColor : [230, 230, 230],
                    textColor : [0, 0, 0],
                    halign : "center"
                },
                columnStyles : {
                    0 : {halign : "center"},
                    1 : { halign : "center" },
                    2 : { halign  : "center"}
                }
            });

            // Signature section:
            const totalY = doc.lastAutoTable.finalY + 50;
            const signatureTableColumns = ["Bénéficiaire", "Direction Ressources Humaines", "Directeur Administratif & Financier"];
            const signatureRows = [["", "", ""]];

            autoTable(doc, {
                startY : totalY,
                head : [signatureTableColumns],
                body : signatureRows,
                theme : 'grid',
                styles : { minCellHeight : 25, halign : 'center', valign : 'middle'},
                headStyles : {
                    fillColor : [240, 240, 240],
                    textColor : [0, 0, 0],
                    fontStyle : "bold"
                }
            });
            // Footer section
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(...secondaryText);
            doc.text("Saham HR System © 2025", 105, 285, { align: "center" });

            doc.save(`demande.pdf`);
        }
    }catch(err){
        console.error("❌ Error generating PDF:", err);
    }
}