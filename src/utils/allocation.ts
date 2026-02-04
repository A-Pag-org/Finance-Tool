import type { Donor, Employee } from "../types";

const REFERENCE_DATE = new Date(Date.UTC(2025, 0, 1));

const getTenureMonths = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  return Math.max(
    0,
    (REFERENCE_DATE.getUTCFullYear() - date.getUTCFullYear()) * 12 +
      (REFERENCE_DATE.getUTCMonth() - date.getUTCMonth())
  );
};

const getAllocationScore = (employee: Employee) => {
  const tenureMonths = getTenureMonths(employee.joiningDate);
  const tenureBoost = 1 + (Math.min(tenureMonths, 48) / 48) * 0.2;

  return employee.monthlySalary * tenureBoost;
};

export const buildDonorAllocationMap = (
  donor: Donor,
  employees: Employee[]
) => {
  const programScoreTotals = donor.preferences.reduce<Record<string, number>>(
    (acc, preference) => {
      const team = employees.filter(
        (employee) => employee.programId === preference.programId
      );
      const totalScore = team.reduce(
        (sum, employee) => sum + getAllocationScore(employee),
        0
      );
      acc[preference.programId] = totalScore || 1;
      return acc;
    },
    {}
  );

  const allocationMap = new Map<string, number>();
  employees.forEach((employee) => {
    const preference = donor.preferences.find(
      (item) => item.programId === employee.programId
    );
    if (!preference) {
      return;
    }

    const totalScore = programScoreTotals[employee.programId] ?? 1;
    const allocationPercent =
      preference.weight * (getAllocationScore(employee) / totalScore);
    allocationMap.set(employee.id, allocationPercent);
  });

  return allocationMap;
};
