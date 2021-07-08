export default [
  {
    path: '/newAccess',
    name: 'NewAccess',
    component: () => import(/* webpackChunkName: "newAccess" */ './NewAccess')

  }
]
