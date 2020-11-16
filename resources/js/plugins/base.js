import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponents = require.context(
    '../components/base',true, /\.vue$/,
)

console.log('here in base');

requireComponents.keys().forEach(fileName => {
    const componentConfig = requireComponents(fileName)

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      )

    Vue.component(`Base${componentName}`, componentConfig.default || componentConfig)
});
