"use client";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  companyFormSchema,
  CompanyFormData,
} from "../validation/companySchema";
import { useLookupCNPJ, useCreateCompany } from "../hooks/useCompanyMutations";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

export function CompanyForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: joiResolver(companyFormSchema),
    defaultValues: {
      cnpj: "",
      razaoSocial: "",
      nomeFantasia: "",
      cep: "",
      estado: "",
      municipio: "",
      logradouro: "",
      numero: "",
      complemento: "",
    },
  });

  const lookupCnpjMutation = useLookupCNPJ();
  const createCompanyMutation = useCreateCompany();

  const handleLookupCnpj = () => {
    const cnpj = getValues("cnpj");
    if (!cnpj || cnpj.replace(/\D/g, "").length < 14) {
      toast.warn("Por favor, digite um CNPJ para buscar.");
      return;
    }

    lookupCnpjMutation.mutate(cnpj, {
      onSuccess: async (data) => {
        setValue("razaoSocial", data.razaoSocial, { shouldValidate: true });
        setValue("nomeFantasia", data.nomeFantasia, { shouldValidate: true });
        setValue("cep", data.cep, { shouldValidate: true });
        setValue("estado", data.uf, { shouldValidate: true });
        setValue("municipio", data.municipio, { shouldValidate: true });
        setValue("logradouro", data.logradouro, { shouldValidate: true });

        const numeroAsNum = parseInt(data.numero, 10);
        if (!isNaN(numeroAsNum)) {
          setValue("numero", numeroAsNum, { shouldValidate: true });
        }

        const cepLimpo = data.cep.replace(/\D/g, "");
        if (cepLimpo.length === 8) {
          try {
            const viaCepResponse = await fetch(
              `https://viacep.com.br/ws/${cepLimpo}/json/`
            );
            const viaCepData = await viaCepResponse.json();
            if (viaCepData.erro) throw new Error();

            setValue("logradouro", viaCepData.logradouro, {
              shouldValidate: true,
            });
            setValue("municipio", viaCepData.localidade, {
              shouldValidate: true,
            });
            setValue("estado", viaCepData.uf, { shouldValidate: true });
          } catch (error) {
            toast.warn("CNPJ encontrado.");
          }
        }

        toast.info("Dados do CNPJ preenchidos!");
      },
      onError: (error) => {
        toast.error(`Erro ao buscar CNPJ`);
        console.error("Erro ao buscar CNPJ:", error);
      },
    });
  };

  const onSubmit = (data: CompanyFormData) => {
    const payload = {
      ...data,
      numero: data.numero ? Number(data.numero) : undefined,
    };

    createCompanyMutation.mutate(payload);
  };

  const maskCnpj = (value: string): string => {
    if (!value) return "";

    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 2 }}
    >
      <Grid container spacing={1}>
        <Grid xs={12} sm={8} sx={{ pt: 2 }}>
          <Controller
            name="cnpj"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="CNPJ"
                required
                fullWidth
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
                disabled={lookupCnpjMutation.isPending}
                onChange={(e) => {
                  const maskedValue = maskCnpj(e.target.value);
                  field.onChange(maskedValue);
                }}
                inputProps={{ maxLength: 18 }}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={4} sx={{ pt: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLookupCnpj}
            disabled={lookupCnpjMutation.isPending}
            sx={{ height: "56px" }}
            data-cy="lookup-cnpj-button"
          >
            {lookupCnpjMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Buscar CNPJ"
            )}
          </Button>
        </Grid>
        {lookupCnpjMutation.isError && (
          <Grid xs={12}>
            <Alert severity="error">Falha ao buscar CNPJ</Alert>
          </Grid>
        )}

        <Grid xs={12} sm={6} sx={{ pt: 2 }}>
          <Controller
            name="razaoSocial"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Razão Social"
                required
                fullWidth
                error={!!errors.razaoSocial}
                helperText={errors.razaoSocial?.message}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={6} sx={{ pt: 2 }}>
          <Controller
            name="nomeFantasia"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Nome Fantasia"
                required
                fullWidth
                error={!!errors.nomeFantasia}
                helperText={errors.nomeFantasia?.message}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={4} sx={{ pt: 2 }}>
          <Controller
            name="cep"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="CEP"
                required
                fullWidth
                error={!!errors.cep}
                helperText={errors.cep?.message}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={4} sx={{ pt: 2 }}>
          <Controller
            name="estado"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Estado (UF)"
                required
                fullWidth
                error={!!errors.estado}
                helperText={errors.estado?.message}
                inputProps={{ maxLength: 2 }}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={4} sx={{ pt: 2 }}>
          <Controller
            name="municipio"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Município"
                required
                fullWidth
                error={!!errors.municipio}
                helperText={errors.municipio?.message}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={9} sx={{ pt: 2 }}>
          <Controller
            name="logradouro"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Logradouro"
                fullWidth
                error={!!errors.logradouro}
                helperText={errors.logradouro?.message}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={3} sx={{ pt: 2 }}>
          <Controller
            name="numero"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Número"
                fullWidth
                error={!!errors.numero}
                helperText={errors.numero?.message}
                type="number"
                inputProps={{
                  step: "1",
                  min: "1",
                }}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sx={{ pt: 2 }}>
          <Controller
            name="complemento"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                label="Complemento"
                fullWidth
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sx={{ pt: 2 }}>
          {createCompanyMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Falha ao cadastrar empresa
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={createCompanyMutation.isPending}
          >
            {createCompanyMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Cadastrar Empresa"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
