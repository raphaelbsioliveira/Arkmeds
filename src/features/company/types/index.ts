export interface Company {
  razao_social: string;
  nome_fantasia: string;
  estado: string;
  municipio: string;
  cnpj: string;
}

export interface CompanyRevenue {
  "valor_rendimento": number;
}

export interface CNPJData {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  logradouro: string;
  numero: string;
  complemento: string;
  municipio: string;
  uf: string;
  cep: string;
}

export interface CreateCompanyPayload {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cep: string;
  estado: string;
  municipio: string;
  logradouro?: string;
  numero?: number;
  complemento?: string;
}
