import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
       	path: '/',
        name: 'Index',
        component: resolve => require.ensure([], () => resolve(require('../view/Index')), 'index')
    },
    {
       	path: '/addNotes',
        name: 'AddNotes',
        component: resolve => require.ensure([], () => resolve(require('../view/AddNotes')), 'addNotes')
    },
    {
        path: '/addNotesType',
        name: 'AddNotesType',
        component: resolve => require.ensure([], () => resolve(require('../view/addNotesType')), 'addNotesType')
    }
  ]
})
