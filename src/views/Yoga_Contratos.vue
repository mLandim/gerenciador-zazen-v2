<template>
    <div class="pagina">
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Yoga</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Contratos</span>
           
        </div>

        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Yoga Contratos</div>
                <div class="informacao-quantidades" v-if="tabela.length===tabelafiltro.length">
                    <div class="q-total">({{ tabela.length }} cadastrados)</div>
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
                    <div class="btn btn-green"   @click="abreDetalhe('novo')">
                        <div class="btn-label">Novo Contrato - Yoga</div>
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
                    <!--
                    <div class="dock-btn dock-btn-right">
                        <div class="btn btn-green"   @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Contrato - Yoga</div>
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
                            <span class="info-linha1">{{ item.modalidade }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['fas', 'user']" size="lg" fixed-width /> {{ item.cliente.nome }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['far', 'clock']" size="lg" fixed-width /> {{ item.plano }} - {{ item.frequencia }} - {{ item.horario }}</span>
                        
                            
                        </div>
                        <div class="item-bar">
                            <span ><font-awesome-icon :icon="['fas', 'check']" size="lg" fixed-width />{{ item.data_inicio }}</span>
                            <span ><font-awesome-icon :icon="['fas', 'hourglass-half']" size="lg" fixed-width />{{ item.vencimento_pz }} dias</span>
                            <span ><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width />{{ item.valor }}</span>
                            
                        </div>
                    </div>

                </div>
            </template>

            <template v-if="exibe === 'tabela'">

                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>
                    <!-- Comandos para manipular os dados da tabela -->
                    <!--
                    <div class="dock-btn dock-btn-right">
                        <div class="btn btn-green"   @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Contrato - Yoga</div>
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
                                        <template  v-for="(head, key) in tabelaContratosYoga.tabelaHead" >
                                                    
                                            <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->
                                                <div class="filtro">
                                                    <input v-if="'filterText' in head" type="text"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                                </div>
                                                <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenar(tabelaContratosYoga, tabelaFiltrada, $event)">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(linha) in tabelaFiltrada" :key="linha.id" @click="abreDetalhe(linha)"> <!--:class="{'tr-x': linha.EXC == 'X'}" @click="clicarLinhaSubconta(linha)"-->
                                        <template v-for="(th) in tabelaContratosYoga.tabelaHead"  >
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" >{{ linha[th.columnData] }}</td>
                                        </template>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Exibindo {{tabelaFiltrada.length}} de {{tabelaContratosYoga.tabelaBody.length}} Registros</th>
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
                            <span>Novo Contrato - Yoga</span>
                        </div>

                        <div class="formulario-inputs" >
                            <div class="input-container" style="width:100%" v-if="novoContrato.cliente === null">
                                    <label>Clientes</label>
                                    <div class="input-border-context regular-context" style="height:30px;width:30%">
                                        <input type="text" v-model="filtroClientes" placeholder="Filtrar...">
                                        <font-awesome-icon :icon="['fas','search']" fixed-width class="ico-context" />
                                    </div>
                                    <div class="input-itens-list" style="height:200px; overflow-y:auto;">
                                        <div class="item-list" :class="{'item-list-sel': novoContrato.cliente != null && novoContrato.cliente.id === item.id}" style="height:40px;" v-for="item in listaClientesVender" :key="item.id" @click="novoContrato.cliente = item">
                                            <div class="item-cell" style="width:45%;font-weight:700;">{{item.nome}} {{item.sobrenome}}</div>
                                            <div class="item-cell" style="width:35%">{{item.email}}</div>
                                            <div class="item-cell" style="width:20%;">CPF {{item.cpf}}</div>
                                        </div>

                                    </div>
                            </div>
                            <div class="input-container" style="width:100%;height:120px;" v-else>
                                <label>Clientes</label>
                                <div class="input-itens-list-selected" style="height:30px;" >
                                    <div class="item-cell" style="width:96%;font-weight:700;">{{novoContrato.cliente.nome}} {{novoContrato.cliente.sobrenome}}</div>
                                    <div class="item-cell" style="width:4%;"><font-awesome-icon :icon="['fas', 'times']" size="lg" @click="novoContrato.cliente = null" /></div>
                                    
                                    <div class="item-cell" style="width:100%;font-size:12px;">Email: {{novoContrato.cliente.email}}</div>
                                    <div class="item-cell" style="width:100%;font-size:12px;">Instagram: {{novoContrato.cliente.instagram}}</div>
                                    <div class="item-cell" style="width:36%;font-size:12px;">CPF: {{novoContrato.cliente.cpf}}</div>
                                
                                </div>
                            </div>
                        </div>
                        <div class="formulario-inputs" >
                            <div class="input-container" style="width:100%">
                                    <label>Produtos Disponíveis</label>
                                    <div class="input-border-context regular-context" style="height:30px;width:30%">
                                        <input type="text" v-model="filtroProdutos" placeholder="Filtrar...">
                                        <font-awesome-icon :icon="['fas','search']" fixed-width class="ico-context" />
                                    </div>
                                    <div class="input-itens-list" style="height:200px; overflow-y:auto;">
                                        <div class="item-list" :class="{'item-list-sel': novoContrato.produto != null && novoContrato.produto.id === item.id}" style="height:40px;" v-for="item in listaProdutosVender" :key="item.id" @click="novoContrato.produto = item">
                                             <div class="item-cell" style="width:20%">{{item.modalidade}}</div>
                                            <div class="item-cell" style="width:60%">Plano {{item.plano}} - Frequência {{item.frequencia}} - Horário {{item.horario}}h</div>
                                            <div class="item-cell" style="width:20%; font-size:22px; font-weight:700; text-align:center;">R$ {{item.valor}}</div>
                                        </div>

                                    </div>
                            </div>
                        </div>

                         <div class="formularios-inputs" v-if="novoContrato.produto!=null && novoContrato.cliente!=null">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="cadastrarContrato"><font-awesome-icon :icon="['fas', 'check']" size="1x" /> Confirmar Venda</div>
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
                            <font-awesome-icon :icon="['fas', 'check-double']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Renovar</div>
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
import { setTimeout } from 'timers';
import { utilitarios }  from '@/utilitarios'
import firebase from 'firebase'

export default {

    name:'Yoga_Contratos',
    data(){
        return {

            exibe: 'tabela',
            tabela:[],
            filtro:'',

             tabelaContratosYoga:{
                tabelaTitle:'Contratos Cadastrados - YOGA',
                tabelaHead: [
                    {colunaId:0, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:1, columnText:'Plano', columnData:'plano', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:2, columnText:'Data Inicio', columnData:'data_inicio', columnOrder: 'data_inicio_order', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:3, columnText:'Vencimento Data', columnData:'vencimento', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:4, columnText:'Prazo Vencimento (dias)', columnData:'vencimento_pz', type:'number', filterText:'',  asc:null,  style:{}},
                    {colunaId:5, columnText:'Cliente', columnData:'cliente_nome', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:6, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:7, columnText:'Valor', columnData:'valor', type:'number', filterText:'', asc:null, style:{}},
                    
                        
                ],
                tabelaBody:[]
            },

            // Controles Formulário
            itemSelecionado:null,
            menuSelecionado:0,
            detalhe: false,
            detalheFechando:false,
            novoItem:false,

            filtroProdutos:'',
            filtroClientes:'',
            novoContrato:{
                cliente:null,
                produto:null
            }
        }
    },
    computed:{
        ...mapGetters([
            'getUsuarioLogado',
            'getTabela_Clientes',
            'getTabela_Contratos',
            'getTabela_Produtos',
        ]),
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.filtro
            let arrLen = this.getTabela_Contratos.tabelaYoga.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Contratos.tabelaYoga[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            this.tabelaContratosYoga.tabelaBody = resultado
            return resultado

        },
        tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaContratosYoga);
        },
        listaProdutosVender:function(){
            let self = this
            let resultado = []
            let filtro = this.filtroProdutos
            let arrLen = this.getTabela_Produtos.tabelaYoga.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Produtos.tabelaYoga[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            //this.tabelaClientes.tabelaBody = resultado
            return resultado
        },
        listaClientesVender:function(){
            let self = this
            let resultado = []
            let filtro = this.filtroClientes
            let arrLen = this.getTabela_Clientes.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Clientes[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            //this.tabelaClientes.tabelaBody = resultado
            return resultado
        }
       
    },
    created(){
        console.log('Yoga_Contratos >> Criado')
        console.log(this.getTabela_Contratos.tabelaYoga)
        this.tabela = this.getTabela_Contratos.tabelaYoga
        this.tabelaContratosYoga.tabelaBody = this.getTabela_Contratos.tabelaYoga // tabelas
        
    },
    watch:{

        getTabela_Contratos: function(val){
            console.log('watch >> getTabela_Contratos')
            
            this.tabela = val.tabelaYoga
            this.tabelaContratosYoga.tabelaBody = val.tabelaYoga

        }

    },

    methods:{



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
        // Vender produto para o CLiente
        cadastrarContrato(){
                let self = this
                //let clienteSelecionado = this.itemSelecionado
                // Validação temporária
                if(this.novoContrato.produto!==null && this.novoContrato.cliente!==null){


                    let linha = {
                        cliente:[this.novoContrato.cliente.id],
                        data_inicio:new Date(),
                        produto:[this.novoContrato.produto.id],
                        turma:[''],
                        situacao:'ativo',
                        valor_total:this.novoContrato.produto.valor
                    }

                    //let batch = this.$db.batch()
                    //let updateCliente = this.$db.collection("clientes").doc(this.formularios[2].clienteSelecionado.id);
                    //batch.update(updateCliente, {"contratos": FieldValue.arrayUnion()});


                    this.$db.collection('contratos').add(linha).then(resposta =>{
                        console.log(resposta.id)
                        console.log(resposta)

                        // Atualizando informações do cliente com o novo contrato
                        self.$db.collection("clientes").doc(self.novoContrato.cliente.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
                            console.log("Clientes atualizados com sucesso")
                        }).catch(error2 =>{
                            console.error("Error adding document: ", error)
                        })
                        // Atualizando informações do produto com o novo contrato
                        self.$db.collection("produtos").doc(self.novoContrato.produto.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
                            console.log("Produtos atualizados com sucesso")
                        }).catch(error3 =>{
                            console.error("Error adding document: ", error)
                        })


                        alert('Cadastrato com sucesso!')


                    }).catch(function(error) {
                        console.error("Error adding document: ", error)
                    });

                }else{
                    alert("Selecione um Cliente e um Produto.")
                }

        },






    }

}

</script>


<style scoped>


</style>
