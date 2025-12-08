const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  console.log("User Logged In....", payload);
};

export const AuthServices = {
  loginUser,
};
