import apiClient from "@/lib/axios";
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserInfo,
} from "@/types/api";

export const loginUser = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await apiClient.post<ApiResponse<TokenResponse>>(
    "/api/v1/auth/login",
    data,
  );
  return response.data.data;
};

export const registerUser = async (
  data: RegisterRequest,
): Promise<UserInfo> => {
  const response = await apiClient.post<ApiResponse<UserInfo>>(
    "/api/v1/auth/register",
    data,
  );
  return response.data.data;
};

export const getMe = async (): Promise<UserInfo> => {
  const response =
    await apiClient.get<ApiResponse<UserInfo>>("/api/v1/auth/me");
  return response.data.data;
};
