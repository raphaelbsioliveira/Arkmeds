"use client";

import { useState, useMemo } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Alert,
  Typography,
  TextField,
} from "@mui/material";
import { useGetCompanies } from "../hooks/useCompanyData";
import { CompanyCard } from "./CompanyCard";
import { RevenueModal } from "./RevenueModal";

export function CompanyList() {
  const [selectedCnpj, setSelectedCnpj] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: companies, isLoading, isError, error } = useGetCompanies();

  const normalizeText = (text: string | undefined | null): string => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filteredCompanies = useMemo(() => {
    if (!companies) {
      return [];
    }

    const uniqueCompanies = companies.filter(
      (company, index, self) =>
        index === self.findIndex((c) => c.cnpj === company.cnpj)
    );

    if (!searchTerm) {
      return uniqueCompanies;
    }

    const normalizedSearchTerm = normalizeText(searchTerm);
    const searchTermAsDigits = searchTerm.replace(/\D/g, "");

    return uniqueCompanies.filter((company) => {
      const nomeFantasia =
        company.nome_fantasia || (company as any).nomeFantasia;
      const razaoSocial = company.razao_social || (company as any).razaoSocial;

      const normalizedName = normalizeText(nomeFantasia);
      const normalizedSocialReason = normalizeText(razaoSocial);

      const nameMatch =
        normalizedName.includes(normalizedSearchTerm) ||
        normalizedSocialReason.includes(normalizedSearchTerm);

      const companyCnpjAsDigits = company.cnpj
        ? company.cnpj.replace(/\D/g, "")
        : "";
      const cnpjMatch =
        searchTermAsDigits.length > 0 &&
        companyCnpjAsDigits.includes(searchTermAsDigits);

      return nameMatch || cnpjMatch;
    });
  }, [companies, searchTerm]);

  const handleOpenModal = (cnpj: string) => {
    setSelectedCnpj(cnpj);
  };

  const handleCloseModal = () => {
    setSelectedCnpj(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">Erro ao carregar empresas: {error.message}</Alert>
    );
  }

  return (
    <Box>
      <TextField
        label="Buscar por Nome ou CNPJ"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 6 }}
      />
      <Grid container spacing={3}>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Grid item key={company.cnpj} xs={12} sm={6} md={4}>
              <CompanyCard
                company={company}
                onClick={() => handleOpenModal(company.cnpj)}
              />
            </Grid>
          ))
        ) : (
          <Typography sx={{ m: 2 }}>Nenhuma empresa encontrada.</Typography>
        )}
      </Grid>

      <RevenueModal cnpj={selectedCnpj} onClose={handleCloseModal} />
    </Box>
  );
}
