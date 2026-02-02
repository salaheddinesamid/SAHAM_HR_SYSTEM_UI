import { useEffect, useState } from "react";
import { getPayrollsOverview } from "../../services/PayrollService";
import { generateYears } from "./utils/YearsGeneratror";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { mapToMonth } from "./utils/MonthMapper";
import { Download } from "@mui/icons-material";

export const EmployeePayrolls = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [payrolls, setPayrolls] = useState([]);

  const years = generateYears(2010, 2026);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const res = await getPayrollsOverview(selectedYear);
      setPayrolls(res?.details || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, [selectedYear]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          size="small"
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : payrolls.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography color="text.secondary">
            Aucun Bulletin de paie trouvé pour {selectedYear}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {payrolls.map((payroll) => (
            <Grid item xs={12} sm={6} md={4} key={payroll.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 }
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {mapToMonth(payroll.month)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Payroll document
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Download />}
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
