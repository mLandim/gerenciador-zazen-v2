<template>

    <div class="pagina">

        <!-- Representa a árvore de aceeso da página - estilos gerais -->
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Clientes</span>
        </div>

        <!-- Conteúdo exibido na página - Estilos gerais -->
        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Clientes</div>
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
                    <div class="order-conteiner">
                        <span>Ordenar por </span>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'nome')">NOME</div>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'data_nascimento')">ANIVERSÁRIO</div>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'contratos')">QUANTIDADE CONTRATOS</div>
                    </div>
                    <div class="order-conteiner-min">
                        <div class="order-item"><font-awesome-icon :icon="['fas', 'sort-alpha-down']" fixed-width /></div>
                        
                    </div>
                </div>

                <div class="lista-itens">
                    
                    <div class="item"  v-for="item in tabelafiltro" :key="item.nome" @click="abreDetalhe(item)">
                        <div class="item-image">
                            <div class="thunb-none"><font-awesome-icon :icon="['fas', 'user']" fixed-width /></div>
                        </div>
                        <div class="item-info">
                            <span class="info-linha1">{{ item.nome }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> {{ item.email }}</span>
                            <span class="info-linha2" v-if="item.instagram"><font-awesome-icon :icon="['fab', 'instagram']" size="lg" fixed-width /> {{ item.instagram }}</span>
                            
                        </div>
                        <div class="item-bar">
                            <span v-if="item.telefone"><font-awesome-icon :icon="['fas', 'phone']" size="lg" fixed-width />{{ item.telefone }} </span>
                            <span><font-awesome-icon :icon="['fas', 'birthday-cake']" size="lg" fixed-width />{{ item.data_nascimento }}</span>
                            <span v-if="item.contratos" class="item-bar-contratos"><font-awesome-icon :icon="['fas', 'file-invoice-dollar']" size="lg" fixed-width />{{ item.contratos }} Contr. </span>
                        </div>
                    </div>

                </div>

            </template>
            
            <template v-else>
                
                <!--
                <div class="dock-btn-rel ">
                   <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="novo">
                        <div class="btn-label">Novo Cliente</div>
                        <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                    </div>
                </div>
                -->
                <div></div>

                <div class="cd-grid cd-padding-10 cd-shw-0 tabela-card" >

                        <div class="cd-grid-title">

                            <span>Clique na Linha para Selecionar...</span>

                            <!-- Comandos para manipular os dados da tabela -->
                            <div class="dock-btn dock-btn-right">
                                <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="novo">
                                    <div class="btn-label">Novo Cliente</div>
                                    <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                                </div>
                            </div>

                        </div>

                        <div class="cd-grid-content">
                        
                            <table class="tabela-formatada"  style="width:100%" cellspacing="0"  >
                                <thead>
                                    <tr>
                                        <template  v-for="(head, key) in tabelaClientes.tabelaHead" >
                                                    
                                            <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                                                <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                                                <div class="filtro">
                                                    <input v-if="'filterText' in head" type="text"  style="width:86%;"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                                </div>
                                                <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                                                <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="utilitarios.ordenarTabela(tabelaClientes, tabelaFiltrada, $event)">
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
                                        
                                        <template v-for="(th) in tabelaClientes.tabelaHead"  >
                                            
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
                                        <th>Exibindo {{tabelaFiltrada.length}} de {{tabelaClientes.tabelaBody.length}} Registros</th>
                                    </tr>
                                </tfoot>

                            </table>

                        </div>

                </div>

            </template>
            

        
        </div>


        <!-- Novo modelo de Formulário -->
        <template v-if="detalhe">

            <!-- Máscara para bloquear o resto da página enquanto o formulário estiver aberto -->
            <div :class="{'mask-fechando' : detalheFechando, 'mask': detalheFechando===false}"></div>

            <div :class="{'formulario-detalhes-fechando' : detalheFechando, 'formulario-detalhes': detalheFechando===false}" >
                
                <!-- Menu lateral do Formulário -->
                <div class="formulario-menu">

                    <div class="form-ico-close" @click="fechaDetalhe">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>

                    <div class="formulario-menu-item " :class="{'menu-item-sel':menuSelecionado==0}"  @click="menuSelecionado=0">
                        <font-awesome-icon :icon="['fas', 'eye']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Visualizar</div>
                    </div>
                    <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==1}"  @click="menuSelecionado=1">
                        <font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Vender</div>
                    </div>
                    <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==2}"  @click="menuSelecionado=2">
                        <font-awesome-icon :icon="['fas', 'pencil-alt']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Editar</div>
                    </div>
                    <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==3}"  @click="menuSelecionado=3">
                        <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"  class="ico-menu"/>
                        <div class="text-menu">Excluir</div>
                    </div>

                </div>

                <!-- Conteudo do formulário -->
                <div class="fomulario-conteudo">

                    <!-- Visualizar -->
                    <template  v-if="menuSelecionado==0">
                        <div class="formulario-conteudo-titulo">
                            <span>{{itemSelecionado.nome}}</span>
                        </div>
                        <div class="cliente-visualizar">
                            <div class="cliente-bloco">
                                <div class="bloco">
                                    <div class="cliente-foto">
                                        <font-awesome-icon :icon="['fas', 'user']" />
                                    </div>
                                    <div class="cliente-tags">
                                        <label for=""><font-awesome-icon :icon="['fas', 'hashtag']" size="lg" fixed-width />Tags</label>
                                        <span>{{ itemSelecionado.tags.split('|').join(' ') }}</span>
                                    </div>
                                </div>
                                <div class="bloco2">
                                     <div class="formulario-conteudo-item-texto">
                                        <label for=""><font-awesome-icon :icon="['fas', 'address-card']" size="lg" fixed-width /> Documento Id</label>
                                        <span>{{itemSelecionado.cpf}}</span>
                                    </div>
                                    <div class="formulario-conteudo-item-texto">
                                        <label for=""><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> Email</label>
                                        <span>{{itemSelecionado.email}}</span>
                                    </div>
                                    <div class="formulario-conteudo-item-texto" v-if="itemSelecionado.instagram">
                                        <label for=""><font-awesome-icon :icon="['fab', 'instagram']" size="lg" fixed-width /> Instagram</label>
                                        <span>{{itemSelecionado.instagram}}</span>
                                    </div>
                                    <div class="formulario-conteudo-item-texto" >
                                        <label for=""><font-awesome-icon :icon="['fas', 'birthday-cake']" size="lg" fixed-width /> Nascimento</label>
                                        <span>{{itemSelecionado.data_nascimento}}</span>
                                    </div>
                                    <div class="formulario-conteudo-item-texto" v-if="itemSelecionado.telefone">
                                        <label for=""><font-awesome-icon :icon="['fas', 'phone']" size="lg" fixed-width /> Telefone</label>
                                        <span>{{itemSelecionado.telefone}}</span>
                                    </div>
                                     <div class="formulario-conteudo-item-texto">
                                        <label for=""><font-awesome-icon :icon="['fas', 'home']" size="lg" fixed-width /> Endereço</label>
                                        <span>{{itemSelecionado.endereco.logradouro}}, {{itemSelecionado.endereco.numero}}</span>
                                        <span v-if="itemSelecionado.endereco.complemento">{{itemSelecionado.endereco.complemento}}</span>
                                        <span>{{itemSelecionado.endereco.bairro}}, {{itemSelecionado.endereco.cidade}}-{{itemSelecionado.endereco.uf}}</span>
                                        <span v-if="itemSelecionado.endereco.cep">{{itemSelecionado.endereco.cep}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="cliente-bloco2">

                                <div class="cliente-contratos">
                                    <div class="cliente-contratos-titulo">
                                        <span>Contratos</span>
                                    </div>
                                    <div class="cliente-contratos-lista">
                                        <template v-for="item in contratos"  >
                                            <div class="cliente-contratos-item"  :key="item.id"  v-if="item.cliente.id === itemSelecionado.id">
                                                <div class="item-image">
                                                    <div class="thunb-none">
                                                        <font-awesome-icon :icon="getIconeTipoProduto[item.categoria]" fixed-width />
                                                    </div>
                                                </div>
                                                <div class="item-info">
                                                    <span class="info-linha1">{{ item.modalidade }}</span>
                                                    <span class="info-linha2"><font-awesome-icon :icon="['far', 'clock']" size="lg" fixed-width /> {{ item.plano }} - {{ item.frequencia }} - {{ item.horario }}</span>
                                                </div>
                                                <div class="item-bar">
                                                    <span ><font-awesome-icon :icon="['fas', 'check']" size="lg" fixed-width />{{ item.data_inicio }}</span>
                                                    <span ><font-awesome-icon :icon="['fas', 'hourglass-half']" size="lg" fixed-width />{{ item.vencimento_pz }} dias</span>
                                                    <span ><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width />{{ item.valor }}</span>
                                                </div>
                                            </div>
                                        </template>
                                        
                                    </div>    

                                </div>
                                


                            </div>
                        </div>
                    </template>

                    <!-- Vender -->

                    <!-- Editar -->

                    <!-- Excluir -->
                    

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

    name:'clientes',
    data(){
        return {

            exibe: 'tabela',
            // Controles Itens
            tabela:[],
            contratos:[],
            produtos:[],
            filtro:'',


            // Controles Tabela
            tabelaClientes:{
                tabelaTitle:'Clientes',
                tabelaHead: [
                    {colunaId:0, columnText:'Cpf', columnData:'cpf', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Nome', columnData:'nome', type:'string', filterText:'',  asc:null,  style:{width:'20%', textAlign:'left'}},
                    {colunaId:2, columnText:'Email', columnData:'email', type:'string', filterText:'',  asc:null,  style:{width:'20%', textAlign:'left'}},
                    {colunaId:3, columnText:'Igr', columnData:'instagram', type:'string', filterText:'',  asc:null,  style:{width:'10%',textAlign:'left'}},
                    {colunaId:4, columnText:'Data Nascimento', columnData:'data_nascimento', type:'string', filterText:'',  asc:null,  style:{textAlign:'center'}},
                    {colunaId:6, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    {colunaId:7, columnText:'Telefone', columnData:'telefone', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    {colunaId:8, columnText:'Contratos', columnData:'contratos', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    //{colunaId:9, columnText:'Selecionar', columnData:'sel', type:'checkbox', asc:null, style:{width:'6%', textAlign:'center'}},
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
            'getTabela_Clientes',
            'getTabela_Contratos',
            'getTabela_Produtos',
            'getIconeTipoProduto'
        ]),
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.filtro
            let arrLen = this.getTabela_Clientes.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Clientes[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }

            return resultado

        },

        tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaClientes);
        },
       
    },
    created(){
        console.log('Clientes >> Criado')
        console.log(this.getTabela_Clientes)

        this.tabela = this.getTabela_Clientes // itens
        this.tabelaClientes.tabelaBody = this.getTabela_Clientes // tabelas

        console.log(this.getTabela_Contratos)
        this.contratos = [...this.getTabela_Contratos.tabelaYoga, ...this.getTabela_Contratos.tabelaSalas, ...this.getTabela_Contratos.tabelaLoja]
        
    },
    watch:{

        getTabela_Clientes: function(val){
            console.log('watch >> getTabela_Clientes')
            
            this.tabela = val // itens
            this.tabelaClientes.tabelaBody = val // tabelas

        },
        getTabela_Contratos: function(val){
            console.log('watch >> getTabela_Contratos')
            
            this.contratos =  [...val.tabelaYoga, ...val.tabelaSalas, ...val.tabelaLoja]

        }

    },

    methods:{



        abreDetalhe(item){

            console.log('abreDetalhe >>')
            this.itemSelecionado = item
            this.detalhe = true
    
        },

        fechaDetalhe(){

            console.log('fechaDetalhe >>')
            this.detalheFechando = true
            

            setTimeout(()=>{
                this.itemSelecionado = null
                this.detalhe = false
                this.detalheFechando = false
            },1000)
            
        },

        selecionaMenu(menuIndex){
            this.menuSelecionado = menuIndex
        },


        // Ao selecionar
        selecionarLinha(linha){
            linha.sel = true
            let linhasLen = this.linhasSelecionadas.length
            let teste = false
            for (let index = 0; index < linhasLen; index++) {
                const element = this.linhasSelecionadas[index];
                if(element.id === linha.id){
                    teste = true
                    break
                }
            }
            if(!teste){
                this.linhasSelecionadas.push(linha)
            }
        },

        // Ao desselecionar
        desselecionarLinha(linha){
            linha.sel = false
            let linhasLen = this.linhasSelecionadas.length
            for (let index = 0; index < linhasLen; index++) {
                const element = this.linhasSelecionadas[index];
                if(element.id === linha.id){
                    this.linhasSelecionadas.splice(index, 1)
                    break
                }
            }
        },

        selecionaCategoria(item){

            this.totalizadores.forEach(function(valor){

                if(item.nome===valor.nome){
                    valor.selecionado=true
                    valor.style.opacity = 1
                }else{
                    valor.selecionado = false
                    valor.style.opacity = 0.5
                }
            })

        },



        // Abre formulário flutuante para NOVO produto
        novo(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen==0){
                //alert('Novo produto - Em construção...')

                this.$store.dispatch('abreFormularioFlutuante', {id:0, exibe:true})


            }
            
        },
        // Recarrega a base de dados
        recarregarTabela(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen==0){
                
                //this.zerarBase()
                //this.consultaBase3()
                this.$store.dispatch('consultaBase_Clientes', true)

            }
            
        },
        vender(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen>0){
                alert('Vender - Em construção...')
            }
        },
        // Abre formulário com mais detalhes
        detalhes(){
            alert('Exibir  - Em construção...')
        },
        // Abre formulário flutuante para EDITAR produto
        editar(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen>0){
                alert('Editar  - Em construção...')
            }
            
        },
        // EXCLUIR produto
        excluir(){
            let linhasLen = this.linhasSelecionadas.length
            if(linhasLen>0){
                alert('Excluir  - Em construção...')
            }
            
        },


     


    }

}

</script>


<style scoped>

    .cliente-visualizar{
        display: grid;
        grid-template-rows: 1fr 1fr;
        height: calc(100% - 50px);
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
    }

    .cliente-visualizar > .cliente-bloco{
        display: grid;
        grid-template-columns: 200px 1fr;
        height: 100%;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #0099ff;
        box-sizing: border-box;
    }
    .bloco2{
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .cliente-foto{
        display: block;
        position: relative;
        height: 200px;
        line-height: 200px;
        width: 200px;
        background-color: #1b2631;
        border-radius: 10px;
        text-align: center;
        border: 1px solid #0099ff;
        box-sizing: border-box;
    }

    .cliente-foto > svg{
        height: 200px;
        line-height: 200px;
        font-size: 102px;
    }
    
    .cliente-tags > label{
        text-align: left;
        color: #f1f1f1;
        font-size: 11px;
        
    }

    .cliente-tags span{
        display: block;
        position: relative;
        height: 100px;
        line-height: 12px;
        width: 100%;
        text-align: left;
        color: #0099ff;
        font-size: 12px;
        font-weight: 700;
        margin-top: 3px;
        padding: 0 5px;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .cliente-contratos{
        display: grid;
        grid-template-rows: 50px 1fr;
        height: 100%;
        width: 100%;
        
        box-sizing: border-box;
    }
    .cliente-contratos-titulo{
        display: block;
        position: relative;
        height: 50px;
        line-height: 50px;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .cliente-contratos-titulo > span{

        text-align: left;
        color: #0099ff;
        font-size: 28px;
        font-weight: 700;
    }

    .cliente-contratos-lista{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-template-rows: repeat(auto-fill, 98px);
        grid-gap: 8px;
        overflow-y: auto;
        
        box-sizing: border-box;
    }
    .cliente-contratos-item{
        display: grid;
        grid-template-columns: 44px auto;
        grid-template-rows: 70px auto;
        grid-column-gap: 2px;
        background-color: #ffffff;
        height: 98px;
        padding: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        border-radius: 6px;
        overflow: hidden;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        
    }

    @media screen and (max-width: 400px){
        .cliente-foto{display:inline-block; vertical-align: top; height: 50px;line-height: 50px;width: 50px;margin-left: 10px;}
        .cliente-tags{display:inline-block; vertical-align: top; height: 50px; width: calc(100% - 65px);}
        .cliente-tags span{ height: 38px;}
        .cliente-foto > svg{height: 50px;line-height: 50px; font-size: 32px;}
        .cliente-visualizar > .cliente-bloco{grid-template-columns:1fr; grid-template-rows: 50px 1fr;}

    }

</style>
