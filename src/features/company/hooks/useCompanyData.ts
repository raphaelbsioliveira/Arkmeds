import { useQuery } from "@tanstack/react-query";
import { getCompanies, getCompanyRevenue } from "../services/companyService";

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};

export const useGetCompanyRevenue = (cnpj: string | null) => {
  return useQuery({
    queryKey: ["companyRevenue", cnpj],
    queryFn: () => getCompanyRevenue(cnpj!),
    enabled: !!cnpj,
  });
};
