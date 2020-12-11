<template>
  <v-container
  id="login"
  fluid
  tag="section">
<v-row>
    <v-col
    cols="12">
<v-card
    class="mx-auto"
    max-width="600"
  >
  <v-card-text>
<div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <v-alert type="error" dismissible v-if="server_error_set">
      {{server_error}}
    </v-alert>
    <v-alert type="success" dismissible v-if="server_success_set">
      {{server_success}}
    </v-alert>


    <validation-observer
    ref="observer"
    v-slot="{ invalid }"
    >
<form @submit.prevent="submit">

      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="user.email"
          :error-messages="errors"
          label="Email"
          required
        ></v-text-field>
      </validation-provider>

<!-- Password -->
      <validation-provider
        v-slot="{ errors }"
        name="password"
        rules="required|min:8|max:24"
      >
        <v-text-field
          v-model="user.password"
          :counter="24"
          :error-messages="errors"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </validation-provider>

      <v-btn
        color="primary"
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Login
      </v-btn>
      <v-btn
        color="primary"
        @click="clear">
        Clear
      </v-btn>

    </form>
    </validation-observer>
    <br>
    <p>Not a member yet? <router-link to="/user/create">Register now</router-link></p>
    </v-card-text>
</v-card>
    </v-col>
</v-row>
  </v-container>
</template>

<script>
import { AuthService } from '../../../../service'
import axioshelper from '../../../../helper/AxiosHelper'
import User from '../../../../helper/User'
export default {
    data() {
        return {
            user:{
                email:'employee1@gmail.com',
                password:'12345678',
            },
            server_error_set:false,
            server_error:'',
            server_success_set:false,
            server_success:''
        }
    },
    computed:{
        alert() {
            return this.$store.state.alert
        }
    },
    mounted(){
        console.log(process.env.MIX_VUE_APP_BASE_URL);
        if(User.loggedIn()){
            this.$router.push('/')
        }
    },
    methods: {
      async submit () {
        this.$refs.observer.validate()
        this.$store.dispatch('auth/login', this.user)
        // try {
        //     const res = await axioshelper.post('api/auth/login', this.user);
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error)
        // }

        // User.login(this.user)
      },
      clear () {
        this.user = {
                email:'',
                password:'',
            }
      },
    },
}
</script>

<style>

</style>
