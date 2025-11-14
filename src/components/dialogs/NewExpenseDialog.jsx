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
import { newExpense } from "../../services/ExpenseService";

export const ExpenseFormDialog = ({ open, onClose, user }) => {
  const [expensesDetail, setExpenseDetail] = useState({
    date: "",
    motif: "",
    expenseItems: [],
    issueDate : ""
  });

  const [detail, setDetail] = useState({
    expenseDate: "",
    designation: "",
    amount: "",
  });

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
      
      alert("Fiche de dépense enregistrée avec succès !");
      onClose();
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
              label="Montant (MAD)"
              name="amount"
              type="number"
              value={detail.amount}
              onChange={handleItemChange}
              sx={{ flex: 1 }}
            />
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
                  <TableCell>Montant (MAD)</TableCell>
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
            Total : {expensesDetail?.totalExpenses?.toFixed(2)} MAD
          </Typography>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button onClick={()=>{
          setExpenseDetail({
             date: "",
             motif: "",
             expenseItems: [],
             issueDate : ""
          })
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
