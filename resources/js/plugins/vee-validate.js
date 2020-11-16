import Vue from 'vue'
import {
  extend,
  localize,
  configure,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  email,
  max,
  min,
  numeric,
  required,
} from 'vee-validate/dist/rules'

localize({
    en: {
        messages: {
            required: 'this field is required',
            min: 'this field must have no less than {length} characters',
            max: (_, { length }) => `this field must have no more than ${length} characters`
          }
    },
})

configure({
    validity: true
  })

extend('email', email)
extend('max', max)
extend('min', min)
extend('numeric', numeric)
extend('required', required)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
