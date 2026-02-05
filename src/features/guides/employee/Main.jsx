import { PDFViewer } from "../components/PdfViewer"

export const EmployeeGuide = ()=>{
    return(
        <PDFViewer pdfUrl={"/pdfs/Guide_collaborateur.pdf"}/>
    )
}