import {
  Company,
  CompanyRevenue,
  CreateCompanyPayload,
  CNPJData,
} from "../types";

const ARKMEDS_API_URL = process.env.NEXT_PUBLIC_ARKMEDS_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const CNPJ_LOOKUP_API_URL = process.env.NEXT_PUBLIC_CNPJ_LOOKUP_API_URL;
const CNPJ_API_KEY = process.env.NEXT_PUBLIC_CNPJ_API_KEY;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Erro ${response.status}: ${response.statusText} - ${
        errorData.message || "Erro na requisição"
      }`
    );
  }
  const text = await response.text();

  return text ? JSON.parse(text) : null;
};

export const getCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${ARKMEDS_API_URL}/companies/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return handleResponse(response);
};

export const getCompanyRevenue = async (
  cnpj: string
): Promise<CompanyRevenue> => {
  const formattedCnpj = cnpj.replace(/\D/g, "");

  const response = await fetch(
    `${ARKMEDS_API_URL}/companies/cnpj/${formattedCnpj}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return handleResponse(response);
};

export const lookupCNPJ = async (cnpj: string): Promise<CNPJData> => {
  if (!CNPJ_LOOKUP_API_URL || !CNPJ_API_KEY) {
    throw new Error("URL ou chave da API de CNPJ não estão definidas");
  }

  const formattedCnpj = cnpj.replace(/\D/g, "");

  const response = await fetch(CNPJ_LOOKUP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ cnpj: formattedCnpj }),
  });

  return handleResponse(response);
};

export const createCompany = async (
  data: CreateCompanyPayload
): Promise<any> => {
  const response = await fetch(`${ARKMEDS_API_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};
