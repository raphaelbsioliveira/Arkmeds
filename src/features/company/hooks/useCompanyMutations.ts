import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { lookupCNPJ, createCompany } from "../services/companyService";
import { CreateCompanyPayload } from "../types";
import { toast } from "react-toastify";

export const useLookupCNPJ = () => {
  return useMutation({
    mutationFn: (cnpj: string) => lookupCNPJ(cnpj),
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateCompanyPayload) => createCompany(data),

    onSuccess: () => {
      toast.success("Empresa cadastrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      router.push("/");
    },

    onError: (error: any) => {
      toast.error(`Falha ao cadastrar empresa`);
      console.log("Erro ao criar empresa:", error);
    },
  });
};
