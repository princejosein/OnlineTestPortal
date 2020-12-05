<template>
  <v-container
  id="create-user"
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
        name="name"
        rules="required|max:64"
      >
        <v-text-field
          v-model="user.name"
          :counter="64"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
<!-- Email -->
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|max:128|email"
      >
        <v-text-field
          v-model="user.email"
          :counter="128"
          :error-messages="errors"
          label="Email"
          required
        ></v-text-field>
      </validation-provider>
<!-- Password -->
      <validation-provider
        v-slot="{ errors }"
        name="Password"
        rules="required|min:8|max:24"
        vid="p_confirmation"
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

      <!-- Confirm Password -->
      <validation-provider
        v-slot="{ errors }"
        name="Confirm Password"
        rules="required|confirmed:p_confirmation"
      >
        <v-text-field
          v-model="user.confirm_password"
          :error-messages="errors"
          label="Confirm Password"
          required
          type="password"
        ></v-text-field>
      </validation-provider>

      <!-- Occupation -->

        <v-text-field
          v-model="user.occupation"
          label="Occupation"
        ></v-text-field>

<!-- Phone -->

        <v-text-field
          v-model="user.phone"
          label="Phone"
        ></v-text-field>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
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
                name: '',
                email:'',
                password:'12345678',
                confirm_password:'12345678',
                occupation:'',
                phone:''
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
            const response = await axios.post('api/auth/register', this.user);
            this.server_success_set = true;
            this.server_success = "User Created successfully"
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
                name: '',
                email:'',
                password:'',
                confirm_password:'',
                occupation:'',
                phone:''
            }
      },
    },
}
</script>

<style>

</style>
