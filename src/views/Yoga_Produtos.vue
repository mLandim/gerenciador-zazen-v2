<template>
    <div class="pagina">
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Yoga</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Produtos</span>
           
        </div>

        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Yoga Produtos</div>
                <div class="informacao-quantidades" v-if="tabela.length===tabelafiltro.length">
                    <div class="q-total">({{ tabela.length }} cadastrados)</div>
                </div>
                <div class="informacao-quantidades" v-else>
                    <div class="q-filtrada"> exibindo {{ tabelafiltro.length}} </div><div class="q-total">/{{ tabela.length}} cadastrados</div>
                </div>

                <div class="dock-btn dock-btn-right">
                   <div class="btn" :class="{'btn-desable': exibe=='tabela', 'btn-pdr' : exibe!='tabela'}" @click="exibe='tabela'" >
                        <div class="btn-label">Tabela</div>
                        <font-awesome-icon :icon="['fas', 'border-all']"  class="btn-ico" />
                    </div>
                    <div class="btn" :class="{'btn-desable': exibe=='cards', 'btn-pdr' : exibe!='cards'}"  @click="exibe='cards'" >
                        <div class="btn-label">Blocos</div>
                        <font-awesome-icon :icon="['fas', 'th']"  class="btn-ico" />
                    </div>
                </div>
            </div>


            <template v-if="exibe==='cards'">
            
                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>
                
                </div>

                <div class="lista-itens">
                    
                    <div class="item"  v-for="item in tabelafiltro" :key="item.nome" @click="abreDetalhe(item)">
                        <div class="item-image">
                            <div class="thunb-none"><font-awesome-icon :icon="['fas', 'running']" fixed-width /></div>
                        </div>
                        <div class="item-info">
                            <span class="info-linha1">{{ item.modalidade }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['fas', 'calendar']" size="lg" fixed-width /> {{ item.plano }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['far', 'clock']" size="lg" fixed-width /> {{ item.frequencia }} - {{ item.horario }}h</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width /> {{  item.valor  }}</span>
                        
                            
                        </div>
                        <div class="item-bar">
                            <span :class="{'item-bar-contratos': item.contratos > 0}"><font-awesome-icon :icon="['fas', 'file-invoice-dollar']" size="lg" fixed-width />{{ item.contratos_text }}</span>
                        
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
                </div>

                <div class="cd-grid-container">
                
                    <div class="cd-grid cd-grid-30  cd-shw-0">

                        <div class="cd-grid-title">

                            <span>Clique na Linha para Selecionar...</span>

                            <!-- Comandos para manipular os dados da tabela -->
                            <div class="dock-btn dock-btn-right">
                                <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="novo">
                                    <div class="btn-label">Novo Produto Yoga</div>
                                    <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                                </div>
                            </div>

                        </div>

                        <div class="cd-grid-content">
                        
                            <table class="tabela-formatada"  style="width:100%" cellspacing="0"  >
                                <thead>
                                    <tr>
                                        <template  v-for="(head, key) in tabelaProdutosYoga.tabelaHead" >
                                                    
                                            <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                                                <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                                                <div class="filtro">
                                                    <input v-if="'filterText' in head" type="text"  style="width:86%;"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                                </div>
                                                <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                                                <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenar(tabelaProdutosYoga, tabelaFiltrada, $event)">
                                                        {{head.columnText.trim()}}  
                                                        <font-awesome-icon :icon="['fas', 'caret-up']"  v-if="head.asc" />
                                                        <font-awesome-icon :icon="['fas', 'caret-down']"  v-else-if="head.asc===false" />
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
                                        
                                        <template v-for="(th) in tabelaProdutosYoga.tabelaHead"  >
                                            
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
                                        <th>Exibindo {{tabelaFiltrada.length}} de {{tabelaProdutosYoga.tabelaBody.length}} Registros</th>
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
                
                <div class="formulario-menu">

                    <div class="form-ico-close" @click="fechaDetalhe">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>

                    <div class="formulario-menu-item menu-item-sel">
                        <font-awesome-icon :icon="['fas', 'eye']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Visualizar</div>
                    </div>
                    <div class="formulario-menu-item">
                        <font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Vender</div>
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

            </div>
        </template>
        


    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { setTimeout } from 'timers'
import { utilitarios }  from '../utilitarios'

export default {

    name:'Yoga_Produtos',
    data(){
        return {

            exibe: 'tabela',

            tabela:[],
            filtro:'',

            tabelaProdutosYoga:{
                tabelaTitle:'Produtos Cadastrados - YOGA',
                tabelaHead: [
                    {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:2, columnText:'Plano', columnData:'plano', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:3, columnText:'Frequencia', columnData:'frequencia', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:4, columnText:'horario', columnData:'horario', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:5, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:6, columnText:'Qtde Contratos', columnData:'contratos', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:7, columnText:'Valor', columnData:'valor', type:'number', filterText:'', asc:true, style:{}},
                    
                        
                ],
                tabelaBody:[]
            },
            linhasSelecionadas:[],

            // Controles Formulário
            itemSelecionado:null,
            menuSelecionado:0,
            detalhe: false,
            detalheFechando:false
        }
    },
    computed:{
        ...mapGetters([
            'getUsuarioLogado',
            'getTabela_Produtos'
        ]),
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.filtro
            let arrLen = this.getTabela_Produtos.tabelaYoga.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Produtos.tabelaYoga[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            this.tabelaProdutosYoga.tabelaBody = resultado
            return resultado

        },
         tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaProdutosYoga);
        },
       
    },
    created(){
        console.log('Yoga_Produtos >> Criado')
        console.log(this.getTabela_Produtos.tabelaYoga)
        this.tabela = this.getTabela_Produtos.tabelaYoga
        this.tabelaProdutosYoga.tabelaBody = this.getTabela_Produtos.tabelaYoga // tabelas
        
    },
    watch:{

        getTabela_Produtos: function(val){
            console.log('watch >> getTabela_Produtos')
            
            this.tabela = val.tabelaYoga
            this.tabelaProdutosYoga.tabelaBody = val.tabelaYoga
        }

    },

    methods:{


        // Itens / Tabela
        abreDetalhe(item){

            console.log('abreDetalhe >>')
            this.itemSelecionado = item
            this.detalhe = true

        
        },
        ordenar(tabelaProdutosYoga, tabelaFiltrada, e){
            utilitarios.ordenarTabela(tabelaProdutosYoga, tabelaFiltrada, e)
        },

        // Formulário Detalhe
        fechaDetalhe(){

            console.log('fechaDetalhe >>')
            this.detalheFechando = true

            setTimeout(()=>{
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
