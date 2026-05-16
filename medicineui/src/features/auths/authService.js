import api from "../../api/medicineAPI";

const resgister = async (userData) => {
    const response = await api.post(
     "/auth/register",
    userData
  );

  return response.data;
};

const login = async (userData) => {
  const response = await api.post(
    "/auth/login",
    userData
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "roles",
      JSON.stringify(response.data.roles)
    );
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
};

const authService = {
  resgister,
  login,
  logout,
};

export default authService;