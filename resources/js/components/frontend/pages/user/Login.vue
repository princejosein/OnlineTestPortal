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
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Login
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </form>
    </validation-observer>
    </v-card-text>
</v-card>
    </v-col>
</v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            user:{
                email:'',
                password:''
            },
            server_error_set:false,
            server_error:'',
            server_success_set:false,
            server_success:''
        }
    },
    methods: {
      async submit () {
        this.server_success_set = false;
        this.server_error_set = false;
        this.$refs.observer.validate()
        try {
            const response = await axios.post('api/auth/login', this.user);
            this.server_success_set = true;
            this.server_success = "User login successfully"
        } catch (error) {
            this.server_error_set = true;
            this.server_error = error.response.statusText
            console.log(error.response.data.errors)
           if(error.response.status == 422 && typeof error.response.data == "object" && error.response.data)
            {
                this.$refs.observer.setErrors(error.response.data.errors);
                this.server_error = 'Validation Error'
            }
        }
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
