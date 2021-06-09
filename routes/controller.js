const db = require('./db.js');
const query = require('./query.js')
const jwt = require('jsonwebtoken')
const SECRET = '@NEEXSA'
// const jsPDF = require('jspdf')
const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const fs = require('fs')

exports.clientes = async (req, res, next) => {
    try{
        const body = req.body
        const params = {
            nomePesquisa: body.nomePesquisa
        }
        let cql = query.cql.Clientes;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os cliente'})
    }
}

exports.novoClientes = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            novoNomeCliente: body.novoNomeCliente
        }
        let cql = query.cql.NovoClientes;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'Cliente salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro'})
    }
}

exports.deleteClientes = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente
        }
        let cql = ''
        cql = query.cql.VerificarProjetos
        let verificarProjetos = await db.neo4j.executeCypherAsync(cql, params)

        if (verificarProjetos.length > 0) {
            res.status(200).send({projeto: verificarProjetos, mensagem: 'Esse cliente possui projetos ativos'})
        } else {
            cql = query.cql.DeleteCliente
            await db.neo4j.executeCypherAsync(cql, params)
            res.status(200).send({projeto: 0, mensagem: 'Cliente deletado com sucesso'})
        }

    }catch (e){
        res.status(500).send({message: 'Não foi possivel excluir o cliente'})
    }
}

exports.alterarStatusCliente = async (req, res, next) => {
    try {
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            status: body.status
        }
        let cql = ''
        if (body.status === false) {
            cql = query.cql.VerificarProjetos
            let verificarProjetos = await db.neo4j.executeCypherAsync(cql, params)
            if (verificarProjetos.length > 0) {
                res.status(200).send({projeto: verificarProjetos, mensagem: 'Esse cliente possui projetos ativos'})
            } else {
                cql = query.cql.AlterarStatusCliente
                await db.neo4j.executeCypherAsync(cql, params)
                res.status(200).send({projeto: 0, mensagem: 'Status do cliente alterado com sucesso'})
            }
        } else {
            cql = query.cql.AlterarStatusCliente
                await db.neo4j.executeCypherAsync(cql, params)
                res.status(200).send({projeto: 0, mensagem: 'Status do cliente alterado com sucesso'})
        }
    } catch (err) {
        res.status(500).send({message: 'Não foi possivel alterar o status'})
    }
}

exports.projetos = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            dataInicio: body.dataInicio,
            textoPesquisar: body.textoPesquisar
        }
        let cql = query.cql.Projetos;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os projetos'})
    }
}

exports.novoProjeto = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            novoNomeProjeto: body.novoNomeProjeto,
            dataInicio: body.dataInicio
        }
        let cql = query.cql.NovoProjeto;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'Projeto salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro do projeto'})
    }
}

exports.alterarStatusProjeto = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            nomeProjeto: body.nomeProjeto,
            status: body.status
        }
        let cql = ''
        if (body.status === false) {
            cql = query.cql.VerificarCliente
            let verificarCliente = await db.neo4j.executeCypherAsync(cql, params)
            if (verificarCliente.length > 0) {
                res.status(200).send({cliente: verificarCliente, mensagem: 'Cliente Ativo'})
            } else {
                cql = query.cql.PausarProjeto;
                await db.neo4j.executeCypherAsync(cql, params)
                res.status(200).send({cliente: 0, mensagem: 'Status do projeto alterado com sucesso'})
            }
        } else {
            cql = query.cql.PausarProjeto;
            await db.neo4j.executeCypherAsync(cql, params)
            res.status(200).send({cliente: 0, mensagem: 'Status do projeto alterado com sucesso'})
        }
    }catch (e){
        res.status(500).send({message: 'Não foi possivel alterar o status do projeto'})
    }
}

exports.rdos = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            dataInicio: body.dataInicio ? body.dataInicio : null,
            textoPesquisar: body.textoPesquisar ? body.textoPesquisar : '',
            nomeCliente: body.nomeCliente ? body.nomeCliente : '',
            nomeProjetos: body.nomeProjetos ? body.nomeProjetos : ''
        }
        let cql = query.cql.Rdos;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar as RDOs'})
    }
}

exports.novoRdo = async (req, res, next) => {
    try{
        let body = req.body
        let cql = ''

        let params = {
            nomeCliente: body.nomeCliente,
            nomeProjetos: body.nomeProjetos,
            dateInicio: body.dateFormatted,
            idRDO: body.dataIDRDO,
            areaAtuacao: body.areaAtuacao,
            cartaChamada: body.cartaChamada,
            nomeFiscal: body.nomeFiscal,
            nomeEncarregado: body.nomeEncarregado,
            condicaoManha: body.condicaoManha,
            condicaoTarde: body.condicaoTarde,
            condicaoNoite: body.condicaoNoite,
            prazoAtividade: body.prazoAtividade,
            diasDecorridos: body.diasDecorridos,
            prorrogacao: body.prorrogacao,
            diasRestantes: body.diasRestantes,
            diasDeAtrazos: body.diasDeAtrazos,
            opcoesDDS: body.opcoesDDS,
            opcoesPrejuizo: body.opcoesPrejuizo,
            opcoesViolacao: body.opcoesViolacao,
            opcoesOciosidade: body.opcoesOciosidade,
            servico: body.servico,
            inicioReal: body.inicioReal,
            terminoReal: body.terminoReal,
            inicioPrevisto: body.inicioPrevisto,
            terminoPrevisto: body.terminoPrevisto,
            comentarios: body.comentarios
        }
        cql = query.cql.NovoRdo;
        await db.neo4j.executeCypherAsync(cql, params)

        let efetivoArray = body.efetivos
        for (const item of efetivoArray ) {

            item.nomeProjetos = body.nomeProjetos
            item.idRDO = body.dataIDRDO

            try {
                cql = query.cql.NovoRdoEfetivos;
                await db.neo4j.executeCypherAsync(cql, item)
            } catch (err) {
                console.log(err)
            }
        }

        let atividadeArray = body.atividades
        for (const item of atividadeArray ) {

            item.nomeProjetos = body.nomeProjetos
            item.idRDO = body.dataIDRDO

            try {
                cql = query.cql.NovoRdoAtividade;
                await db.neo4j.executeCypherAsync(cql, item)
            } catch (err) {
                console.log(err)
            }
        }

        const filePath = path.join(__dirname, "pdf.ejs")

        aws.config.update({
            accessKeyId: 'AKIA3W7SB22BQZO67YLE',
            secretAccessKey: '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',
            region: 'sa-east-1'
        })

        const s3 = new aws.S3();


        ejs.renderFile(filePath, {body}, (err, html) => {
            if (err) {
                console.log(err)
            } else {
                console.log(html)

                pdf.create(html,{
                    format: "A3",
                    border: "5mm",
                }).toStream(function(err, stream){
                    if (err) return res.status(500).send(err)
                    // stream.pipe(fs.createWriteStream(`${body.dataIDRDO}.pdf`));
                    const params = {
                        s3,
                        Bucket: 'neexsa-htg-pdfs',
                        acl: 'public-read',
                        Key: `${body.dataIDRDO}.pdf`,
                        Body: stream,
                        ContentType: 'application/pdf',
                    };
                    s3.upload(params, (err, res) => {
                        if (err) {
                            console.log(err, 'err');
                        }
                        console.log(res, 'res');
                    });
                }) 
            }
        })

        res.status(200).send({mensagem: 'RDO salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro do RDO'})
    }
}

exports.editarRdo = async (req, res, next) => {
    try{
        let body = req.body
        let cql = ''

        let params = {
            nomeCliente: body.nomeCliente,
            nomeProjetos: body.nomeProjetos,
            dateInicio: body.dateFormatted,
            idRDO: body.dataIDRDO,
            areaAtuacao: body.areaAtuacao,
            cartaChamada: body.cartaChamada,
            nomeFiscal: body.nomeFiscal,
            nomeEncarregado: body.nomeEncarregado,
            condicaoManha: body.condicaoManha,
            condicaoTarde: body.condicaoTarde,
            condicaoNoite: body.condicaoNoite,
            prazoAtividade: body.prazoAtividade,
            diasDecorridos: body.diasDecorridos,
            prorrogacao: body.prorrogacao,
            diasRestantes: body.diasRestantes,
            diasDeAtrazos: body.diasDeAtrazos,
            opcoesDDS: body.opcoesDDS,
            opcoesPrejuizo: body.opcoesPrejuizo,
            opcoesViolacao: body.opcoesViolacao,
            opcoesOciosidade: body.opcoesOciosidade,
            servico: body.servico,
            inicioReal: body.inicioReal,
            terminoReal: body.terminoReal,
            inicioPrevisto: body.inicioPrevisto,
            terminoPrevisto: body.terminoPrevisto,
            comentarios: body.comentarios
        }
        cql = query.cql.EditarRdo;
        await db.neo4j.executeCypherAsync(cql, params)

        let efetivoArray = body.efetivos
        for (const item of efetivoArray ) {

            item.nomeProjetos = body.nomeProjetos
            item.idRDO = body.dataIDRDO

            try {
                cql = query.cql.DeleteRdoEfetivos;
                await db.neo4j.executeCypherAsync(cql, item)

                cql = query.cql.NovoRdoEfetivos;
                await db.neo4j.executeCypherAsync(cql, item)
            } catch (err) {
                console.log(err)
            }
        }

        let atividadeArray = body.atividades
        for (const item of atividadeArray ) {

            item.nomeProjetos = body.nomeProjetos
            item.idRDO = body.dataIDRDO

            try {
                cql = query.cql.DeleteRdoAtividade;
                await db.neo4j.executeCypherAsync(cql, item)

                cql = query.cql.NovoRdoAtividade;
                await db.neo4j.executeCypherAsync(cql, item)
            } catch (err) {
                console.log(err)
            }
        }

        const filePath = path.join(__dirname, "pdf.ejs")

        aws.config.update({
            accessKeyId: 'AKIA3W7SB22BQZO67YLE',
            secretAccessKey: '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',
            region: 'sa-east-1'
        })

        const s3 = new aws.S3();


        ejs.renderFile(filePath, {body}, (err, html) => {
            if (err) {
                console.log(err)
            } else {
                console.log(html)

                pdf.create(html,{
                    format: "A3",
                    border: "5mm",
                }).toStream(function(err, stream){
                    if (err) return res.status(500).send(err)
                    // stream.pipe(fs.createWriteStream(`${body.dataIDRDO}.pdf`));
                    const params = {
                        s3,
                        Bucket: 'neexsa-htg-pdfs',
                        acl: 'public-read',
                        Key: `${body.dataIDRDO}.pdf`,
                        Body: stream,
                        ContentType: 'application/pdf',
                    };
                    s3.upload(params, (err, res) => {
                        if (err) {
                            console.log(err, 'err');
                        }
                        console.log(res, 'res');
                    });
                }) 
            }
        })

        res.status(200).send({mensagem: 'RDO salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro do RDO'})
    }
}

exports.rdoDoDia = async (req, res, next) => {
    try {
        let body = req.body
        let params = {
            dataHora: body.dataHora
        }
        let cql = query.cql.RdoDoDia
        let resultRdo = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({resultRdo})
    } catch (err) {
        res.status(500).send({ mensagem: 'Não foi possivel buscar os dados' })
    }
}

exports.dominioClientes = async (req, res, next) => {
    try {
        let cql = query.cql.DominioClientes;
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os Clientes'})
    }
}

exports.dominioClientesAtivos = async (req, res, next) => {
    try {
        let cql = query.cql.DominioClientesAtivos
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({resposta: err, message: 'Não foi possivel buscar os Clientes'})
    }
}

exports.dominioProjetosClientes = async (req, res, next) => {
    try {
        let cql = query.cql.DominioProjetosClientes;
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os Projetos'})
    }
}

exports.colaboradores = async (req, res, next) => {
    try{
        let cql = query.cql.DominioColaboradores;
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os Colaboradores'})
    }
}

exports.gerarPdf = async (req, res, next) => {

    let body = req.body

    const filePath = path.join(__dirname, "pdf.ejs")

    aws.config.update({
        accessKeyId: 'AKIA3W7SB22BQZO67YLE',
        secretAccessKey: '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',
        region: 'sa-east-1'
    })

    const s3 = new aws.S3();


    ejs.renderFile(filePath, {body}, (err, html) => {
        if (err) {
            console.log(err)
        } else {
            console.log(html)

            pdf.create(html,{}).toStream(function(err, stream){
                stream.pipe(fs.createWriteStream(`${body.dataIDRDO}.pdf`));
                const params = {
                    s3,
                    Bucket: 'neexsa-htg-pdfs',
                    acl: 'public-read',
                    Key: `${body.dataIDRDO}.pdf`,
                    Body: stream,
                    ContentType: 'application/pdf',
                };
                s3.upload(params, (err, res) => {
                    if (err) {
                        console.log(err, 'err');
                    }
                    console.log(res, 'res');
                });
            }) 
        }
    })
    


    /* ejs.renderFile(filePath, {body}, (err, html) => {
            if (err) {
                console.log(err)
            } else {
                console.log(html)

                pdf.create(html,{}).toFile(`./pdf/${body.dataIDRDO}.pdf`,(err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }
                }) 
            }
    }) */
}

exports.awsPdf = async (req, res, next) => {

    const id = req.body.id

    console.log(`${id}.pdf`)

    const s3 = new aws.S3()
    aws.config.update({accessKeyId: 'AKIA3W7SB22BQZO67YLE', secretAccessKey: 'lPY0lCW15ozjlKKymG8yCx02lU3TPK3Ngan8srIW'})

    const myBucket = 'neexsa-htg-pdfs'
    const myKey = `${id}.pdf`
    const signedUrlExpireSeconds = 60 * 5 // your expiry time in seconds.

    const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
       })

    res.send(url)

    /* const s3Client = new aws.S3({
        accessKeyId: 'AKIA3W7SB22BQZO67YLE',
        secretAccessKey: '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',
        region: 'sa-east-1'
    });

    const params = {
            Bucket: 'neexsa-htg-pdfs', 
            Key: '', // pass key
    };

    
    params.Key = '1622198871951.pdf'; */

    /* res.setHeader('Content-Disposition', 'attachment');

	s3Client.getObject(params)
		.createReadStream()
			.on('error', function(err){
				res.status(500).json({error:"Error -> " + err});
		}).pipe(res); */
    

    /* var fileName = '1622198871951.pdf'
    aws.config.update({
        accessKeyId: 'AKIA3W7SB22BQZO67YLE',
        secretAccessKey: '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',
        region: 'sa-east-1'
    })

    const s3 = new aws.S3();

    const params  = {
        Bucket: 'neexsa-htg-pdfs',
        Key: fileName
    }
            
    s3.getObject(params, function(err, data) {
        if (err) {
            throw err
        }
        fs.writeFileSync(`./pdf/${fileName}`, data.Body)
        console.log('file downloaded successfully')
    }) */

    /* res.setHeader("Access-Control-Allow-Origin", "*");

    var file = __dirname + '../pdf/1622198871951.pdf';
    res.download(file); // Set disposition and send it. */
    
}