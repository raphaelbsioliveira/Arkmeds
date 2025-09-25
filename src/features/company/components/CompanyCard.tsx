import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { Company } from "../types";

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  return (
    <CardActionArea
      component="article"
      onClick={onClick}
      data-cy={`company-card-${company.cnpj.replace(/\D/g, "")}`}
    >
      <Card sx={{ display: "flex", minHeight: 160 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            backgroundColor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          <BusinessIcon fontSize="large" />
        </Box>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {(company as any).nomeFantasia ||
              company.nome_fantasia ||
              company.razao_social}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {company.cnpj}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.municipio} - {company.estado}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
