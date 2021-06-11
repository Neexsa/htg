export default [
  {
    path: '/projetos',
    name: 'Projetos',
    component: () => import(/* webpackChunkName: "clientes" */ './Projetos')

  }
]
