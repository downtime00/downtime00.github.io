<template>
  <div>
    <v-dialog v-model="enableDialog" max-width="600" @click:outside="resetForm">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          :text="UserName"
          variant="tonal"
          v-bind="activatorProps"
          @click="clickDialog"
        ></v-btn>
      </template>
      <v-card :loading="loading">
        <v-tabs v-model="tabType">
          <template v-for="(data, index) in tabList" :key="index">
            <v-tab :value="index" :disabled="data.disabled">
              {{ data.tab }}
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-window v-model="tabType">
          <!-- 로그인 탭 -->
          <v-tabs-window-item>
            <v-card-text>
              <form @submit.prevent="SignIn">
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="signIn_email"
                      :label="t('userinfo.email')"
                      type="email"
                      :rules="[rules.required, rules.email]"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="signIn_password"
                      :label="t('userinfo.password')"
                      type="password"
                      autoComplete="true"
                      @keyup.enter="SignIn"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :text="t('close')"
                    variant="plain"
                    @click="resetForm"
                  ></v-btn>
                  <v-btn
                    color="primary"
                    :text="t('userinfo.signIn')"
                    variant="tonal"
                    type="submit"
                  ></v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-tabs-window-item>
          <!-- 회원가입 탭 -->
          <v-tabs-window-item>
            <v-card-text>
              <form @submit.prevent="SignUp">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="signUp_username"
                      :hint="t('userinfo.signup.hit')"
                      :label="t('userinfo.username')"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="signUp_email"
                      :label="t('userinfo.email')"
                      :rules="[rules.required, rules.email]"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="signUp_password"
                      :label="t('userinfo.password')"
                      :rules="[rules.required, rules.password]"
                      type="password"
                      autoComplete="true"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="signUp_confirm_password"
                      :label="t('userinfo.confirm_password')"
                      type="password"
                      autoComplete="true"
                      :rules="[rules.required, rules.passwordsMatch]"
                      @keyup.enter="SignUp"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <small class="text-caption text-medium-emphasis">
                  {{ t("userinfo.signup.indicates_required_field") }}
                </small>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :text="t('close')"
                    variant="plain"
                    @click="resetForm"
                  ></v-btn>
                  <v-btn
                    color="primary"
                    :text="t('save')"
                    variant="tonal"
                    type="submit"
                  >
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-tabs-window-item>
          <!-- 회원정보 수정-->
          <v-tabs-window-item>
            <v-card-text>
              <form @submit.prevent="UserEdit">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="signUp_username"
                      :hint="t('userinfo.signup.hit')"
                      :label="t('userinfo.username')"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="signUp_password"
                      :label="t('userinfo.password')"
                      :rules="[rules.required, rules.password]"
                      type="password"
                      autoComplete="true"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="signUp_confirm_password"
                      :label="t('userinfo.confirm_password')"
                      type="password"
                      autoComplete="true"
                      :rules="[rules.required, rules.passwordsMatch]"
                      @keyup.enter="UserEdit"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :text="t('userinfo.signOut')"
                    variant="plain"
                    @click="SignOut"
                  ></v-btn>
                  <v-btn
                    :text="t('close')"
                    variant="plain"
                    @click="resetForm"
                  ></v-btn>
                  <v-btn
                    color="primary"
                    :text="t('edit')"
                    variant="tonal"
                    type="submit"
                  ></v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { ApiService } from "@/services/api.service";
import { userinfoStore } from "@/stores/userinfo.store";

const { t } = useI18n();
const enableDialog = ref(false);
const userStore = userinfoStore();
const UserName = computed(() => userStore.username);
const tabList = computed(() => [
  { tab: t("userinfo.signIn"), disabled: false },
  { tab: t("userinfo.signUp"), disabled: false },
  { tab: t("userinfo.info"), disabled: false },
]);

const tabType = ref(0);
const loading = ref(false);
const logined = ref(false);

//tabType == 0
const signIn_email = ref("test@mail.com");
const signIn_password = ref("test");
//tabType == 1
const signUp_username = ref("");
const signUp_email = ref("");
const signUp_password = ref("");
const signUp_confirm_password = ref("");
//tabType == 3

onMounted(() => {
  console.log(userStore.access_token);
  checkLogin();
});

const checkLogin = () => {
  if (userStore.access_token == undefined) {
    tabList.value[0].disabled = false;
    tabList.value[1].disabled = false;
    tabList.value[2].disabled = true;
    tabType.value = 0;
    signUp_username.value = "";
  } else {
    tabList.value[0].disabled = true;
    tabList.value[1].disabled = true;
    tabList.value[2].disabled = false;
    tabType.value = 2;
    signUp_username.value = userStore.username;
  }
};

const rules = {
  required: (value) => !!value || t("userinfo.required"),
  email: (value) => {
    const pattern = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;
    return pattern.test(value) || t("userinfo.emailinvalid");
  },
  password: (value) => {
    return (
      (value && value.length > 5) || t("userinfo.signup.min_length", { min: 6 })
    );
  },
  passwordsMatch: (value) => {
    return (
      value === signUp_password.value || t("userinfo.signup.passwords_match")
    );
  },
};

const clickDialog = () => {
  checkLogin();
};

const SignOut = async () => {
  resetForm();
  await userStore.signOut();
};

const SignIn = async () => {
  if (!signIn_email.value && !signIn_password.value) {
    return;
  }
  loading.value = true;
  await userStore
    .signIn(signIn_email.value, signIn_password.value)
    .then(() => {
      logined.value = true;
    })
    .finally(() => {
      enableDialog.value = false;
      loading.value = false;
    });
};

const SignUp = async () => {
  if (!signUp_username.value && !signUp_email.value && !signUp_password.value) {
    return;
  }

  await userStore.signUp(
    signUp_username.value,
    signIn_email.value,
    signIn_password.value
  );
};

const UserEdit = async () => {
  if (!signIn_email.value && !signIn_password.value) {
    return;
  }
  loading.value = true;
  await userStore
    .signIn(signIn_email.value, signIn_password.value)
    .then(() => {
      logined.value = true;
    })
    .finally(() => {
      enableDialog.value = false;
      loading.value = false;
    });
};

const resetForm = () => {
  enableDialog.value = false;
  signIn_email.value = null;
  signIn_password.value = null;
  signUp_username.value = userStore.username;
  signUp_email.value = null;
  signUp_password.value = null;
  signUp_confirm_password.value = null;
  loading.value = false;
};
</script>
<style scoped>
.fill-height {
  min-height: 100vh;
  color: #4e4a91;
}
.red-input .v-input__control {
  border: 1px solid red; /* 빨간색 테두리 */
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 0.5s ease;
}
</style>
