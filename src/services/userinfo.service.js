import { ApiService } from "@/services/api.service";

export const UserinfoService = {

  SignUp: async function (params) {
    const data = await ApiService.POST('/auth/signup', params);
    return data;
  },

  SignIn: async function (params) {
    const data = await ApiService.POST('/auth/signin', params);
    return data;
  },

  SignOut: async function (params) {
    const data = await ApiService.POST('/auth/signout', params);
    return data;
  },
};
