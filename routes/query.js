exports.cql = {
    Clientes: `
        MATCH (c:Cliente)
        WHERE toUpper(c.nome) CONTAINS toUpper($nomePesquisa)
        OPTIONAL MATCH (c)<-[:PROJETO_DA]-(p:Projeto)
        WITH count(p) as quantidade, c
        RETURN collect({cliente: c{.*}, quantidadeProjetos: toFloat(quantidade)})
    `,

    NovoClientes:`
        MERGE (c:Cliente {nome: $novoNomeCliente})
        SET c.ativo = true
    `,

    VerificarProjetos: `
        WITH $nomeCliente as pNomeCliente
        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WHERE c.nome = pNomeCliente AND p.ativo = true AND p.pausado = false
        RETURN collect(p.nome)
    `,

    DeleteCliente: `
        WITH $nomeCliente as pNomeCliente
        MATCH (c:Cliente)
        WHERE c.nome = pNomeCliente
        DETACH DELETE c
    `,

    AlterarStatusCliente: `
        WITH $nomeCliente as pNomeCliente, $status as pStatus
        MATCH (c:Cliente)
        WHERE c.nome = pNomeCliente
        SET c.ativo = pStatus
    `,

    NovoProjeto: `
        WITH $novoNomeProjeto AS pNovoNome, $dataInicio AS pDataInicio, $nomeCliente AS pNomeCliente
        MERGE (:Projeto {nome: pNovoNome, dataInicio: pDataInicio, ativo: true, pausado: false})
        WITH pNovoNome, pDataInicio, pNomeCliente
        MATCH (c:Cliente), (p:Projeto)
        WHERE c.nome = pNomeCliente AND p.nome = pNovoNome AND p.dataInicio = pDataInicio
        CREATE (c)<-[:PROJETO_DA]-(p)
    `,

    Projetos: `
        WITH $nomeCliente AS pNomeCliente, 
        coalesce($dataInicio, -30599326412000) AS pDataInicio,
        coalesce($textoPesquisar, '') AS pTextoPesquisa

        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WHERE c.nome = pNomeCliente AND p.dataInicio >= pDataInicio AND p.nome CONTAINS pTextoPesquisa
        RETURN collect(p{.*, dataInicioInter: toFloat(p.dataInicio)}) as projetos
    `,

    VerificarCliente: `
        MATCH (c:Cliente)   
        WHERE c.nome = $nomeCliente AND c.ativo = false
        RETURN collect(c.nome)
    `,

    PausarProjeto: `
        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WHERE c.nome = $nomeCliente AND p.nome = $nomeProjeto
        SET p.pausado = $status
    `,

    Rdos: `
        WITH coalesce($dataInicio, -30599326412000) AS pDataInicio,
        $textoPesquisar AS pTextoPesquisar,
        $nomeCliente AS pNomeCliente,
        $nomeProjetos AS pNomeProjetos
        MATCH (r:RDO)
        WHERE r.dataInicio >= pDataInicio 
        AND toUpper(r.cliente) CONTAINS toUpper(pNomeCliente) 
        AND toUpper(r.projeto) CONTAINS toUpper(pNomeProjetos)
        OPTIONAL MATCH (r)<-[:ATIVIDADE_DA]-(a:Atividades)
        WITH r, collect(a{.*}) as atividades
        OPTIONAL MATCH (r)<-[:EFETIVO_DA]-(e:Efetivos)
        WITH r, atividades, collect(e{.*}) as efetivos
        ORDER BY r.id_rdo DESC
        RETURN collect({rdo: r{.*}, atividade: atividades, efetivos: efetivos})
    `,

    NovoRdo: `
        WITH $nomeCliente AS pNomeCliente,
            $nomeProjetos AS pNomeProjetos,
            $dateInicio AS pDateInicio,
            $idRDO AS pIdRDO,
            $areaAtuacao AS pAreaAtuacao,
            $cartaChamada AS pCartaChamada,
            $nomeFiscal AS pNomeFiscal,
            $nomeEncarregado AS pNomeEncarregado,
            $condicaoManha AS pCondicaoManha,
            $condicaoTarde AS pCondicaoTarde,
            $condicaoNoite AS pCondicaoNoite,
            $prazoAtividade AS pPrazoAtividade,
            $diasDecorridos AS pDiasDecorridos,
            $prorrogacao AS pProrrogacao,
            $diasRestantes AS pDiasRestantes,
            $diasDeAtrazos AS pDiasDeAtrazos,
            $opcoesDDS AS pOpcoesDDS,
            $opcoesPrejuizo AS pOpcoesPrejuizo,
            $opcoesViolacao AS pOpcoesViolacao,
            $opcoesOciosidade AS pOpcoesOciosidade,
            $servico AS pServico,
            $inicioReal AS pInicioReal,
            $terminoReal AS pTerminoReal,
            $inicioPrevisto AS pInicioPrevisto,
            $terminoPrevisto AS pTerminoPrevisto,
            $comentarios AS pComentarios

        MERGE (r:RDO {
            cliente: pNomeCliente,
            projeto: pNomeProjetos,
            dataInicio: pDateInicio,
            id_rdo: pIdRDO,
            areaAtuacao: pAreaAtuacao
        })

        SET r.cartaChamada = pCartaChamada,
        r.nomeFiscal = pNomeFiscal,
        r.nomeEncarregado = pNomeEncarregado,
        r.condicaoManha = pCondicaoManha,
        r.condicaoTarde = pCondicaoTarde,
        r.condicaoNoite = pCondicaoNoite,
        r.prazoAtividade = pPrazoAtividade,
        r.diasDecorridos = pDiasDecorridos,
        r.prorrogacao = pProrrogacao,
        r.diasRestantes = pDiasRestantes,
        r.diasDeAtrazos = pDiasDeAtrazos,
        r.opcoesDDS = pOpcoesDDS,
        r.opcoesPrejuizo = pOpcoesPrejuizo,
        r.opcoesViolacao = pOpcoesViolacao,
        r.opcoesOciosidade = pOpcoesOciosidade,
        r.servico = pServico,
        r.inicioReal = pInicioReal,
        r.terminoReal = pTerminoReal,
        r.inicioPrevisto = pInicioPrevisto,
        r.terminoPrevisto = pTerminoPrevisto,
        r.comentarios = pComentarios

        WITH pNomeCliente, pNomeProjetos, pIdRDO

        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto), (r:RDO)
        WHERE c.nome = pNomeCliente AND p.nome = pNomeProjetos AND r.id_rdo = pIdRDO

        CREATE (p)<-[:RDO_DA]-(r)
    `,

    EditarRdo: `
        WITH $nomeCliente AS pNomeCliente,
            $nomeProjetos AS pNomeProjetos,
            $dateInicio AS pDateInicio,
            $idRDO AS pIdRDO,
            $areaAtuacao AS pAreaAtuacao,
            $cartaChamada AS pCartaChamada,
            $nomeFiscal AS pNomeFiscal,
            $nomeEncarregado AS pNomeEncarregado,
            $condicaoManha AS pCondicaoManha,
            $condicaoTarde AS pCondicaoTarde,
            $condicaoNoite AS pCondicaoNoite,
            $prazoAtividade AS pPrazoAtividade,
            $diasDecorridos AS pDiasDecorridos,
            $prorrogacao AS pProrrogacao,
            $diasRestantes AS pDiasRestantes,
            $diasDeAtrazos AS pDiasDeAtrazos,
            $opcoesDDS AS pOpcoesDDS,
            $opcoesPrejuizo AS pOpcoesPrejuizo,
            $opcoesViolacao AS pOpcoesViolacao,
            $opcoesOciosidade AS pOpcoesOciosidade,
            $servico AS pServico,
            $inicioReal AS pInicioReal,
            $terminoReal AS pTerminoReal,
            $inicioPrevisto AS pInicioPrevisto,
            $terminoPrevisto AS pTerminoPrevisto,
            $comentarios AS pComentarios

        MATCH (r:RDO {
            cliente: pNomeCliente,
            projeto: pNomeProjetos,
            dataInicio: pDateInicio,
            id_rdo: pIdRDO
        })

        SET r.areaAtuacao = pAreaAtuacao,
        r.cartaChamada = pCartaChamada,
        r.nomeFiscal = pNomeFiscal,
        r.nomeEncarregado = pNomeEncarregado,
        r.condicaoManha = pCondicaoManha,
        r.condicaoTarde = pCondicaoTarde,
        r.condicaoNoite = pCondicaoNoite,
        r.prazoAtividade = pPrazoAtividade,
        r.diasDecorridos = pDiasDecorridos,
        r.prorrogacao = pProrrogacao,
        r.diasRestantes = pDiasRestantes,
        r.diasDeAtrazos = pDiasDeAtrazos,
        r.opcoesDDS = pOpcoesDDS,
        r.opcoesPrejuizo = pOpcoesPrejuizo,
        r.opcoesViolacao = pOpcoesViolacao,
        r.opcoesOciosidade = pOpcoesOciosidade,
        r.servico = pServico,
        r.inicioReal = pInicioReal,
        r.terminoReal = pTerminoReal,
        r.inicioPrevisto = pInicioPrevisto,
        r.terminoPrevisto = pTerminoPrevisto,
        r.comentarios = pComentarios
    `,

    NovoRdoEfetivos: `
        WITH $nomeProjetos AS pNomeProjetos,
        $idRDO AS pIdRDO,
        $idEfetivo AS pIdEfetivo,
        $nomeEfetivo AS pNomeEfetivo,
        $funcaoEfetivo AS pFuncaoEfetivo,
        $horaNormalInicio AS pHoraNormalInicio,
        $horaNormalTermino AS pHoraNormalTermino,
        $horaNormalTotal AS pHoraNormalTotal,
        $horaNormalExtraInicio AS pHoraNormalExtraInicio,
        $horaNormalExtraTermino AS pHoraNormalExtraTermino,
        $horaNormalExtraTotal AS pHoraNormalExtraTotal,
        $horaNormalNoturnaInicio AS pHoraNormalNoturnaInicio,
        $horaNormalNoturnaTermino AS pHoraNormalNoturnaTermino,
        $horaNormalNoturnaTotal AS pHoraNormalNoturnaTotal,
        $horaExtraNoturnaInicio AS pHoraExtraNoturnaInicio,
        $horaExtraNoturnaTermino AS pHoraExtraNoturnaTermino,
        $horaExtraNoturnaTotal AS pHoraExtraNoturnaTotal,
        $horaExtraFdsInicio AS pHoraExtraFdsInicio,
        $horaExtraFdsTermino AS pHoraExtraFdsTermino,
        $horaExtraFdsTotal AS pHoraExtraFdsTotal

        MERGE (ef:Efetivos {
            idEfetivo: pIdEfetivo,
            nomeEfetivo: pNomeEfetivo,
            funcaoEfetivo: pFuncaoEfetivo,
            dataHora: pIdRDO
        })

        SET ef.horaNormalInicio = pHoraNormalInicio,
        ef.horaNormalTermino = pHoraNormalTermino,
        ef.horaNormalTotal = pHoraNormalTotal,
        ef.horaNormalExtraInicio = pHoraNormalExtraInicio,
        ef.horaNormalExtraTermino = pHoraNormalExtraTermino,
        ef.horaNormalExtraTotal = pHoraNormalExtraTotal,
        ef.horaNormalNoturnaInicio = pHoraNormalNoturnaInicio,
        ef.horaNormalNoturnaTermino = pHoraNormalNoturnaTermino,
        ef.horaNormalNoturnaTotal = pHoraNormalNoturnaTotal,
        ef.horaExtraNoturnaInicio = pHoraExtraNoturnaInicio,
        ef.horaExtraNoturnaTermino = pHoraExtraNoturnaTermino,
        ef.horaExtraNoturnaTotal = pHoraExtraNoturnaTotal,
        ef.horaExtraFdsInicio = pHoraExtraFdsInicio,
        ef.horaExtraFdsTermino = pHoraExtraFdsTermino,
        ef.horaExtraFdsTotal = pHoraExtraFdsTotal

        WITH pNomeProjetos, pIdRDO, pIdEfetivo, pNomeEfetivo

        MATCH (p:Projeto)<-[:RDO_DA]-(r:RDO), (e:Efetivos)
        WHERE p.nome = pNomeProjetos 
        AND r.id_rdo = pIdRDO 
        AND e.dataHora = pIdRDO 
        AND e.nomeEfetivo = pNomeEfetivo 
        AND e.idEfetivo = pIdEfetivo

        CREATE (r)<-[:EFETIVO_DA]-(e)
    `,

    DeleteRdoEfetivos: `
        WITH $idRDO AS pIdRDO
        MATCH (r:RDO)<-[:EFETIVO_DA]-(e:Efetivos)
        WHERE r.id_rdo = pIdRDO
        DETACH DELETE e
    `,

    NovoRdoAtividade: `
        WITH $nomeProjetos AS pNomeProjetos,
        $idRDO AS pIdRDO,
        $id AS pIdAtividade,
        $descricao AS pDescricao,
        $quantCont AS pQuantCont,
        $quantReal AS pQuantReal,
        $realAcum AS pRealAcum,
        $referencia AS pReferencia,
        $saldoCont AS pSaldoCont,
        $unidade AS pUnidade

        MERGE (at:Atividades {
            idAtividade: pIdAtividade,
            descricao: pDescricao,
            quantCont: pQuantCont,
            quantReal: pQuantReal,
            realAcum: pRealAcum,
            referencia: pReferencia,
            saldoCont: pSaldoCont,
            unidade: pUnidade,
            dataHora: pIdRDO
        })

        WITH pNomeProjetos, pIdRDO, pDescricao, pIdAtividade

        MATCH (p:Projeto)<-[:RDO_DA]-(r:RDO), (a:Atividades)
        WHERE p.nome = pNomeProjetos 
        AND r.id_rdo = pIdRDO 
        AND a.dataHora = pIdRDO 
        AND a.descricao = pDescricao 
        AND a.idAtividade = pIdAtividade

        CREATE (r)<-[:ATIVIDADE_DA]-(a)
    `,

    DeleteRdoAtividade: `
        WITH $idRDO AS pIdRDO
        MATCH (r:RDO)<-[:ATIVIDADE_DA]-(a:Atividades)
        WHERE r.id_rdo = pIdRDO 
        DETACH DELETE a
    `,

    DominioClientes: `
        MATCH (c:Cliente)
        WITH c
        ORDER BY c.nome
        RETURN collect(c.nome)
    `,

    DominioClientesAtivos:`
        MATCH (c:Cliente)
        WHERE c.ativo = true
        WITH c
        ORDER BY c.nome
        RETURN collect(c.nome)
    `,

    DominioProjetosClientes: `
        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WITH p, c
        ORDER BY p.nome
        RETURN collect({cliente: c{.*}, projeto: p{.*}})
    `,

    DominioColaboradores: `
        MATCH (c:Colaborador)
        WITH c
        ORDER BY c.nome
        RETURN collect({nome: c.nome, reg: toFloat(c.reg), funcao: c.funcao})
    `,

    RdoDoDia: `
        WITH $dataHora AS pDataHora
        MATCH (r:RDO)
        WHERE r.id_rdo >= pDataHora
        RETURN toFloat(count(r))
    `
}