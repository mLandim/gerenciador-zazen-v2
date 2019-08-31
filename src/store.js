import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { utilitarios }  from './utilitarios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {

		// Dados do aplicativo
		versao: 'v0.1.0',
		// Nome temporário do projeto
		projeto_codinome: 'gerenciador-zazen-001',
		// Nome comercial
		titulo: 'Gerenciador Zazen',
	
		// Dados do Usuário
		usuarioLogado: {
			uid:null, 
			email:null, 
			displayName:null
		},
		// Perfil que determina o que está visível para o usuário
		// 0 (administrator):  tudo visível
		// 1 (recepção): Não acessa menu usuários
		perfilAcesso: null,

		// Lista de usuário visíveis de acordo com o uid logado - em desuso
		listaUsuariosVisiveis:[],

		// Controla exibição do formulário flutuante
		formularioFlutuante:{
			exibe: false,
			id: null // de acordo com o id seleciona o formulário a exibir
		},

		// Banco de dados - objeto de conexão
		firebase: firebase,

		// Tabelas de controle do sistema
		tabelas:{
			clientes:[],
			produtos:{tabelaYoga:[], tabelaSalas:[], tabelaLoja:[]},
			contratos:{tabelaYoga:[], tabelaSalas:[], tabelaLoja:[]},
			turmas:[],
			agendamentos:[],
			professoras:[]
		},

		iconeTipoProduto:{
			YOGA:['fas', 'running'],
			SALAS:['far', 'calendar-check'],
			LOJA:['fas','store']
		},

	},
	getters:{
		getTitulo: state => state.titulo,
		getVersao: state => state.versao,
		getUsuarioLogado: state => state.usuarioLogado,
		getPerfilAcesso: state => state.perfilAcesso,
		getListaUsuariosVisiveis: state => state.listaUsuariosVisiveis,
		getFormularioFlutuante: state => state.formularioFlutuante,

		getTabela_Clientes: state => state.tabelas.clientes,
		getTabela_Produtos: state => state.tabelas.produtos,
		getTabela_Contratos: state => state.tabelas.contratos,
		getTabela_Professoras: state => state.tabelas.professoras,
		getTabela_Turmas: state => state.tabelas.turmas,

		getIconeTipoProduto: state => state.iconeTipoProduto,


	},
	mutations: {
		
		commitLiberaColecao: (state, payload) => {
			console.log('commitLiberaColecao >>' + payload)
			let unsubscribe = firebase.firestore().collection(payload).onSnapshot(function () {})
			unsubscribe()
        },
		
	},
	actions: {

		// Ação que controla a exibição dos formulários flutuantes
		abreFormularioFlutuante: (context, payload) => {

			context.state.formularioFlutuante.id = payload.id
			context.state.formularioFlutuante.exibe = payload.exibe

		},


		// Verificando usuario logado - dispara todas as consultas iniiais (monitoramoentos snapshot)
		verificaUsuarioLogado: (context, payload) => {

			console.log('verificaUsuarioLogado');
			firebase.auth().onAuthStateChanged((user) => {

				// Se houver usuário válido logado: inicia App
				if(user){
					console.log('verificaUsuarioLogado >> logado');
					//Registrando usuário logado no app
					context.state.usuarioLogado = user
					context.dispatch('registrarAcessos', user)
					//context.dispatch('snapShotUsersView', true)
					console.log(user);

					// Iniciando monitoramentos em tempo real da base de dados (onSnapShot)
					context.dispatch('consultaBase_Contratos', true)
					context.dispatch('consultaBase_Clientes', true)
					context.dispatch('consultaBase_Produtos', true)
					
					context.dispatch('consultaBase_Professoras', true)
					context.dispatch('consultaBase_Turmas', true)

				}else{

					console.log('verificaUsuarioLogado >> offline');
					//context.state.usuarioLogado = {uid: null, email: null, displayName: null}
					//context.dispatch('snapShotUsersView', false)
					//context.dispatch('logOff', true)

				}
			})

		},

		// Registrando acesso no banco de dados
		registrarAcessos: (context, payload) => {

			// A consulta a coleção retornará apenas 1 resultado - id é unico e fornecido pelo firebase no cadastro
			firebase.firestore().collection('users').where('id', '==', context.state.usuarioLogado.uid).get().then(docArr =>{

				// Se houver dados retornados para o id fornecido
				docArr.forEach( item => {
				
				//registrando perfil de acesso
				context.state.perfilAcesso = parseInt(item.data().grupo.id)
				
				// Monta documento/objeto para incluir na coleção de acessos
				let itemInsert = {
					data_acesso: new Date(),
					usuario: item.data(),
				}

				// Executa add na coleção de acessos
				firebase.firestore().collection('acessos').add(itemInsert).then(docRef => {

				}).catch(error =>{
					console.error(error.Message)
				})

				})

			}).catch(error => {
				console.error(error.Message)
			})
		

		},

		// Testando acesso do usuário logado
		snapShotUsersView: (context, payload) => {

			let retorno = []

			if(payload){
			
				console.log('snapShotUsersView');
				console.log('usuarioLogado.uid >> '+context.state.usuarioLogado.uid);

				firebase.firestore().collection('users').where('id', '==', context.state.usuarioLogado.uid).onSnapshot(function (querySnapshot){

					querySnapshot.forEach(element => {
						retorno.push(element.data())
						console.log('>> ' + JSON.stringify(element.data()))
					})
				

				}, function(error){

					//retorno = []
					console.log('error snapshot')
					console.log(JSON.stringify(error)) 
					retorno.push(JSON.stringify(error))

				})

			}else{
				let unsubscribe = firebase.firestore().collection('users').onSnapshot(function (){})
				unsubscribe()
			}

			context.state.listaUsuariosVisiveis = retorno

		},

		// Reiniciando state e desconectando coleções
		logOff: (context, payload) => {

			console.log('logOff >>')
			let self = this
			// Reiniciando state
			let tabelas = {
				clientes:[],
				produtos:{tabelaYoga:[], tabelaSalas:[], tabelaLoja:[]},
				contratos:{tabelaYoga:[], tabelaSalas:[], tabelaLoja:[]},
				turmas:[],
				agendamentos:[]
			}
			let usuarioLogado =  {
				uid:null, 
				email:null, 
				displayName:null
			}
			context.state.tabelas = tabelas
			context.state.usuarioLogado = usuarioLogado
			context.state.perfilAcesso = null

			console.log('logOff >> Tabelas')
			console.log(context.state.tabelas )

			// Desconectando da base
			context.commit('commitLiberaColecao', 'users')
			context.commit('commitLiberaColecao', 'acessos')
			context.commit('commitLiberaColecao', 'clientes')
			context.commit('commitLiberaColecao', 'produtos')
			context.commit('commitLiberaColecao', 'contratos')
			context.commit('commitLiberaColecao', 'turmas')
			context.commit('commitLiberaColecao', 'agendamentos')


			
			firebase.auth().signOut().then(() => {
				
				console.log('logOff >> Logout')
				location.reload()
				//self.$router.push({ path: '/'})
				
            }).catch((error) => {
                alert(`Erro ao sair:  ${error}`)
            })

		},
		

		// Encerra monitoramento em tempo real (onSnapShot) da coleção recebida
		zerabase: (context, payload) => {
			firebase.firestore().collection(payload).onSnapshot(function () {})
		},

		// Inicia monitoramento em tempo real (onSnapShot) e atualiza tabela de controle
		consultaBase_Clientes: (context, payload) =>{

			console.log('consultaBase_Clientes >>')
			context.dispatch('zerabase', 'clientes')
			let self = this
			context.state.tabelas['clientes'] = []
            firebase.firestore().collection('clientes').orderBy("nome").onSnapshot(resposta =>{

                const changes = resposta.docChanges()
                changes.forEach(change =>{

					let tags = ''
					if(utilitarios.dataFormatada(change.doc.data().nascimento.toDate()).includes(`/${utilitarios.mesAtual()}/`)){
						tags += '#aniversario|#niver|'
					}
					if(change.doc.data().contratos.length > 0){
						tags += '#comcontratos|#temcontratados|#comprador|'
					}
					
					if(change.doc.data().endereco.logradouro =='' || change.doc.data().endereco.numero =='' || change.doc.data().endereco.cep =='' || change.doc.data().endereco.bairro =='' || change.doc.data().endereco.cidade =='' || change.doc.data().endereco.uf ==''){
						tags += '#incompleto|'
					}
					if( (change.doc.data().telefone.ddd =='' || change.doc.data().telefone.numero =='') && tags.includes('incompleto') === false){
						tags += '#incompleto|'
					}

					if(change.doc.data().instagram =='' && tags.includes('incompleto') === false){
						tags += '#incompleto|'
					}

                    if(change.type === 'added'){

						//console.log('Novo Cliente >>')
                        let linha = {   
                            id: change.doc.id,
							cpf: change.doc.data().cpf,
							rg: change.doc.data().rg,
							nome:change.doc.data().nome,
							sobrenome:change.doc.data().sobrenome,
                            nome_completo: `${change.doc.data().nome} ${change.doc.data().sobrenome}`, 
                            email: change.doc.data().email.toLowerCase(), 
                            instagram: change.doc.data().instagram.toLowerCase(), 
                            data_nascimento: utilitarios.dataFormatada(change.doc.data().nascimento.toDate()) ,  //context.dispatch('dataFormatada', change.doc.data().nascimento.toDate()),
							data_nascimento_order: change.doc.data().nascimento.toDate(),
							data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
							data_cadastro_order: change.doc.data().data_cadastro.toDate(),
                            situacao: (change.doc.data().ativo==true) ? 'ativo' : 'inativo',
							telefone_completo: `${change.doc.data().telefone.ddd} ${change.doc.data().telefone.numero}`,
							telefone: change.doc.data().telefone,
							contratos: change.doc.data().contratos,
							contratos_len: change.doc.data().contratos.length,
							contratos_text: change.doc.data().contratos.length + ' Contrato(s)',
							endereco: change.doc.data().endereco,
							observacoes: change.doc.data().observacoes,
							tags:tags,
                            sel:false
                        }
                        //console.log(linha)
						context.state.tabelas.clientes.push(linha)
						
					}else if (change.type === "modified") {
							console.log("Cliente Atualizado: ", change.doc.data().nome);
							
								let linha = {   
									id: change.doc.id,
									cpf: change.doc.data().cpf,
									rg: change.doc.data().rg,
									nome:change.doc.data().nome,
									sobrenome:change.doc.data().sobrenome,
									nome_completo: `${change.doc.data().nome} ${change.doc.data().sobrenome}`,  
									email: change.doc.data().email.toLowerCase(), 
									instagram: change.doc.data().instagram.toLowerCase(), 
									data_nascimento: utilitarios.dataFormatada(change.doc.data().nascimento.toDate()) ,  //context.dispatch('dataFormatada', change.doc.data().nascimento.toDate()),
									data_nascimento_order: change.doc.data().nascimento.toDate(),
									data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
									data_cadastro_order: change.doc.data().data_cadastro.toDate(),
									situacao: (change.doc.data().ativo==true) ? 'ativo' : 'inativo',
									telefone_completo: `${change.doc.data().telefone.ddd} ${change.doc.data().telefone.numero}`,
									telefone: change.doc.data().telefone,
									contratos: change.doc.data().contratos,
									contratos_len: change.doc.data().contratos.length,
									endereco: change.doc.data().endereco,
									contratos_text: change.doc.data().contratos.length + ' Contrato(s)',
									observacoes: change.doc.data().observacoes,
									tags:tags,
									sel:false
								}
								let tabelalen = context.state.tabelas.clientes.length	
								for (let index = 0; index < tabelalen; index++) {
									const element = context.state.tabelas.clientes[index];
									if(element.id == change.doc.id){
										context.state.tabelas.clientes[index] = linha
										
									}
								}	
								
							
					}else if (change.type === "removed") {

						console.log("Cliente Removido: ", change.doc.data().nome);
						//let tabelalen = context.state.tabelas.clientes.length	
						for (let index = 0; index < context.state.tabelas.clientes.length; index++) {
							const element = context.state.tabelas.clientes[index];
							if(element.id == change.doc.id){
								//context.state.tabelas.clientes[index] = linha
								context.state.tabelas.clientes.splice(index, 1)
							}
						}	
						
					}else{
						console.log(`Ocorreu uma mudança do tipo: ${change.type}`)
					}
					
                })

            })
			


		},
		// Inicia monitoramento em tempo real (onSnapShot) e atualiza tabela de controle
		consultaBase_Produtos: (context, payload) => {
			
			console.log('consultaBase_Produtos >>')
			context.dispatch('zerabase', 'produtos')
			context.state.tabelas.produtos.tabelaYoga = []
			context.state.tabelas.produtos.tabelaSalas = []
			context.state.tabelas.produtos.tabelaLoja = []
			let self = this
            //self.totalizadores[0].quantidade = 0;
            //self.totalizadores[1].quantidade = 0;
            //self.totalizadores[2].quantidade = 0;
			firebase.firestore().collection('produtos').orderBy("modalidade").orderBy("valor").onSnapshot(resposta =>{
                
				const changes = resposta.docChanges()
				
                changes.forEach(async change =>{
					let tags = ''
                    if(change.type === 'added'){

                        if(change.doc.data().categoria=='YOGA'){
							//self.totalizadores[0].quantidade++
													
							if(change.doc.data().contratos.length > 0){
								tags += '#contratados|'
							}	

                            let linha = {   
                                    id: change.doc.id,
                                    categoria: change.doc.data().categoria,
                                    modalidade: (change.doc.data().modalidade == null) ? '' : change.doc.data().modalidade, 
                                    plano: (change.doc.data().plano == null) ? '' : change.doc.data().plano, 
                                    frequencia: (change.doc.data().frequencia == null) ? '' : change.doc.data().frequencia,
                                    horario: (change.doc.data().horario == null) ? '' : change.doc.data().horario,
                                    contratos: change.doc.data().contratos.length,
                                    contratos_text: change.doc.data().contratos.length + ' Contrato(s)',
                                    situacao: change.doc.data().situacao,
									valor: change.doc.data().valor,
									tags: tags,
									turmas:[],
                                    sel:false
							}
							
							let consultaTurmasParaHorario = await firebase.firestore().collection('turmas').where('horario', '==', linha.horario ).get()
							consultaTurmasParaHorario.forEach( turmaDoc =>{
								let turma = {
									id: turmaDoc.id,
									alunos:turmaDoc.data().alunos,
									dia_semana:turmaDoc.data().dia_semana,
									horario:turmaDoc.data().horario,
									professoras:turmaDoc.data().professoras,
									modalidade: turmaDoc.data().modalidade
								}
								linha.turmas.push(turma)
							})
                            //console.log(linha)
                            context.state.tabelas.produtos.tabelaYoga.push(linha)

                        }else{
						}
						
					} else if (change.type === "modified") {

						console.log("Produto modificado: ", change.doc.data().categoria);
						
						if(change.doc.data().categoria=='YOGA'){
							if(change.doc.data().contratos.length > 0){
								tags += '#contratados|'
							}	

							let linha = {   
								id: change.doc.id,
								categoria: change.doc.data().categoria,
								modalidade: (change.doc.data().modalidade == null) ? '' : change.doc.data().modalidade, 
								plano: (change.doc.data().plano == null) ? '' : change.doc.data().plano, 
								frequencia: (change.doc.data().frequencia == null) ? '' : change.doc.data().frequencia,
								horario: (change.doc.data().horario == null) ? '' : change.doc.data().horario,
								contratos: change.doc.data().contratos.length,
								situacao: change.doc.data().situacao,
								valor: change.doc.data().valor,
								tags: tags,
								sel:false
								}
							let tabelalen = context.state.tabelas.produtos.tabelaYoga.length	
							for (let index = 0; index < tabelalen; index++) {
								const element = context.state.tabelas.produtos.tabelaYoga[index];
								if(element.id == change.doc.id){
									context.state.tabelas.produtos.tabelaYoga[index] = linha
									
								}
							}	
							
						}else{

						}
						
                    }else{
                        console.log(`Ocorreu uma mudança do tipo: ${change.type}`)
                    }

                })

            })
		},

		// Inicia monitoramento em tempo real (onSnapShot) e atualiza tabela de controle
		consultaBase_Contratos: (context, payload) => {
			
			console.log('consultaBase_Contratos >>')
			context.dispatch('zerabase', 'contratos')

			context.state.tabelas.contratos.tabelaYoga = []
			context.state.tabelas.contratos.tabelaSalas = []
			context.state.tabelas.contratos.tabelaLoja = []

			let self = this
            //self.totalizadores[0].quantidade = 0;
            //self.totalizadores[1].quantidade = 0;
            //self.totalizadores[2].quantidade = 0;
			firebase.firestore().collection('contratos').orderBy("data_inicio").onSnapshot(resposta =>{

                
                const changes = resposta.docChanges()
                changes.forEach(change =>{

					let tags = ''

                    if(change.type === 'added'){

                        //if(change.doc.data().categoria=='YOGA'){

							

							let produtoId = change.doc.data().produto[0]
							let clienteId = change.doc.data().cliente[0]
							let turmaId = change.doc.data().turma[0]
							let dataInicio = utilitarios.dataFormatada(change.doc.data().data_inicio.toDate())
							let dataInicioOrder = change.doc.data().data_inicio.toDate()
							let valorTotal = change.doc.data().valor_total
							let situacao = change.doc.data().situacao

							
							
                            //self.totalizadores[0].quantidade++
                            let linha = {   
									id: change.doc.id,
									
									produtoId: produtoId,
									produto: null,
									categoria: '',
									modalidade: '', 
                                    plano: '',
                                    frequencia:'',
                                    horario:'', 
									data_inicio: dataInicio,
									data_inicio_order: dataInicioOrder,
									vencimento: '',
									vencimento_order: '',
									vencimento_pz: '',
									
									clienteId:clienteId,
									cliente: null,
									cliente_nome: '',
									
									turmaId: turmaId,
									turma:null,
									
									situacao: situacao,
									valor: valorTotal,

									tags: '',
									sel:false
									}

							firebase.firestore().collection('produtos').doc(produtoId).get().then( resultado2 =>{
								
								linha.produto = resultado2.data()
								linha.categoria = resultado2.data().categoria
								linha.modalidade = resultado2.data().modalidade
                                linha.plano = resultado2.data().plano
                                linha.frequencia = resultado2.data().frequencia
                                linha.horario = resultado2.data().horario
								linha.vencimento = utilitarios.dataVencimentoFormatada(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
								linha.vencimento_order = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
								linha.vencimento_pz = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
								
								tags += `#${resultado2.data().categoria}|#${resultado2.data().modalidade}|#${resultado2.data().plano}|#${resultado2.data().frequencia}|#${resultado2.data().horario}|`								
								let vencPz = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
								
								if( vencPz <= 0){
									tags +='#vencido|'
								}else{

									if( vencPz < 5){
										tags += '#vencemenos5dias|#5oumenosdiasparavencer|'
									}
									if( vencPz < 1){
										tags +='#vencendo|'
									}
								}
								if(linha.vencimento.includes(utilitarios.mesAtual())){
									tags += '#venceestemes|'
								}

								if(utilitarios.diferencaDiasHoje(change.doc.data().data_inicio.toDate()) < 5 ){
									tags += '#novos|#recente|'
								}

								
								linha.tags = tags

								//linha.valor = resultado2.data().valor
								firebase.firestore().collection('clientes').doc(clienteId).get().then( resultado3 =>{

									linha.cliente = resultado3.data() //{id: clienteId, nome:resultado3.data().nome}
									linha.cliente_nome = resultado3.data().nome
									context.state.tabelas.contratos.tabelaYoga.push(linha)

								})
								
							})		
                            //console.log(linha)
                            

                        //}else{
                        //}
					}else if (change.type === "modified") {

						let produtoId = change.doc.data().produto[0]
						let clienteId = change.doc.data().cliente[0]
						let turmaId = change.doc.data().turma[0]
						let dataInicio = utilitarios.dataFormatada(change.doc.data().data_inicio.toDate())
						let dataInicioOrder = change.doc.data().data_inicio.toDate()
						let valorTotal = change.doc.data().valor_total
						let situacao = change.doc.data().situacao

						
						
						//self.totalizadores[0].quantidade++
						let linha = {   
								id: change.doc.id,
								
								produtoId: produtoId,
								produto: null,
								categoria: '',
								modalidade: '', 
								plano: '',
								frequencia:'',
								horario:'', 
								data_inicio: dataInicio,
								data_inicio_order: dataInicioOrder,
								vencimento: '',
								vencimento_order: '',
								vencimento_pz: '',
								
								clienteId:clienteId,
								cliente: null,
								cliente_nome: '',
								
								turmaId: turmaId,
								turma:null,
								
								situacao: situacao,
								valor: valorTotal,

								tags: '',
								sel:false
								}

						firebase.firestore().collection('produtos').doc(produtoId).get().then( resultado2 =>{
							
							linha.produto = resultado2.data()
							linha.categoria = resultado2.data().categoria
							linha.modalidade = resultado2.data().modalidade
							linha.plano = resultado2.data().plano
							linha.frequencia = resultado2.data().frequencia
							linha.horario = resultado2.data().horario
							linha.vencimento = utilitarios.dataVencimentoFormatada(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
							linha.vencimento_order = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
							linha.vencimento_pz = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
							
							tags += `#${resultado2.data().categoria}|#${resultado2.data().modalidade}|#${resultado2.data().plano}|#${resultado2.data().frequencia}|#${resultado2.data().horario}|`								
							let vencPz = utilitarios.diferencaDatas(change.doc.data().data_inicio.toDate(), resultado2.data().plano)
							
							if( vencPz <= 0){
								tags +='#vencido|'
							}else{

								if( vencPz < 5){
									tags += '#vencemenos5dias|#5oumenosdiasparavencer|'
								}
								if( vencPz < 1){
									tags +='#vencendo|'
								}
							}
							if(linha.vencimento.includes(utilitarios.mesAtual())){
								tags += '#venceestemes|'
							}

							if(utilitarios.diferencaDiasHoje(change.doc.data().data_inicio.toDate()) < 5 ){
								tags += '#novos|#recente|'
							}

							
							linha.tags = tags

							//linha.valor = resultado2.data().valor
							firebase.firestore().collection('clientes').doc(clienteId).get().then( resultado3 =>{

								linha.cliente = resultado3.data() //{id: clienteId, nome:resultado3.data().nome}
								linha.cliente_nome = resultado3.data().nome
								//context.state.tabelas.contratos.tabelaYoga.push(linha)

							})
							
						})


						let tabelalen = context.state.tabelas.contratos.tabelaYoga.length	
						for (let index = 0; index < tabelalen; index++) {
							const element = context.state.tabelas.contratos.tabelaYoga[index];
							if(element.id == change.doc.id){
								context.state.tabelas.contratos.tabelaYoga[index] = linha
										
							}
						}	
						
                    }else if (change.type === "removed") {

						console.log("Contrato Removido: ", change.doc.id);
						//let tabelalen = context.state.tabelas.clientes.length	
						for (let index = 0; index < context.state.tabelas.contratos.tabelaYoga.length; index++) {
							const element = context.state.tabelas.contratos.tabelaYoga[index];
							if(element.id == change.doc.id){
								//context.state.tabelas.clientes[index] = linha
								context.state.tabelas.contratos.tabelaYoga.splice(index, 1)
							}
						}	
						
					}else{
                        console.log(`Ocorreu uma mudança do tipo: ${change.type}`)
                    }

                })

            })



		},

		consultaBase_Professoras: (context, payload) => {
			console.log('consultaBase_Professoras >>')
			context.dispatch('zerabase', 'professoras')
			let self = this
			context.state.tabelas['professoras'] = []
			firebase.firestore().collection('professoras').orderBy("data_cadastro").onSnapshot(resposta =>{
				
				const changes = resposta.docChanges()
                changes.forEach(change =>{
					//console.log(change.type)
					//console.log(change.doc.data())

					if(change.type === 'added'){
						let linha = {   
							id: change.doc.id,
							nome: change.doc.data().dados_pessoais.nome + ' ' + change.doc.data().dados_pessoais.sobrenome,
							sobrenome: change.doc.data().dados_pessoais.sobrenome,
							data_nascimento: utilitarios.dataFormatada(change.doc.data().dados_pessoais.data_nascimento.toDate()),
							data_nascimento_order: change.doc.data().dados_pessoais.data_nascimento.toDate(),
							cpf: change.doc.data().dados_pessoais.cpf,
							rg: change.doc.data().dados_pessoais.rg,
							email: change.doc.data().dados_pessoais.email,
							instagram: change.doc.data().dados_pessoais.instagram,
							data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
							data_cadastro_order: change.doc.data().data_cadastro.toDate(),
							turmas: change.doc.data().turmas,
							turmas_len: change.doc.data().turmas.length,
							modalidades: change.doc.data().modalidades.join(', '),
							modalidades_len: change.doc.data().modalidades.length,
							categoria: change.doc.data().categoria,
							situacao: change.doc.data().situacao,

                        }
                        //console.log(linha)
						context.state.tabelas.professoras.push(linha)
					


					}else if (change.type === "modified") {
						console.log("Professora Atualizada: ", change.doc.data().nome);
						let linha = {   
							id: change.doc.id,
							nome: change.doc.data().dados_pessoais.nome + ' ' + change.doc.data().dados_pessoais.sobrenome,
							sobrenome: change.doc.data().dados_pessoais.sobrenome,
							data_nascimento: utilitarios.dataFormatada(change.doc.data().dados_pessoais.data_nascimento.toDate()),
							data_nascimento_order: change.doc.data().dados_pessoais.nascimento.toDate(),
							cpf: change.doc.data().dados_pessoais.cpf,
							rg: change.doc.data().dados_pessoais.rg,
							email: change.doc.data().dados_pessoais.email,
							instagram: change.doc.data().dados_pessoais.instagram,
							data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
							data_cadastro_order: change.doc.data().data_cadastro.toDate(),
							turmas: change.doc.data().turmas,
							turmas_len: change.doc.data().turmas.length,
							modalidades: change.doc.data().modalidades.join(', '),
							modalidades_len: change.doc.data().modalidades.length,
							categoria: change.doc.data().categoria,
							situacao: change.doc.data().situacao,

                        }
						let tabelalen = context.state.tabelas.professoras.length	
						for (let index = 0; index < tabelalen; index++) {
							const element = context.state.tabelas.professoras[index];
							if(element.id == change.doc.id){
								context.state.tabelas.professoras[index] = linha
										
							}
						}	
						
						
					}else if (change.type === "removed") {

						console.log("Professora Removida: ", change.doc.data().nome);
						//let tabelalen = context.state.tabelas.clientes.length	
						for (let index = 0; index < context.state.tabelas.professoras.length; index++) {
							const element = context.state.tabelas.professoras[index];
							if(element.id == change.doc.id){
								//context.state.tabelas.clientes[index] = linha
								context.state.tabelas.professoras.splice(index, 1)
							}
						}	

					}else{
						console.log(`Ocorreu uma mudança (não monitorada) do tipo: ${change.type}`)
					}


				})
			
			})
		},
		
		consultaBase_Turmas: (context, payload) => {
			console.log('consultaBase_Turmas >>')
			context.dispatch('zerabase', 'turmas')
			let self = this
			context.state.tabelas['turmas'] = []

			firebase.firestore().collection('turmas').orderBy("modalidade").onSnapshot(resposta =>{
				
				const changes = resposta.docChanges()
                changes.forEach(change =>{

					console.log(`consultaBase_Turmas >> ${change.type}`)
					console.log(change.doc.data())

					if(change.type === 'added'){

						
						let linha = {   
							id: change.doc.id,
							alunos:change.doc.data().alunos,
							contratos:change.doc.data().contratos,
							categoria: change.doc.data().categoria,
							horario: change.doc.data().horario,
							modalidade: change.doc.data().modalidade,
							professoras: change.doc.data().professoras,
							professoras_nome: null,
							professoras_join: change.doc.data().professoras.join(', '),
							professoras_len: change.doc.data().professoras.length,
							dia_semana: change.doc.data().dia_semana,
							data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
							data_cadastro_order: change.doc.data().data_cadastro.toDate(),

						}
						//change.doc.data().professoras.forEach( professoraId =>{
							let professoraId = change.doc.data().professoras[0]
							firebase.firestore().collection('professoras').doc(professoraId).get().then( resultado2 =>{
								linha.professoras_nome = resultado2.data().dados_pessoais.nome + ' ' + resultado2.data().dados_pessoais.sobrenome
							})
						//})
						
                        //console.log(linha)
						context.state.tabelas.turmas.push(linha)


					}else if (change.type === "modified") {
						console.log("Turma Atualizada: ", change.doc.data().nome);
						let linha = {   
							id: change.doc.id,
							alunos:change.doc.data().alunos,
							contratos:change.doc.data().contratos,
							categoria: change.doc.data().categoria,
							horario: change.doc.data().horario,
							modalidade: change.doc.data().modalidade,
							professoras: change.doc.data().professoras,
							professoras_nome: null,
							professoras_join: change.doc.data().professoras.join(', '),
							professoras_len: change.doc.data().professoras.length,
							dia_semana: change.doc.data().dia_semana,
							data_cadastro: utilitarios.dataFormatada(change.doc.data().data_cadastro.toDate()),
							data_cadastro_order: change.doc.data().data_cadastro.toDate(),

						}
							let professoraId = change.doc.data().professoras[0]
							firebase.firestore().collection('professoras').doc(professoraId).get().then( resultado2 =>{
								linha.professoras_nome = resultado2.data().dados_pessoais.nome + ' ' + resultado2.data().dados_pessoais.sobrenome
							})

						let tabelalen = context.state.tabelas.turmas.length	
						for (let index = 0; index < tabelalen; index++) {
							const element = context.state.tabelas.turmas[index];
							if(element.id == change.doc.id){
								context.state.tabelas.turmas[index] = linha
										
							}
						}	
						
						
					}else if (change.type === "removed") {

						console.log("Turma Removida: ", change.doc.data().nome);
						//let tabelalen = context.state.tabelas.clientes.length	
						for (let index = 0; index < context.state.tabelas.turmas.length; index++) {
							const element = context.state.tabelas.turmas[index];
							if(element.id == change.doc.id){
								//context.state.tabelas.clientes[index] = linha
								context.state.tabelas.turmas.splice(index, 1)
							}
						}	

					}else{
						console.log(`Ocorreu uma mudança (não monitorada) do tipo: ${change.type}`)
					}
				})

			})



		},
		
	
	}

})