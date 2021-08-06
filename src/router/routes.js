import { routes as auth } from '../modules/auth'
import { routes as home } from '../pages/home'
import { routes as cadastro } from '../pages/cadastro'
import { routes as rdo } from '../pages/rdo'
import { routes as clientes } from '../pages/clientes'
import { routes as projetos } from '../pages/projetos'
import { routes as colaboradores } from '../pages/colaboradores'
import { routes as funcao } from '../pages/funcao'
import { routes as assinatura } from '../pages/assinatura'
import { routes as user } from '../pages/user'
import { routes as newAccess } from '../pages/newAccess'
import { routes as permissao } from '../pages/permissao'
import { routes as assinaturaEletronica } from '../pages/assinaturaEletronica'
import { routes as dashRdo } from '../pages/dashRdo'

export default [
  ...auth,
  ...home,
  ...cadastro,
  ...rdo,
  ...clientes,
  ...projetos,
  ...colaboradores,
  ...funcao,
  ...assinatura,
  ...user,
  ...newAccess,
  ...permissao,
  ...assinaturaEletronica,
  ...dashRdo
]
