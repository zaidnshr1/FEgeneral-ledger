export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type ApiVoidResponse = Omit<ApiResponse<object | null>, "data"> & {
  data?: object | null;
};

export type PageableObject = {
  unpaged: boolean;
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  offset: number;
  sort: SortObject;
};

export type SortObject = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type Page<T> = {
  totalElements: number;
  totalPages: number;
  pageable: PageableObject;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  empty: boolean;
};

// Auth Types

export type LoginRequest = {
  username: string;
  password?: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password?: string;
  fullName: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: string;
  username: string;
  role: "ADMIN_PUSAT" | "ADMIN_PROJECT";
  issuedAt: string;
};

export type UserInfo = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN_PUSAT" | "ADMIN_PROJECT";
  active: boolean;
  createdAt: string;
};

// User Types

export type CreateUserRequest = RegisterRequest;

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN_PUSAT" | "ADMIN_PROJECT";
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

// Project Types

export type CreateProjectRequest = {
  projectCode: string;
  projectName: string;
  description?: string;
  budget: number;
  adminProjectId: string;
};

export type UpdateProjectRequest = {
  projectName?: string;
  description?: string;
  budget?: number;
};

export type AssignAdminRequest = {
  userId: string;
};

export type ProjectResponse = {
  id: string;
  projectCode: string;
  projectName: string;
  description: string;
  budget: number;
  active: boolean;
  admins: UserResponse[];
  createdAt: string;
  updatedAt: string;
};

// Account (COA) Types

export type AccountType =
  | "ASET"
  | "LIABILITAS"
  | "EKUITAS"
  | "PENDAPATAN"
  | "BEBAN";
export type NormalBalance = "DEBIT" | "KREDIT";

export type CreateAccountRequest = {
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  normalBalance: NormalBalance;
  projectId?: string;
};

export type AccountResponse = {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  normalBalance: NormalBalance;
  projectId: string | null;
  active: boolean;
};

// Journal Types

export type JournalStatus = "DRAFT" | "POSTED" | "VOID";

export type JournalLineRequest = {
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  description?: string;
};

export type CreateJournalRequest = {
  projectId: string;
  entryDate: string;
  description: string;
  referenceNumber?: string;
  lines: JournalLineRequest[];
};

export type UpdateJournalRequest = {
  entryDate?: string;
  description?: string;
  referenceNumber?: string;
  lines?: JournalLineRequest[];
};

export type VoidJournalRequest = {
  reason: string;
};

export type JournalLineResponse = {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debitAmount: number;
  creditAmount: number;
  description: string;
  lineOrder: number;
};

export type JournalEntryResponse = {
  id: string;
  entryNumber: string;
  projectId: string;
  entryDate: string;
  description: string;
  referenceNumber: string;
  status: JournalStatus;
  totalDebit: number;
  totalCredit: number;
  lines: JournalLineResponse[];
  createdById: string;
  createdByUsername: string;
  createdAt: string;
  updatedAt: string;
};

// Report & Audit Types

export type BudgetSummaryResponse = {
  projectId: string;
  projectName: string;
  totalBudget: number;
  totalExpense: number;
  totalRevenue: number;
  remainingBudget: number;
  isBudgetExceeded: boolean;
};

export type TrialBalanceRow = {
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  debitBalance: number;
  creditBalance: number;
};

export type TrialBalanceResponse = {
  projectId: string;
  projectName: string;
  rows: TrialBalanceRow[];
  totalDebit: number;
  totalCredit: number;
};

export type ProfitLossResponse = {
  projectId: string;
  projectName: string;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
};

export type AuditLogResponse = {
  id: string;
  userId: string | null;
  username: string;
  projectId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: string | null;
  newValue: string | null;
  ipAddress: string;
  createdAt: string;
};
