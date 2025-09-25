"use client";

import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CompanyForm } from "@/features/company/components/CompanyForm";

export default function RegisterPage() {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Voltar para Listagem
      </Button>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.125rem" },
          caretColor: "transparent",
          mb: 4,
        }}
      >
        Cadastro de Nova Empresa
      </Typography>

      <CompanyForm />
    </Container>
  );
}
