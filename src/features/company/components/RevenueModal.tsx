import { Modal, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useGetCompanyRevenue } from "../hooks/useCompanyData";

interface RevenueModalProps {
  cnpj: string | null;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function RevenueModal({ cnpj, onClose }: RevenueModalProps) {
  const { data, isLoading, isError, error } = useGetCompanyRevenue(cnpj);
  const isOpen = !!cnpj;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="revenue-modal-title"
      data-cy="revenue-modal"
    >
      <Box sx={style}>
        <Typography
          id="revenue-modal-title"
          variant="h6"
          color="text.primary"
          component="h2"
        >
          Rendimento da Empresa
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Erro ao buscar rendimento: {error.message}
          </Alert>
        )}

        {data && (
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              color: "text.primary",
              fontSize: {
                xs: "1.8rem",
                sm: "2.125rem",
              },
            }}
            data-cy="revenue-value"
          >
            {formatCurrency(data["valor_rendimento"])}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
