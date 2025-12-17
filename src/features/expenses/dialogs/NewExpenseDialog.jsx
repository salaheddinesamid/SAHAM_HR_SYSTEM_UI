import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { AddCircle, Delete } from "@mui/icons-material";
import { newExpense } from "../../../services/ExpenseService";

export const ExpenseFormDialog = ({ open, onClose, user , onSuccess}) => {
  const [expensesDetail, setExpenseDetail] = useState({
    motif: "",
    currency : "MAD",
    exchangeRate : 0,
    location : "INSIDE_MOROCCO",
    expenseItems: [],
    issueDate : ""
  });

  const [detail, setDetail] = useState({
    expenseDate: "",
    designation: "",
    amount: "",
    invoiced : false
  });

  const [selectedLocation,setSelectedLocation] = useState("INSIDE_MOROCCO");

  const locations = [
    {id : 1, label : 'Au Maroc', value : 'INSIDE_MOROCCO'},
    {id : 2, label : 'A letranger', value : 'OUTSIDE_MOROCCO'}
  ]

  const currencies = [
    { id: 1, label: 'Dirham Marocaine (MAD)' , value : 'MAD'},
    { id: 2, label: 'Dollar Américain (USD)' , value : 'USD'},
    { id: 3, label: 'Euro (EUR)' , value : 'EUR'},
    { id: 4, label: 'Livre Sterling (GBP)' , value : 'GBP'},
    { id: 5, label: 'Franc Suisse (CHF)' , value : 'CHF'},
    { id: 6, label: 'Yen Japonais (JPY)' , value : 'JPY'},
    { id: 7, label: 'Dirham Emirati (AED)' , value : 'AED'},
    { id: 8, label: 'Dollar Canadien (CAD)' },
    { id: 9, label: 'Riyal Saoudien (SAR)' },
    { id: 10, label: 'Dinar Koweïtien (KWD)' }
  ];

  const invoicedChoices = [
    {id: 1, label : 'Oui', value : true},
    {id : 2, label : 'Non', value : false}
  ]


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // This function clears the request dto after submitting
  const handleClearRequest = ()=>{
    setExpenseDetail({
      date: "",
      motif: "",
      location : "",
      currency : "",
      expenseItems: [],
      issueDate : ""
    });
  }

  const handleAddItem = () => {
    if (!detail.expenseDate || !detail.designation || !detail.amount) {
      alert("Veuillez remplir tous les champs du détail !");
      return;
    }

    const newDetails = [...expensesDetail.expenseItems, detail];
    const totalExpenses = newDetails.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    );

    setExpenseDetail((prev) => ({
      ...prev,
      expenseItems: newDetails,
      totalExpenses,
    }));

    // reset current detail
    setDetail({ expenseDate: "", designation: "", amount: "" });
  };

  const handleRemoveItem = (index) => {
    const newDetails = expensesDetail.expenseItems.filter((_, i) => i !== index);
    const totalExpenses = newDetails.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    );
    setExpenseDetail((prev) => ({
      ...prev,
      expenseItems: newDetails,
      totalExpenses,
    }));
  };

  const handleSubmit = async () => {
    const email = user?.email;
    try {
      setLoading(true);
      console.log(expensesDetail);
      
      const res = await newExpense(email,expensesDetail)
      if(res === 200){
        alert("Fiche de dépense enregistrée avec succès !");
        handleClearRequest(); // clear the request before closing
        onClose();
        onSuccess();
      }
      
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la soumission !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Nouvelle Fiche de Dépense
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <div className="space-y-3">
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <TextField
              label="Date"
              type="date"
              name="issueDate"
              value={expensesDetail.issueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <TextField
              label="Motif"
              name="motif"
              value={expensesDetail.motif}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <select
            className="styled-select"
            style={{ fontSize: "12px" }}
            name="location"
            onChange={(e)=>{
              setSelectedLocation(e.target.value)
              setExpenseDetail((prev)=>(
                {...prev, location : e.target.value}
              ))
            }}
            >
              <option value="">-- Sélectionnez La place de Motif --</option>
              {locations.map((location, i) => (
                <option key={i} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          {selectedLocation !== "" && selectedLocation === "OUTSIDE_MOROCCO" && (
            <div>
              <div>
                <select
                className="styled-select"
                style={{ fontSize: "12px" }}
                name="currency"
                onChange={handleChange}
                >
                  <option value="">-- Sélectionnez Le devise --</option>
                  {currencies.map((currency, i) => (
                    <option key={i} value={currency.value}>
                      {currency.label}
                  </option>
                ))}
                </select>
              </div>
              <div>
                <TextField
                label={`Taux d'echange`}
                name="exchangeRate"
                type="number"
                value={expensesDetail.exchangeRate}
                onChange={handleChange}
                sx={{ flex: 1 }}
                />
              </div>
            </div>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Ajouter un détail
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Date"
              type="date"
              name="expenseDate"
              value={detail.expenseDate}
              onChange={handleItemChange}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Désignation"
              name="designation"
              value={detail.designation}
              onChange={handleItemChange}
              sx={{ flex: 2 }}
            />
            <TextField
              label={`Montant`}
              name="amount"
              type="number"
              value={detail.amount}
              onChange={handleItemChange}
              sx={{ flex: 1 }}
            />
            <select
                className="styled-select"
                style={{ fontSize: "12px" }}
                name="invoiced"
                onChange={handleItemChange}
                >
                  <option value="">Facture?</option>
                  {invoicedChoices.map((choice, i) => (
                    <option key={i} value={choice.value}>
                      {choice.label}
                  </option>
                ))}
                </select>
            <IconButton color="primary" onClick={handleAddItem}>
              <AddCircle />
            </IconButton>
          </div>

          {expensesDetail.expenseItems?.length > 0 && (
            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Désignation</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expensesDetail.expenseItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.expenseDate}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography align="right" variant="subtitle1" fontWeight={600}>
            Total : {expensesDetail?.totalExpenses?.toFixed(2)} {expensesDetail?.currency}
          </Typography>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button onClick={()=>{
          setExpenseDetail({
             date: "",
             motif: "",
             location : "",
             currency : "",
             expenseItems: [],
             issueDate : ""
          });
          setSelectedLocation("");
          onClose()
        }} color="inherit" variant="outlined">
          Annuler
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Enregistrement..." : "Soumettre"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
