"use client";

import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { CompanyList } from "../features/company/components/CompanyList";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.125rem" },
            caretColor: "transparent",
          }}
        >
          Listagem de Empresas
        </Typography>

        <Link href="/register" passHref>
          <Button variant="contained" data-cy="register-company-button">
            Cadastrar Empresa
          </Button>
        </Link>
      </Box>
      <CompanyList />
    </Container>
  );
}
