export default [
  {
    path: '/colaboradores',
    name: 'Colaboradores',
    component: () => import(/* webpackChunkName: "clientes" */ './Colaboradores')

  }
]
