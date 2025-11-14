import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";

export const Annuaire = ()=>{
    
    const [searchQuery,setSearchQuery] = useState("");


    const directory = [
        {id: 1, fullName: "BELEMLIH AMINE", occupation : "Investment Manager", supervisor : "BEN SAAD FADWA", email : "amine.belemlih@saham.com", phone : "+212 652121901", extension : 7537},
        {id: 2, fullName: "BENKIRAN CHAMA", occupation : "TAX Manager", supervisor : "EL MARZOUQI MOHAMED", email : "chama.benkirane@saham.com", phone : "+212 668112089", extension : 7538},
        {id: 3, fullName: "BENNANI REDA", occupation : "Directeur des Opérations", supervisor : "ELALAMY MOULAY M'HAMED", email : "reda.bennani@saham.com", phone : "+212 682965003", extension : 7520},
        {id: 4, fullName: "BEN SAAD FADWA", occupation : "Directrice de Cabinet du DG", supervisor : "ELALAMY MOULAY M'HAMED", email : "fadwa.bensaad@saham.com", phone : "+212 661543281", extension : 7552},
        {id: 5, fullName: "BENSOUDA RIM ", occupation : "Chief Asset Management Officer", supervisor : "ELALAMY MOULAY M'HAMED", email : "rim.bensouda@sahamfamilyoffice.com", phone : "+212 663431352", extension : 7572},
        {id: 6, fullName: "BOUAYAD MAJDA", occupation : "PMO", supervisor : "BENNANI REDA", email : "majda.bouayad@saham.com", phone : "+212 642264992", extension : 7549},
        {id: 7, fullName: "BOUIK JIHANE", occupation : "Investment Analyst", supervisor : "BENSOUDA RIM ", email : "jihane.bouik@sahamfamilyoffice.com", phone : "+212 671049678", extension : 7542},
        {id: 8, fullName: "BOUZIDI BTISSAM", occupation : "Directrice Adjointe en charge du risque du crédit", supervisor : "FADIL ABDELHALIM", email : "btissam.bouzidi@saham.com", phone : "+212 762075198", extension : 7527},
        {id: 9, fullName: "COUVREUR OLIVIER", occupation : "Investment Director", supervisor : "BENSOUDA RIM ", email : "olivier.couvreur@sahamfamilyoffice.com", phone : "+212 761511277", extension : 7529},
        {id: 10, fullName: "DOUIRI GHITA", occupation : "Strategic Project Manager", supervisor : "BEN SAAD FADWA", email : "ghita.douiri@saham.com", phone : "+212 668206990", extension : 7560},
        {id: 11, fullName: "ELALAMY MY ABDELAZIZ", occupation : "Directeur Chargé de Mission", supervisor : "ELALAMY MOULAY M'HAMED", email : "mae@saham.com", phone : "+212 661355571", extension : 7550},
        {id: 12, fullName: "ELALAMY LALLA ANISSA", occupation : "Secrétaire Général", supervisor : "ELALAMY MOULAY M'HAMED", email : "ae@saham.com", phone : "+212 661492403", extension : "-"},
        {id: 13, fullName: "EL AZRAK RABAB", occupation : "Responsable Administratif et Financier", supervisor : "EL MARZOUQI MOHAMED", email : "rabab.elazrak@saham.com", phone : "+212 667854996", extension : 7521},
        {id: 14, fullName: "EL KHIATI CYRIANE", occupation : "Directrice du Capital Humain", supervisor : "ELALAMY MOULAY M'HAMED", email : "cyriane.elkhiati@saham.com", phone : "+212 662277951", extension : 7522},
        {id: 15, fullName: "EL MARZOUQI MOHAMED", occupation : "Directeur Administratif et Financier", supervisor : "ELALAMY MOULAY M'HAMED", email : "mohamed.elmarzouqi@saham.com", phone : "+212 661492382", extension : 7526},
        {id: 16, fullName: "ERRACHDI SMAHANE", occupation : "Directeur Juridique", supervisor : "ELALAMY MOULAY M'HAMED", email : "smahane.errachdi@saham.com", phone : "+212 661489279", extension : 7564},
        {id: 17, fullName: "FADIL ABDELHALIM", occupation : "Directeur en charge de la supervision", supervisor : "ELALAMY MOULAY M'HAMED", email : "abdelhalim.fadil@saham.com", phone : "+212 661368148", extension : 7524},
        {id: 18, fullName: "HANNACH OUMAIMA", occupation : "Assistante de Direction ", supervisor : "WARGANE MYRIAM", email : "oumaima.hannach@saham.com", phone : "+212 662788419", extension : 7514},
        {id: 19, fullName: "ILEGH ZAKARIA", occupation : "Comptable Senior", supervisor : "EL AZRAK RABAB", email : "zakaria.ilegh@saham.com", phone : "+212 671818125", extension : 7536},
        {id: 20, fullName: "JULIER NICOLAS", occupation : "Directeur Suivi des Participations", supervisor : "BENNANI REDA", email : "nicolas.julier@saham.com", phone : "+212 678650625", extension : 7528},
        {id: 21, fullName: "KASSID BADR", occupation : "Strategic Project Manager", supervisor : "BENSOUDA RIM ", email : "badr.kassid@sahamfamilyoffice.com", phone : "+212 666178637", extension : 7523},
        {id: 22, fullName: "KORCHI SOUKAINA", occupation : "Juriste Senior", supervisor : "ERRACHDI SMAHANE", email : "soukaina.korchi@saham.com", phone : "+212 668325583", extension : 7546},
        {id: 23, fullName: "KOULOUH OUMAYMA", occupation : "Investment Manager", supervisor : "BENSOUDA RIM ", email : "oumayma.koulouh@sahamfamilyoffice.com", phone : "+212 661365743", extension : 7519},
        {id: 24, fullName: "MOUNBAHIJ MOHAMED", occupation : "Analyste Financier", supervisor : "BEN SAAD FADWA", email : "mohamed.mounbahij@saham.com", phone : "+212 673341384", extension : 7531},
        {id: 25, fullName: "NOKRA MERYEM", occupation : "Trésorier Senior", supervisor : "RAGHMANE MOUNA", email : "meryem.nokra@saham.com", phone : "+212 661915287", extension : 7551},
        {id: 26, fullName: "RAGHMANE MOUNA", occupation : "Directrice Financement et Trésorerie", supervisor : "EL MARZOUQI MOHAMED", email : "mouna.raghmane@saham.com", phone : "+212 662198790", extension : 7535},
        {id: 27, fullName: "SABIR WIJDANE", occupation : "HR Generalist", supervisor : "WARGANE MYRIAM", email : "wijdane.sabir@saham.com", phone : "+212 661743345", extension : 7556},
        {id: 28, fullName: "SAIDI ASMAA", occupation : "Chargé de Trésorerie", supervisor : "RAGHMANE MOUNA", email : "asmaa.saidi@saham.com", phone : "+212 678624609", extension : 7559},
        {id: 29, fullName: "SARDI YOUSSEF", occupation : "IT Manager", supervisor : "BENNANI REDA", email : "youssef.sardi@saham.com", phone : "+212 662172910", extension : 7555},
        {id: 30, fullName: "SIBAOUEIH SOUAD", occupation : "Assistante du PDG", supervisor : "ELALAMY MOULAY HAFID", email : "souad.sibaoueih@saham.com", phone : "+212 661417317", extension : 7510},
        {id: 32, fullName: "WARGANE MYRIAM", occupation : "Responsable des Ressources Humaines ", supervisor : "EL KHIATI CYRIANE", email : "myriam.wargane@saham.com", phone : "+212 661486661", extension : 7533},
        {id: 33, fullName: "YOUSSEFI NADA", occupation : "PMO", supervisor : "EL MARZOUQI MOHAMED", email : "nada.youssefi@saham.com", phone : "+212 668321096", extension : 7540},
        {id: 34, fullName: "ZEMMAMA MAMOUN ", occupation : "Senior Investment Analyst", supervisor : "BENSOUDA RIM ", email : "mamoun.zemmama@sahamfamilyoffice.com", phone : "+212 650217576", extension : 7541},
    ];

    const filteredDirectory = directory.filter((employee) => {
        const q = searchQuery.toLowerCase();
        return (
            employee.occupation?.toLowerCase().includes(q) ||
            employee.fullName?.toLowerCase().includes(q)
        )
    });

    return(
        <div className="row">
            <Typography>

            </Typography>
            <div className="row">
                <input type="text" name="" id="" className="form-control" placeholder="Rechercher un collaborateur (Nom, Prénom)" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            </div>

            <Paper style={{marginTop : "20px"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight : "bold"}}>Nom et Prénom</TableCell>
                        <TableCell style={{fontWeight : "bold"}}>Poste</TableCell>
                        <TableCell style={{fontWeight : "bold"}}>Responsable Hiérarchique</TableCell>
                        <TableCell style={{fontWeight : "bold"}}>E-mail</TableCell>
                        <TableCell style={{fontWeight : "bold"}}>Téléphone</TableCell>
                        <TableCell style={{fontWeight : "bold"}}>Extension</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredDirectory.map((e)=>(
                        <TableRow>
                            <TableCell>{e.fullName}</TableCell>
                            <TableCell>{e.occupation}</TableCell>
                            <TableCell>{e.supervisor}</TableCell>
                            <TableCell>{e.email}</TableCell>
                            <TableCell>{e.phone}</TableCell>
                            <TableCell>{e.extension}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Paper>
        </div>
    )
}