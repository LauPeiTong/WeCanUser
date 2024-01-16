<template lang="pug">
.register-page.text-center.mx-auto
  v-card.pa-1.rounded-xl.background3(outlined)
    v-card.pa-1.rounded-xl.background2(outlined)
      v-card.pa-5.rounded-xl.background(outlined width="300")
        v-img.welcome-image.mx-auto(:src="logoPath" width="150")
        h2.pt-6 Register
        p Already have account?
          |
          nuxt-link(to="login").pa-1 Login here
        v-text-field(
          label="Username"
          placeholder="David"
          v-model="username"
          filled
          rounded
          dense
        )
        v-text-field(
          label="Email"
          placeholder="example1@gmail.com"
          v-model="email"
          filled
          rounded
          dense
        )
        v-text-field(
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="password"
          label="Password"
          hint="At least 8 characters"
          v-model="password"
          :error-messages="passwordErrorMessages"
          filled
          rounded
          dense
          @click:append="show = !show"
        )
        v-text-field(
          :append-icon="confirmShow ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.confirmPassword]"
          :type="confirmShow ? 'text' : 'password'"
          name="confirmPassword"
          label="Confirm Password"
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrorMessages"
          filled
          rounded
          dense
          @click:append="confirmShow = !confirmShow"
        )
        v-text-field(
          label="Address"
          placeholder="Petaling Jaya"
          v-model="address"
          filled
          rounded
          dense
        )
        v-btn(
          @click="register"
          depressed
          rounded
          color="primary"
        ) Sign Up
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  components: {
  },
  layout: 'welcome',
  data () {
    return {
      logoPath: require('../assets/user/login.png'),
      show: false,
      confirmShow: false,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      address: null,
      passwordErrorMessages: [],
      confirmPasswordErrorMessages: [],
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters',
        confirmPassword: v => v === this.password || 'Passwords do not match'
      }
    }
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getAuthUser'
    })
  },
  methods: {
    ...mapActions({
      addTokenToAxiosHeader: 'auth/addTokenToAxiosHeader',
      setAuthUser: 'auth/setAuthUser',
      storeTokenInLocalStorage: 'auth/storeTokenInLocalStorage'
    }),
    async register () {
      // Clear previous error messages
      this.passwordErrorMessages = []

      try {
        const response = await this.$axios.post('/api/users/register/', {
          username: this.username,
          email: this.email,
          password: this.confirmPassword,
          role: 'C',
          address: this.address
        })

        const user = {
          id: response.data.id,
          token: response.data.token,
          username: response.data.username,
          email: response.data.customer_data.email,
          phone: '',
          address: response.data.customer_data.address,
          points: 0,
          imageUrl: ''
        }

        this.addTokenToAxiosHeader(user.token)

        this.setAuthUser(user)
        this.storeTokenInLocalStorage(user.token)

        console.log('Register successful', user)
        this.$router.push({ path: '/home' })
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          // If the server responds with error messages
          this.confirmPasswordErrorMessages.push(...error.response.data.errors.password)
        } else {
          // Generic error message for other errors
          this.confirmPasswordErrorMessages.push('Register failed. Please try again.')
        }
      }
    }
  }
}
</script>

<style scoped>
:deep(.scroll) {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100% !important;
}

:deep(.v-input__slot) {
  background-color: rgba(250, 175, 8, 0.2) !important;
}

.background{
  background-color: #FFFAF0;
  border: solid 4px white;
}

.background2{
  background-color: #FFF4DE;
  border: solid 4px white;
}

.background3{
  background-color: #FFF1D2;
  border: solid 4px white;
}

:deep(input:-internal-autofill-selected) {
  background-color: red !important;
}

</style>
