import { User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export const signInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signin/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data: { user: User; token: string } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
