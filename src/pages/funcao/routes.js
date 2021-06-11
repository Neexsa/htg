export default [
  {
    path: '/funcao',
    name: 'Funcao',
    component: () => import(/* webpackChunkName: "clientes" */ './Funcao')

  }
]
