<template>
    <div class="pagina">
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Yoga</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Professoras</span>
           
        </div>

        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Yoga Professoras</div>
                <div class="informacao-quantidades" v-if="tabela.length===tabelafiltro.length">
                    <div class="q-total" v-if="tabela.length > 1">{{ tabela.length }} cadastrados</div>
                    <div class="q-total" v-else >{{ tabela.length }} cadastrado</div>
                </div>
                <div class="informacao-quantidades" v-else>
                    <div class="q-total"> exibindo {{ tabelafiltro.length}} /</div><div class="q-filtrada">{{ tabela.length}} cadastrados</div>
                </div>

                <div class="dock-btn dock-btn-right">
                   <div class="btn" :class="{'btn-desable': exibe=='tabela', 'btn-pdr' : exibe!='tabela'}" @click="exibe='tabela'" >
                        <div class="btn-label">Tabela</div>
                        <font-awesome-icon :icon="['fas', 'border-all']"  class="btn-ico" />
                    </div>
                    <div class="btn" :class="{'btn-desable': exibe=='cards', 'btn-pdr' : exibe!='cards'}"  @click="exibe='cards'" >
                        <div class="btn-label">Cartões</div>
                        <font-awesome-icon :icon="['fas', 'th']"  class="btn-ico" />
                    </div>
                    <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                        <div class="btn-label">Nova Professora - Yoga</div>
                        <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                    </div>
                </div>
            </div>


            <template v-if="exibe==='cards'">
            
                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>
                    <!-- Comandos para manipular os dados da tabela -->
                    <!--
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Produto - Yoga</div>
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                    -->
                </div>

                <div class="lista-itens">
                    
                    <div class="item"  v-for="item in tabelafiltro" :key="item.nome" @click="abreDetalhe(item)">
                        <div class="item-image">
                            <div class="thunb-none"><font-awesome-icon :icon="['fas', 'running']" fixed-width /></div>
                        </div>
                        <div class="item-info">
                            <span class="info-linha1">{{ item.nome }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> {{ item.email }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['fas', 'running']" size="lg" fixed-width /> {{  item.modalidades  }}</span>
                        
                            
                        </div>
                        <div class="item-bar">
                            <span :class="{'item-bar-contratos': item.contratos > 0}"><font-awesome-icon :icon="['fas', 'users']" size="lg" fixed-width /> {{ item.turmas.length }}</span>
                        
                            <!--<span ><font-awesome-icon :icon="['fas', 'check']" size="lg" fixed-width />{{ item.data_inicio }}</span>
                            <span ><font-awesome-icon :icon="['fas', 'hourglass-half']" size="lg" fixed-width />{{ item.vencimento_pz }} dias</span>
                        
                            <span><font-awesome-icon :icon="['fas', 'birthday-cake']" size="lg" fixed-width />{{ item.data_nascimento }}</span>
                            <span ><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width />{{ item.contratos }}</span>-->
                        </div>
                    </div>

                </div>

            </template>

            <template v-else>
                
                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>
                    <!-- Comandos para manipular os dados da tabela -->
                    <!--
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Produto - Yoga</div>
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                    -->
                </div>

                <div class="cd-grid-container">
                
                    <div class="cd-grid cd-grid-30  cd-shw-0">

                        <div class="cd-grid-title">

                            <span>Clique na Linha para Selecionar...</span>

                        </div>

                        <div class="cd-grid-content">
                        
                            <table class="tabela-formatada"  style="width:100%" cellspacing="0"  >
                                <thead>
                                    <tr>
                                        <template  v-for="(head, key) in tabelaProfessoras.tabelaHead" >
                                                    
                                            <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                                                <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                                                <div class="filtro">
                                                    <input v-if="'filterText' in head" type="text"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                                </div>
                                                <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                                                <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenar(tabelaProfessoras, tabelaFiltrada, $event)">
                                                        {{head.columnText.trim()}}  
                                                        <font-awesome-icon :icon="['fas', 'caret-up']"  class="head-sort-ico" v-if="head.asc" />
                                                        <font-awesome-icon :icon="['fas', 'caret-down']"  class="head-sort-ico" v-else-if="head.asc===false" />
                                                        <span v-else></span>
                                                </div>
                                                <div v-else class="ordem" :class="'head-nosort'">
                                                    {{head.columnText.trim()}} 
                                                </div>
                                                    
                                            </th>
                                                    
                                        </template>
                                        <!--<th class="th"><input  id="cAnexoT" name="cAnexoT" type="checkbox"  /></th>-->
                                    </tr>
                                </thead>
                                <tbody>
                                

                                    <tr v-for="(linha) in tabelaFiltrada" :key="linha.id" @click="abreDetalhe(linha)"> <!--:class="{'tr-x': linha.EXC == 'X'}" @click="clicarLinhaSubconta(linha)"-->
                                        
                                        <template v-for="(th) in tabelaProfessoras.tabelaHead"  >
                                            
                                            <!--
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-if="th.type=='checkbox'" >
                                                <font-awesome-icon :icon="['fas', 'check-square']" size="2x" v-if="linha[th.columnData]" @click="desselecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                                <font-awesome-icon :icon="['fas', 'square']" size="2x" v-else @click="selecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                            </td>
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-else >{{ linha[th.columnData] }}</td>
                                            -->
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" >{{ linha[th.columnData] }}</td>
                                        </template>
                                            

                                    </tr>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Exibindo {{tabelaFiltrada.length}} de {{tabelaProfessoras.tabelaBody.length}} Registros</th>
                                    </tr>
                                </tfoot>

                            </table>

                        </div>

                    </div>

                </div>

            </template>

        </div>


        <!-- Novo modelo de Formulário -->
        <template v-if="detalhe">
            <div :class="{'mask-fechando' : detalheFechando, 'mask': detalheFechando===false}"></div>
            <div :class="{'formulario-detalhes-fechando' : detalheFechando, 'formulario-detalhes': detalheFechando===false}" >
                
                <template v-if="novoItem">
                    <div class="formulario-menu">

                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>

                    </div>
                    <div class="fomulario-conteudo">

                        <div class="formulario-conteudo-titulo">
                            <span>Nova Professora - Yoga</span>
                        </div>
                         <div class="formulario-inputs">

                            <div class="input-container" style="width:30%">
                                <label>Nome *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-model="novoDados.dados_pessoais.nome">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:70%">
                                <label>Sobrenome *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-model="novoDados.dados_pessoais.sobrenome">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Cpf *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-mask="'###.###.###-##'"  v-model="novoDados.dados_pessoais.cpf">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Rg</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"  v-model="novoDados.dados_pessoais.rg">

                                </div>
                            </div>
                            <div class="input-container" style="width:60%">
                                <label>Data de Nascimento *</label>
                                <div class="input-border-context regular-context" style="height:30px;width:30%">
                                    <input type="text" v-mask="'##/##/####'"  v-model="novoDados.dados_pessoais.data_nascimento">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:60%">
                                <label>Email *</label>
                                <div class="input-border-context regular-context" style="height:30px;">
                                    <input type="text"  v-model="novoDados.dados_pessoais.email">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:40%">
                                <label>Instagram</label>
                                <div class="input-border" style="height:30px;">
                                    <input type="text"  v-model="novoDados.dados_pessoais.instagram">
                                </div>
                            </div>

                        </div>

                        <div class="formulario-inputs">

                            <div class="input-container" style="width:100%">
                                <label>Modalidades</label>
                                <div class="input-buttons-list" style="height:auto">
                                    <div class="opc-button" :class="{'opc-sel': novoDados.modalidades.includes(item)}"  v-for="item in controles.modalidades.YOGA.modalidades" :key="item" @click="selecionaModalidade(item)">{{item}}</div>
                                    
                                </div>
                            </div>





                        </div>
                        <div class="formularios-inputs">
                            <div class="input-container" style="width:100%;">
                                <div class="input-button left" @click="cadastrarProfessora"><font-awesome-icon :icon="['fas', 'check']" size="lg" /> Cadastrar</div>
                            </div>
                        </div>


                    </div>
                </template>

                <template v-else>

                    <div class="formulario-menu">

                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>

                        <div class="formulario-menu-item menu-item-sel">
                            <font-awesome-icon :icon="['fas', 'eye']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Visualizar</div>
                        </div>
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'pencil-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Editar</div>
                        </div>
                        
                        
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Excluir</div>
                        </div>

                    </div>
                    <div class="fomulario-conteudo">
                    </div>
                </template>
            </div>
        </template>
        


    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { setTimeout } from 'timers'
import { utilitarios }  from '@/utilitarios'

import {mask} from 'vue-the-mask'
import {Money} from 'v-money'
import firebase from 'firebase'

export default {

    name:'Yoga_Porfessoras',
    directives:{
        mask
    },
    components: {Money},
    data(){
        return {

            exibe: 'tabela',

            tabela:[],
            filtro:'',

            tabelaProfessoras:{
                tabelaTitle:'Professoras Cadastrados - YOGA',
                tabelaHead: [
                    {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Nome', columnData:'nome', type:'string', filterText:'',  asc:true,  style:{width:'20%'}},
                    {colunaId:2, columnText:'Data Cadastro', columnData:'data_cadastro', columnOrder: 'data_cadastro_order',  type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:3, columnText:'Email', columnData:'email', type:'string', filterText:'',  asc:null,  style:{width:'20%'}},
                    {colunaId:4, columnText:'Instagram', columnData:'instagram', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:5, columnText:'Turmas', columnData:'turmas_len', type:'number', filterText:'', asc:null, style:{}},
                    {colunaId:6, columnText:'Modalidades', columnData:'modalidades', type:'string', filterText:'', asc:null, style:{width:'20%'}},
                    {colunaId:7, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{}},
                    
                    
                        
                ],
                tabelaBody:[]
            },
            linhasSelecionadas:[],

            // Controles Formulário
            itemSelecionado:null,
            menuSelecionado:0,
            detalhe: false,
            detalheFechando:false,
            novoItem:false,

            controles:{
                modalidades:{
                    YOGA:{}
                }
            },
            novoDados:{
                categoria:'YOGA',
                dados_pessoais:{
                    nome:'',
                    sobrenome:'',
                    cpf:'',
                    rg:'',
                    data_nascimento:'',
                    email:'',
                    instagram:''
                },
                modalidades:[],
                situacao:'ativo',
                turmas:[],
                data_cadastro:null,
                cadastrado_por:null
            },

            // propriedades da mascara de texto para valor v-money
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                masked: false /* doesn't work with directive */
            }
        }
    },
    computed:{
        ...mapGetters([
            'getUsuarioLogado',
            'getTabela_Professoras',
            'getTabela_Produtos'
        ]),
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.filtro
            let arrLen = this.getTabela_Professoras.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Professoras[index];
                // Permite aplicar o filtro com múltiplos termos - separados por espaço
                if(filtro.includes(' ')){
                    let contaFiltros = 0
                    let filtroArr = filtro.split(' ')
                    for (let index2 = 0; index2 < filtroArr.length; index2++) {
                        const element2 = filtroArr[index2];
                        if(JSON.stringify(element).toUpperCase().includes(element2.toUpperCase()) && resultado.indexOf(element) ===-1){
                            contaFiltros++
                        }
                    }
                    if(contaFiltros===filtroArr.length){
                        resultado.push(element)
                    }
                }else{
                    if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                        resultado.push(element)
                    }
                }
                
            }
            this.tabelaProfessoras.tabelaBody  = resultado
            return resultado

        },
        tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaProfessoras);
        },
       
    },
    created(){
        console.log('Yoga_Produtos >> Criado')
        console.log(this.getTabela_Professoras)
        this.tabela = this.getTabela_Professoras
        this.tabelaProfessoras.tabelaBody = this.getTabela_Professoras // tabelas
        this.inicalizaControles4()
    },
    watch:{

        getTabela_Professoras: function(val){
            console.log('watch >> getTabela_Professoras')
            
            this.tabela = val
            this.tabelaProfessoras.tabelaBody = val
        }

    },

    methods:{


        // Itens / Tabela
        abreDetalhe(item){

            console.log('abreDetalhe >>')
            if(item==='novo'){
                this.novoItem=true
                this.detalhe = true
            }else{

                this.itemSelecionado = item
                this.detalhe = true
            }
        
        },
        ordenar(tabelaProfessoras, tabelaFiltrada, e){
            utilitarios.ordenarTabela(tabelaProfessoras, tabelaFiltrada, e)
        },
        
        inicalizaControles4(){
            console.log('inicalizaControles4')

            let self = this
            this.$db.collection('produtos_cartela').get().then(resultado => {

                resultado.forEach(doc => {
                    
                    if(doc.data().categoria=='YOGA'){
                        self.controles.modalidades.YOGA = doc.data()
                    }else if(doc.data().categoria=='SALA'){
                         self.controles.modalidades.SALA = doc.data()
                    }else{
                         self.controles.modalidades.LOJA = doc.data()
                    }
                    
                })

                console.log(self.controles.modalidades)
                

            }).catch( error => {
                
                console.log(error)
                console.error(`${error.Message}`)

            })

        },
        selecionaModalidade(item){
            let self = this
            if(self.novoDados.modalidades.includes(item)){
                self.novoDados.modalidades.splice(self.novoDados.modalidades.indexOf(item), 1)
            }else{
                self.novoDados.modalidades.push(item)
            }
        },    
        cadastrarProfessora(){

            console.log('cadastrarProfessora')
            let self = this
            //console.log(self.formularios[4].data)
            if(self.novoDados.categoria === 'YOGA'){
                // verificando campos obrigatórios
                if(self.novoDados.categoria.length == 0 || self.novoDados.modalidades.length == 0 || self.novoDados.dados_pessoais.nome.length == 0 || self.novoDados.dados_pessoais.sobrenome.length == 0 || self.novoDados.dados_pessoais.nome.cpf == 0 || self.novoDados.dados_pessoais.email.length == 0 || self.novoDados.dados_pessoais.data_nascimento.length == 0){

                    alert('Informe todos os campos obrigatórios!')

                }else{
                    self.novoDados.dados_pessoais.nome = self.novoDados.dados_pessoais.nome.toUpperCase()
                    self.novoDados.dados_pessoais.sobrenome = self.novoDados.dados_pessoais.sobrenome.toUpperCase()
                    self.novoDados.data_cadastro = new Date()
                    self.novoDados.cadastrado_por = self.getUsuarioLogado.uid
                    self.novoDados.dados_pessoais.data_nascimento = utilitarios.stringToDate(self.novoDados.dados_pessoais.data_nascimento)
                    self.novoDados.dados_pessoais.email = self.novoDados.dados_pessoais.email.toLowerCase()
                    self.novoDados.dados_pessoais.instagram = self.novoDados.dados_pessoais.instagram.toLowerCase()

                    console.log(self.novoDados)

                    this.$db.collection('professoras').add(self.novoDados).then(resposta =>{
                        console.log(resposta.id)
                        console.log(resposta)
                        alert('Cadastro realizado com sucesso!')
                    }).catch(function(error) {
                        console.error("Error adding document: ", error)
                    });

                }
            }else if(self.formularios[4].data.categoria === null){
                alert('Selecione uma categoria para iniciar!')
            }else{
                alert('Em construção...')
            }
            
        },
        // Formulário Detalhe
        fechaDetalhe(){

            console.log('fechaDetalhe >>')
            this.detalheFechando = true

            setTimeout(()=>{
                this.novoItem = false
                this.detalhe = false
                this.itemSelecionado = null
                this.detalheFechando = false
            },1000)
            
        },



         // Abre formulário flutuante para NOVO produto
        novo(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen==0){
                //alert('Novo produto - Em construção...')

                this.$store.dispatch('abreFormularioFlutuante', {id:0, exibe:true})


            }
            
        },


    }

}

</script>
