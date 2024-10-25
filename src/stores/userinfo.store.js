import { ref } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '@/services/api.service';
import { UserinfoService } from '@/services/userinfo.service';
import { useI18n } from "vue-i18n";

export const userinfoStore = defineStore('userinfo', () => {
  const { t } = useI18n();
  const access_token = ref(sessionStorage.getItem('accessToken'));
  const csrf_token = ref('');
  const instance_id = ref('')
  const username = ref(t("userinfo.anonymouse"));
  const access_iat = ref(null);

  const init = () => {
    if (access_token.value) {
      updateAccessdata(access_token.value);
      ApiService.setHeader(access_token.value);
    }
  }

  const reset = () => {
    access_token.value = '';
    csrf_token.value = '';
    instance_id.value = '';
    username.value = t("userinfo.anonymouse");
    access_iat.value = null;
  }

  const updateAccessdata = (token) => {
    const payload = jwtDecode(token);
    access_token.value = token;
    instance_id.value = payload.instance_id;
    username.value = payload.username;
    access_iat.value = new Date(payload.exp * 1000);
  }

  const setAccessToken = (token) => {
    updateAccessdata(token);
    sessionStorage.setItem('accessToken', token);
    ApiService.setAccessToken(token);
  }

  const setCSRFToken = (token) => {
    csrf_token.value = token;
    ApiService.setCRSFHeader(token);
  }

  const resetStore = () => {
    access_token.value = undefined;
    instance_id.value = '';
    username.value = t("userinfo.anonymouse");
    access_iat.value = null;
    sessionStorage.clear();
  }

  const signUp = async (username, email, password) => {
    const SignUp = UserinfoService.SignUp({
      username: username,
      email: email,
      password: password
    });
    return SignUp;
  }

  const signIn = async (email, password) => {
    const token = await UserinfoService.SignIn({
      email: email,
      password: password
    });
    setAccessToken(token);
    return true;
  }

  const signOut = async () => {
    await UserinfoService.SignOut({});
    resetStore();
  }

  return {
    access_token,
    csrf_token,
    instance_id,
    access_iat,
    username,
    init,
    reset,
    setAccessToken,
    setCSRFToken,
    resetStore,
    signUp,
    signIn,
    signOut
  };
});
