export default [
  {
    path: '/funcao',
    name: 'Funcao',
    component: () => import(/* webpackChunkName: "funcao" */ './Funcao')

  }
]
