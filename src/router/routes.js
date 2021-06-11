import { routes as auth } from '../modules/auth'
import { routes as home } from '../pages/home'
import { routes as cadastro } from '../pages/cadastro'
import { routes as rdo } from '../pages/rdo'
import { routes as clientes } from '../pages/clientes'
import { routes as projetos } from '../pages/projetos'
import { routes as colaboradores } from '../pages/colaboradores'
import { routes as funcao } from '../pages/funcao'

export default [
  ...auth,
  ...home,
  ...cadastro,
  ...rdo,
  ...clientes,
  ...projetos,
  ...colaboradores,
  ...funcao
]
