export type GeographyRegion =
  | "Delhi NCR"
  | "UP - Prayagraj"
  | "UP - Banaras"
  | "UP - Lucknow"
  | "Bihar - Gaya"
  | "Bihar - Muzaffarpur";

export type DonorType = "International" | "India" | "CSR" | "HNI";

export type DonorPreference = {
  programId: string;
  weight: number;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  monthlyCost: number;
  geography: GeographyRegion;
  photoUrl: string;
};

export type Donor = {
  id: string;
  name: string;
  type: DonorType;
  contributionAmount: number;
  preferences: DonorPreference[];
};

export type Program = {
  id: string;
  name: string;
  description: string;
  geography: GeographyRegion;
};
