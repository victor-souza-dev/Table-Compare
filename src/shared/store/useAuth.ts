import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IProfile {
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
}

type UseAuthProps = {
  access_token: string;
  isAuthenticated: boolean;
  profile: IProfile;
  login: (token: string) => void;
  logout: () => void;
  setProfile: (dataProfile: IProfile) => void;
};

const profile = {
  email: "Null",
  firstName: "Null",
  lastName: "Null",
  userId: null,
};

export const useAuth = create(
  persist<UseAuthProps>(
    (set) => ({
      profile,
      isAuthenticated: false,
      access_token: "",
      login: (token) => {
        set((state) => {
          return { ...state, access_token: token, isAuthenticated: true };
        });
      },
      logout: () => {
        set((state) => {
          sessionStorage.clear();
          return { ...state, access_token: "", isAuthenticated: false };
        });
      },
      setProfile: (dataProfile: IProfile) => {
        set((state) => {
          return { ...state, profile: dataProfile };
        });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    },
  ),
);
