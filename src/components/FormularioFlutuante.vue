<template>
    <div class="formulario-flutuante">
        <div class="mask"></div>


    <!-- Cadastros ###################################################################################################################################### -->


        <!-- Formulario com id 0 => Novo Cliente -->
        <template v-if="getFormularioFlutuante.id==0">
            <div id="form-0" class="form">
                <div class="form-decora"></div> 
                <div class="form-title">
                    <span><font-awesome-icon :icon="['fas', 'smile']" size="lg" /> Novo Cliente</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>

                <div class="form-content">

                    <div class="form-card card-white">

                        <div class="form-separate">Dados Pessoais</div>

                        <div class="form-input" style="width: 30%">
                            <input type="text"   v-model="formularios[0].dados.nome">
                            <label >Nome<span class="obg">*</span></label>
                        </div>
                        <div class="form-input" style="width: 60%">
                            <input type="text"   v-model="formularios[0].dados.sobrenome">
                            <label >Sobrenome</label>
                        </div>
                        <div class="form-input" style="width: 60%">
                            <input type="text"   v-model="formularios[0].dados.email">
                            <label >Email<span class="obg">*</span></label>
                        </div>
                        <div class="form-input" style="width: 30%">
                            <input type="text"   v-model="formularios[0].dados.instagram">
                            <label >Instagram</label>
                        </div>
                        <div class="form-input" style="width: 30%">
                            <input type="text" v-mask="'###.###.###-##'"  v-model="formularios[0].dados.cpf">
                            <label >CPF (Somente números)<span class="obg">*</span></label>
                        </div>
                        <div class="form-input" style="width: 30%">
                            <input type="text"  v-model="formularios[0].dados.rg">
                            <label >RG (Somente números)<span class="obg">*</span></label>
                        </div>

                        <div class="form-end-line"></div>

                        <div class="form-input" style="width: 16%">
                            <input type="text" v-mask="'##/##/####'"  v-model="formularios[0].dados.nascimento">
                            <label >Data Nascimento<span class="obg">*</span></label>
                        </div>

                    </div>

                    <div class="form-separate-simple"></div>

                    <div class="form-card card-white">

                        <div class="form-separate">Endereço e Telefone</div>

                        <div class="form-input" style="width: 20%">
                            <input type="text"  v-mask="'#####-###'" v-model="formularios[0].dados.endereco.cep" @blur="consultaCep($event, formularios[0].dados.endereco)">
                            <label >CEP (Somente números)</label>
                        </div>

                        <div class="form-end-line"></div>

                        <div class="form-input" style="width: 70%">
                            <input type="text"   v-model="formularios[0].dados.endereco.logradouro">
                            <label >Endereço (Rua, Avenida, Travessa...)</label>
                        </div>
                        <div class="form-input" style="width: 20%">
                            <input type="text"  v-model="formularios[0].dados.endereco.numero">
                            <label >Número</label>
                        </div>
                        <div class="form-input" style="width: 80%">
                            <input type="text"   v-model="formularios[0].dados.endereco.complemento">
                            <label >Complemento (número do apartamento, casa...)</label>
                        </div>
                        <div class="form-input" style="width: 30%">
                            <input type="text"  v-model="formularios[0].dados.endereco.bairro">
                            <label >Bairro</label>
                        </div>
                        <div class="form-input" style="width: 30%">
                            <input type="text"  v-model="formularios[0].dados.endereco.cidade">
                            <label >Cidade</label>
                        </div>
                        <div class="form-input" style="width: 5%">
                            <input type="text" v-mask="'AA'" v-model="formularios[0].dados.endereco.uf">
                            <label >UF</label>
                        </div>
                        
                        <div class="form-end-line"></div>

                        <div class="form-input" style="width: 6%">
                            <input type="text" v-mask="'##'"  v-model="formularios[0].dados.telefone.ddd">
                            <label >DDD</label>
                        </div>
                        <div class="form-input" style="width: 12%">
                            <input type="text" v-mask="'#########'"  v-model="formularios[0].dados.telefone.numero">
                            <label >Telefone</label>
                        </div>

                    </div>

                </div>

                
                <div class="form-commands">
                    <div class="dock-btn dock-btn-right" style="top:5px;">
                        <div class="btn" :class="{'btn-green': formularios[0].validado, 'btn-desable' : formularios[0].validado==false}"  @click="cadastrarCliente">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

         <!-- Formulario com id 1 => Novo Colaborador -->
        <template v-if="getFormularioFlutuante.id==1">
            <div id="form-1" class="form">
                <div class="form-title">
                    <span>Novo Colaborador</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>
                <div class="form-content">


                </div>
                <div class="form-commands">
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': formularios[1].validado, 'btn-desable' : formularios[1].validado==false}"  @click="cadastrarColaborador">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

         <!-- Formulario com id 2 => Novo Contrato -->
        <template v-if="getFormularioFlutuante.id==2">
            <div id="form-2" class="form">
                <div class="form-decora"></div>
                <div class="form-title">
                    <span><font-awesome-icon :icon="['far', 'handshake']" size="lg" /> Novo Contrato</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>
                <div class="form-content grid-form-2">

                    <div class="clientes-selecao form-card card-f1">
                            <div class="form-block-label">Clientes</div>
                            <div class="input-mask">
                                <input type="text" v-model="formularios[2].clienteFiltro" placeholder="Procurar por Nome..." /> 
                                <font-awesome-icon :icon="['fas', 'search']" size="lg" fixed-width />
                            </div>
                            <div class="form-block-controle-filtro">
                                <template v-for="cliente in formulario2_clientesFiltro" >
                                    <div class="form-block-item" :class="{'form-block-item-sel' : formularios[2].clienteSelecionado != null && formularios[2].clienteSelecionado.id == cliente.id}" :key="cliente.id" @click="selecionaCliente(cliente)" >{{cliente.nome.toUpperCase()}}</div>
                                </template>
                            </div>   
                    </div>

                    <div class="clientes-detalhes form-card card-white" v-if="formularios[2].clienteSelecionado != null">
                                
                            <div class="cliente-id">ID Cliente {{ formularios[2].clienteSelecionado.id }}</div>
                                
                            <div class="cliente-detalhes-item">
                                    <label >CPF</label>
                                    <span>{{ formularios[2].clienteSelecionado.cpf }}</span>
                            </div>
                            <div class="cliente-detalhes-item">
                                    <label >Email</label>
                                    <span>{{ formularios[2].clienteSelecionado.email.toLowerCase() }}</span>
                            </div>
                            <div class="cliente-detalhes-item" v-if="'instagram' in formularios[2].clienteSelecionado">
                                    <label >Instagram</label>
                                    <span>{{ formularios[2].clienteSelecionado.instagram.toLowerCase() }}</span>
                            </div>
                            <div class="cliente-detalhes-item" v-if="'endereco' in formularios[2].clienteSelecionado" >
                                    <label >Endereço</label>
                                    <span v-if="'logradouro' in formularios[2].clienteSelecionado.endereco"> {{ formularios[2].clienteSelecionado.endereco.logradouro.toUpperCase() }} - {{ formularios[2].clienteSelecionado.endereco.numero }}</span>
                                    <span v-if="'complemento' in formularios[2].clienteSelecionado.endereco"> {{ formularios[2].clienteSelecionado.endereco.complemento.toUpperCase() }}</span>
                                    <span v-if="'bairro' in formularios[2].clienteSelecionado.endereco"> {{ formularios[2].clienteSelecionado.endereco.bairro.toUpperCase() }} - {{ formularios[2].clienteSelecionado.endereco.cidade.toUpperCase() }}</span>
                                    <span> {{ formularios[2].clienteSelecionado.endereco.cep }}</span>
                                    
                            </div>
                            <div class="cliente-detalhes-item" v-if="'telefone' in formularios[2].clienteSelecionado">
                                    <label >Contato</label>
                                    <span>{{ formularios[2].clienteSelecionado.telefone }}</span>
                            </div>

                    </div>

                    <div class="categorias-selecao form-card card-white">
                        <div class="form-block-label">Selecione a Categoria</div>

                        <div class="item-categoria yoga" @click="form2_selecionarCategoria('tabelaYoga')">
                            <div class="item-nome">YOGA</div>
                            <div class="item-total">{{getTabela_Produtos.tabelaYoga.length}}</div>
                        </div>
                        <div class="item-categoria salas" >
                            <div class="item-nome">SALAS</div>
                            <div class="item-total">{{getTabela_Produtos.tabelaSalas.length}}</div>
                        </div>
                        <div class="item-categoria loja" >
                            <div class="item-nome">LOJA</div>
                            <div class="item-total">{{getTabela_Produtos.tabelaLoja.length}}</div>
                        </div>

                    </div>

                    <div class="tabela-produtos form-card card-white" v-if="formularios[2].tabelaSel !='' ">
                        
                        <table class="tabela-formatada"  style="width:100%" cellspacing="0" v-if="formularios[2].tabelaSel !='' " >
                            <thead>
                                <tr>
                                    <template  v-for="(head, key) in formularios[2].tabelas[formularios[2].tabelaSel].tabelaHead" :v-key="head.colunaId">
                                                    
                                        <th :key="head.colunaId" class="th" :style="head.style" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                                            <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                                            <div class="filtro">
                                                <input v-if="'filterText' in head" type="text"  style="width:86%;"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                            </div>
                                            <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                                            <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenarTabela(formularios[2].tabelas[formularios[2].tabelaSel], tabelaFiltrada, $event)">
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
                               
                                <tr v-for="linha in tabelaFiltrada" :key="linha.id" :class="{'sel': formularios[2].produtoSelecionado != null && linha.id === formularios[2].produtoSelecionado.id }" @click="clicarLinhaProduto(linha)"> <!--:class="{'tr-x': linha.EXC == 'X'}" @click="clicarLinhaSubconta(linha)"-->
                                        
                                    <template v-for="th in formularios[2].tabelas[formularios[2].tabelaSel].tabelaHead"  >
                                            
                                            
                                        <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-if="th.type=='checkbox'">
                                            <font-awesome-icon :icon="['fas', 'check-square']" size="2x" v-if="linha[th.columnData]" @click="desselecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                            <font-awesome-icon :icon="['fas', 'square']" size="2x" v-else @click="selecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                        </td>
                                        <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-else >{{ linha[th.columnData] }}</td>
                                    </template>
                                            

                                </tr>

                            </tbody>
                            <tfoot><tr> <th>Clique na Linha para Selecionar <span v-if="formularios[2].produtoSelecionado != null">(1 Selecionado)</span> - Exibindo {{tabelaFiltrada.length}} de {{formularios[2].tabelas[formularios[2].tabelaSel].tabelaBody.length}} Registros </th></tr></tfoot>
                        </table>


                    </div>

                </div>

                <div class="form-commands">
                    <div class="dock-btn dock-btn-right" style="top:5px;">
                        <div class="btn" :class="{'btn-green': formularios[2].validado, 'btn-desable' : formularios[2].validado==false}"  @click="cadastrarContrato">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

         <!-- Formulario com id 3 => Nova Turma -->
        <template v-if="getFormularioFlutuante.id==3">
            <div id="form-3" class="form">
                <div class="form-title">
                    <span>Nova Turma</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>
                <div class="form-content">


                </div>
                <div class="form-commands">
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': formularios[3].validado, 'btn-desable' : formularios[3].validado==false}"  @click="cadastrarTurma">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

        
         <!-- Formulario com id 4 => Novo Produto -->
        <template v-if="getFormularioFlutuante.id==4">
            <div id="form-4" class="form">
                <div class="form-decora"></div>
                <div class="form-title">
                    <span><font-awesome-icon :icon="['fas', 'cookie-bite']" size="lg" /> Novo Produto</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>
                <div class="form-content">

                    <div class="form-block-grid">

                        <div class="form-block">
                            <div class="form-block-label">Categorias</div>
                            <div class="form-block-controle">
                                <template v-for="item in formularios[4].controles.categorias" >
                                    <div class="form-block-item" :class="{'form-block-item-sel' : formularios[4].data.categoria == item.nome}" :key="item.id" @click="formularios[4].data.categoria = item.nome">{{item.nome}}</div>
                                </template>
                            </div>
                        </div>

                        <template v-if="formularios[4].data.categoria === 'YOGA'">

                            <div class="form-block" v-if="formularios[4].data.categoria">
                                <div class="form-block-label">Modalidades</div>
                                <div class="form-block-controle">
                                    <template v-for="item in formularios[4].controles.modalidades[formularios[4].data.categoria].modalidades" >
                                        <div class="form-block-item" :class="{'form-block-item-sel' : formularios[4].data.modalidade == item}" :key="item" @click="formularios[4].data.modalidade = item">{{item}}</div>
                                    </template>
                                </div>
                            </div>

                            <div class="form-block" v-if="formularios[4].data.categoria">
                                <div class="form-block-label">Planos</div>
                                <div class="form-block-controle">
                                    <template v-for="item in formularios[4].controles.modalidades[formularios[4].data.categoria].planos" >
                                        <div class="form-block-item" :class="{'form-block-item-sel' : formularios[4].data.plano == item}" :key="item" @click="formularios[4].data.plano = item">{{item}}</div>
                                    </template>
                                </div>
                            </div>

                            <div class="form-block" v-if="formularios[4].data.categoria">
                                <div class="form-block-label">Frequência</div>
                                <div class="form-block-controle">
                                    <template v-for="item in formularios[4].controles.modalidades[formularios[4].data.categoria].frequencia" >
                                        <div class="form-block-item" :class="{'form-block-item-sel' : formularios[4].data.frequencia == item}" :key="item" @click="formularios[4].data.frequencia = item">{{item}}</div>
                                    </template>
                                </div>
                            </div>

                            <div class="form-block" v-if="formularios[4].data.categoria">
                                <div class="form-block-label">Horários</div>
                                <div class="form-block-controle">
                                    <template v-for="item in formularios[4].controles.modalidades[formularios[4].data.categoria].horario" >
                                        <div class="form-block-item" :class="{'form-block-item-sel' : formularios[4].data.horario == item}" :key="item" @click="formularios[4].data.horario = item">{{item}}</div>
                                    </template>
                                </div>
                            </div>

                        </template>
                        

                        <div class="form-block" v-if="formularios[4].data.categoria">
                            <div class="form-block-label">Valor</div>
                            <div class="form-block-controle">
                                <div class="input-mask">
                                    <money v-model="formularios[4].data.valor" v-bind="money"></money> 
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="form-commands">
                    <div class="dock-btn dock-btn-right" style="top:5px;" >
                        <div class="btn" :class="{'btn-green': formularios[4].validado, 'btn-desable' : formularios[4].validado==false}"  @click="cadastrarProduto">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

        <!-- Formulario com id 5 => Novo Agendamento -->
        <template v-if="getFormularioFlutuante.id==5">
            <div id="form-3" class="form">
                <div class="form-title">
                    <span>Novo Agendamento</span>
                    <div class="form-ico-close" @click="fecharFormulario">
                        <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                    </div>
                </div>
                <div class="form-content">


                </div>
                <div class="form-commands">
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': formularios[5].validado, 'btn-desable' : formularios[5].validado==false}"  @click="cadastrarAgendamento">
                            <div class="btn-label">Cadastrar</div>
                            <font-awesome-icon :icon="['fas', 'check']" size="lg" class="btn-ico" />
                        </div>
                    </div>
                </div>

            </div>
        </template>

    <!-- Edições   ###################################################################################################################################### -->


    <!-- Mais Detalhes ################################################################################################################################## -->


    </div>



</template>
<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import {mask} from 'vue-the-mask'
import {Money} from 'v-money'

import { utilitarios } from '@/utilitarios'

import firebase from 'firebase'

export default {
    directives:{
        mask
    },
    components: {Money},
    name:'formulario-flutuante',
    data(){
        return {

            // Controle dos dados de cada formulário
            formularios:[
                // Clientes
                {
                    id:0,
                    tipo:'clientes',    
                    dados:{
                        nome:'',
                        sobrenome:'',
                        email:'',
                        instagram:'',
                        cpf:'',
                        rg:'',
                        endereco:{
                            logradouro:'',
                            numero:'',
                            complemento:'',
                            cep:'',
                            bairro:'',
                            cidade:'',
                            uf:''

                        },
                        telefone:{
                            ddd:'',
                            numero:'',
                        },
                        
                        nascimento:'',
                        observacoes:'',
                        data_cadastro:'',
                        contratos:[],
                        ativo: true,
                        cadastrado_por:''
                    },
                    
                    validado:true
                },

                {
                   
                    validado:false
                },
                // Contratos
                {
                   
                    validado:true,
                    clienteFiltro:'',
                    clienteSelecionado:null,
                    produtoSelecionado:null,
                    tabelaSel:'',
                    tabelas:{
                        // Tabela com exibição 
                        tabelaYoga:{
                            tabelaTitle:'Produtos Cadastrados - YOGA',
                            tabelaHead: [
                                //{colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                                {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{textAlign:'center'}},
                                {colunaId:2, columnText:'Plano', columnData:'plano', type:'string', filterText:'',  asc:null,  style:{textAlign:'center'}},
                                {colunaId:3, columnText:'Frequencia', columnData:'frequencia', type:'string', filterText:'',  asc:null,  style:{textAlign:'center'}},
                                {colunaId:4, columnText:'horario', columnData:'horario', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                                {colunaId:5, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                                //{colunaId:6, columnText:'Qtde Contratos', columnData:'contratos', type:'string', filterText:'', asc:null, style:{}},
                                {colunaId:7, columnText:'Valor', columnData:'valor', type:'number', filterText:'', asc:true, style:{textAlign:'center'}},
                                //{colunaId:8, columnText:'Selecionar', columnData:'sel', type:'checkbox', asc:null, style:{}},
                                
                            ],
                            tabelaBody:[]
                        },
                        tabelaSalas:{
                            tabelaTitle:'Produtos Disponíveis para Comercialização - SALAS',
                            tabelaHead: [
                                {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                                {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:2, columnText:'Plano', columnData:'plano', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:3, columnText:'Frequencia', columnData:'frequencia', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:4, columnText:'horario', columnData:'horario', type:'string', filterText:'', asc:null, style:{}},
                                {colunaId:5, columnText:'Qtde Contratos', columnData:'contratos', type:'string', filterText:'', asc:null, style:{}},
                                {colunaId:6, columnText:'Valor', columnData:'valor', type:'number', filterText:'', asc:null, style:{}},
                                //{colunaId:7, columnText:'Contratos', columnData:'contratos', type:'number', filterText:'', asc:null, style:{}},
                            ],
                            tabelaBody:[]
                        },
                        tabelaLoja:{
                            tabelaTitle:'Produtos Disponíveis para Comercialização - LOJA',
                            tabelaHead: [
                                {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                                {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:2, columnText:'Plano', columnData:'plano', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:3, columnText:'Frequencia', columnData:'frequencia', type:'string', filterText:'',  asc:null,  style:{}},
                                {colunaId:4, columnText:'horario', columnData:'horario', type:'string', filterText:'', asc:null, style:{}},
                                {colunaId:5, columnText:'Professor(a)', columnData:'professor', type:'string', filterText:'', asc:null, style:{}},
                                {colunaId:6, columnText:'Valor', columnData:'valor', type:'number', filterText:'', asc:null, style:{}},
                                //{colunaId:7, columnText:'Contratos', columnData:'contratos', type:'number', filterText:'', asc:null, style:{}},
                            ],
                            tabelaBody:[]
                        },
                    }
                },

                {
                    
                    validado:false
                },

                //Produtos
                {
                    id:4,
                    tipo:'produtos', 
                    data:{
                        categoria:null,
                        modalidade:null,
                        plano:null,
                        horario:null,
                        frequencia:null,
                        situacao:'ativo',
                        valor:0,
                        contratos:[],
                        data_cadastro:null,
                        cadastrado_por:null
                    },
                    controles:{
                        categorias:[
                            {id:0,nome:'YOGA'},
                            {id:1,nome:'SALA'},
                            {id:2,nome:'LOJA'}
                        ],
                        modalidades:{
                            YOGA:{},
                            SALA:{},
                            LOJA:{}
                        },
                        categoria:null,
                        modalidade:null,
                        plano:null,
                        horario:null,
                        frequencia:null
                        
                    },
                    validado:true
                }
            ],

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
            'getTitulo',
            'getUsuarioLogado',
            'getListaUsuariosVisiveis',
            'getFormularioFlutuante',
            'getTabela_Clientes',
            'getTabela_Produtos'
        ]),

        formulario2_clientesFiltro: function(){
            let self = this
            let resultado = []
            let filtro = this.formularios[2].clienteFiltro
            let arrLen = this.getTabela_Clientes.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Clientes[index];

                if(element.nome.toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }

            return resultado

        },

        tabelaFiltrada:function(){
           /* let tabela = ''
            this.totalizadores.forEach(function(item){
                if(item.selecionado){
                    tabela = item.tabelaNome
                    
                }else{

                }
            })*/
            return this.filtrandoTabela( this.formularios[2].tabelas[this.formularios[2].tabelaSel] );
        },

    },
    created(){

        switch (this.getFormularioFlutuante.id) {
            case 0:
                
                break;
            case 4:
                console.log(`Formulario nº ${this.getFormularioFlutuante.id}`)

                this.inicalizaControles4()


                break;
            default:
                break;
        }

    },
    methods:{

    // Geral
        fecharFormulario(){
            this.$store.dispatch('abreFormularioFlutuante', {id:null, exibe:false})
        },

    // Formulario 0 - Clientes
        consultaCep(e, formulario){

            let self = this
            const cep = e.target.value
            console.log(cep)
            if(cep.length>0){
                this.$http.get('https://viacep.com.br/ws/' + cep + '/json/').then( resposta =>{

                    console.log(resposta.data)
                    let resultado = resposta.data
                    formulario.logradouro = resultado.logradouro
                    formulario.bairro = resultado.bairro
                    formulario.cidade = resultado.localidade
                    formulario.uf = resultado.uf

                }).catch(error => {
                    console.error(error)
                })
            }else{
                console.log('cep vazio')
            }

            

        },

        cadastrarCliente(){

            console.log('cadastrarCliente')
            let self = this
            // verificando campos obrigatórios
            if(self.formularios[0].dados.nome.length == 0 || self.formularios[0].dados.email.length == 0 || self.formularios[0].dados.cpf.length == 0 || self.formularios[0].dados.rg.length == 0 || self.formularios[0].dados.nascimento.length == 0){

                alert('Preencha todos os campos obrigatórios! (*)')

            }else{

                self.formularios[0].dados.data_cadastro = new Date()
                self.formularios[0].dados.nascimento = utilitarios.stringToDate(self.formularios[0].dados.nascimento)
                self.formularios[0].dados.cadastrado_por = self.getUsuarioLogado.uid
                self.formularios[0].dados.email = self.formularios[0].dados.email.toLowerCase()
                self.formularios[0].dados.instagram = self.formularios[0].dados.instagram.toLowerCase()

                this.$db.collection('clientes').add(self.formularios[0].dados).then(resposta =>{
                    console.log(resposta.id)
                    console.log(resposta)
                    alert('Cadastrato com sucesso!')
                }).catch(function(error) {
                    console.error("Error adding document: ", error)
                });

            }
            


        },

    // Formulario 1 - Colaborador

        cadastrarColaborador(){

        },
    
    // Formulario 2 - Contrato
        selecionaCliente(cliente){

            this.formularios[2].clienteSelecionado = cliente

        },
        form2_selecionarCategoria(categoria){

            this.formularios[2].tabelas[categoria].tabelaBody = this.getTabela_Produtos[categoria]
            this.formularios[2].tabelaSel = categoria
        },
        clicarLinhaProduto(linhaProduto){
            if(this.formularios[2].produtoSelecionado===null){
                 this.formularios[2].produtoSelecionado = linhaProduto
            }else{
                if(this.formularios[2].produtoSelecionado.id === linhaProduto.id){
                    this.formularios[2].produtoSelecionado = null
                }else{
                    this.formularios[2].produtoSelecionado = linhaProduto
                }
            }
            
            
        },
        cadastrarContrato(){
            let self = this
            // Validação temporária
            if(this.formularios[2].produtoSelecionado!==null && this.formularios[2].clienteSelecionado!==null){


                let linha = {
                    cliente:[this.formularios[2].clienteSelecionado.id],
                    data_inicio:new Date(),
                    produto:[this.formularios[2].produtoSelecionado.id],
                    turma:[''],
                    situacao:'ativo',
                    valor_total:this.formularios[2].produtoSelecionado.valor
                }

                //let batch = this.$db.batch()
                //let updateCliente = this.$db.collection("clientes").doc(this.formularios[2].clienteSelecionado.id);
                //batch.update(updateCliente, {"contratos": FieldValue.arrayUnion()});


                this.$db.collection('contratos').add(linha).then(resposta =>{
                    console.log(resposta.id)
                    console.log(resposta)

                    self.$db.collection("clientes").doc(self.formularios[2].clienteSelecionado.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
                        console.log("Clientes atualizados com sucesso")
                    }).catch(error2 =>{
                        console.error("Error adding document: ", error)
                    })
                    self.$db.collection("produtos").doc(self.formularios[2].produtoSelecionado.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
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

    // Formulario 3 - Turma

        cadastrarTurma(){

        },

    // Formulario 4 - Produtos   

        inicalizaControles4(){
            console.log('inicalizaControles4')

            let self = this
            this.$db.collection('produtos_cartela').get().then(resultado => {

                resultado.forEach(doc => {
                    
                    if(doc.data().categoria=='YOGA'){
                        self.formularios[4].controles.modalidades.YOGA = doc.data()
                    }else if(doc.data().categoria=='SALA'){
                         self.formularios[4].controles.modalidades.SALA = doc.data()
                    }else{
                         self.formularios[4].controles.modalidades.LOJA = doc.data()
                    }
                    
                })

                console.log(self.formularios[4].controles.modalidades)
                

            }).catch( error => {
                
                console.log(error)
                console.error(`${error.Message}`)

            })

        },

        cadastrarProduto(){

            console.log('cadastrarProduto')
            let self = this
            //console.log(self.formularios[4].data)
            if(self.formularios[4].data.categoria === 'YOGA'){
                // verificando campos obrigatórios
                if(self.formularios[4].data.categoria.length == 0 || self.formularios[4].data.modalidade == null || self.formularios[4].data.plano == null || self.formularios[4].data.frequencia == null || self.formularios[4].data.valor == 0){

                    alert('Informe todos os campos!')

                }else{

                    self.formularios[4].data.data_cadastro = new Date()
                    self.formularios[4].data.cadastrado_por = self.getUsuarioLogado.uid
                    
                    console.log(self.formularios[4].data)

                    this.$db.collection('produtos').add(self.formularios[4].data).then(resposta =>{
                        console.log(resposta.id)
                        console.log(resposta)
                        alert('Cadastrato com sucesso!')
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
    
    // Formulario 5 - Agendamentos 

        cadastrarAgendamento(){

        },

    
    //**************************************************************************************************************************
    //Ordem e Filtros
    //Ordenar tabela
            aplicarOrdem:function(tabelaFiltradaRec, orderAsc, property){
                var self = this;
                tabelaFiltradaRec.sort(function(obj1, obj2){
                    if(orderAsc){
                        if (obj1[property] < obj2[property]){
                            return -1;
                        }else if (obj1[property] > obj2[property]){
                            return 1;
                        }else{
                            return 0;
                        }
                    }else{
                        if (obj1[property] < obj2[property]){
                            return 1;
                        }else if (obj1[property] > obj2[property]){
                            return -1;
                        }else{
                            return 0;
                        } 
                    }  
                });
            },
            //Ordenando tabela > Chama sortApply
            ordenarTabela:function(tabelaRec, tabelaFiltradaRec, event){
                
                var self = this;
                var colData = 'columnData';//event.target.id;
                var targetIndex = event.target.id;
                for (var index = 0, totalHead = tabelaRec.tabelaHead.length; index < totalHead; index++) {
                    var element = tabelaRec.tabelaHead[index];
                    //console.log(' >> '+index+' x '+targetIndex);
                    if(index==targetIndex){
                        console.log(' >> '+element+' - '+targetIndex);
                        if(element.asc==null){
                            element.asc = true;
                        }else{
                            element.asc = !element.asc;
                        }
                        if('columnOrder' in element){
                            colData = 'columnOrder';
                        }
                    }else{
                        element.asc = null;
                    }
                }
                console.log(' >> '+colData+' - '+targetIndex);
                var orderAsc = tabelaRec.tabelaHead[targetIndex].asc;
                var propertyOrder = tabelaRec.tabelaHead[targetIndex][colData];
                console.log(' >> '+orderAsc+' - '+propertyOrder);
                self.aplicarOrdem(tabelaFiltradaRec, orderAsc, propertyOrder);
                
            },
            //Filtrando as linhas de acordo com o valor dos filtros
            filtrandoTabela: function(tabelaRec){
                var self = this;
                var novaTabela = [];
                //console.log(tabelaRec);
                //Loop em todas as linhas
                for (var index = 0,  total = tabelaRec.tabelaBody.length; index < total; index++) {
                    var linha = tabelaRec.tabelaBody[index];
                    var resultados = []; // Array que guardará o resultado de cada comparação, para cada campo
                    
                    //Loop em todos o campos (de acordo com as configurações)
                    for (var index2 = 0, total2 = tabelaRec.tabelaHead.length; index2 < total2; index2++) {
                        
                        if('filterText' in tabelaRec.tabelaHead[index2]){
                        
                            var filtro = tabelaRec.tabelaHead[index2].filterText;
                            if('columnData' in tabelaRec.tabelaHead[index2]){
                                var coluna = tabelaRec.tabelaHead[index2].columnData;
                            }else{
                                var coluna = tabelaRec.tabelaHead[index2].columnOrder;
                            }
                        
                            
                            //console.log(tabelaRec.tabelaHead[index2]);
                            var tipo = tabelaRec.tabelaHead[index2].type;
                            
                            //Comparação especial se for número - < e > disponíveis
                            if(tipo==='number'){
                                
                                if(filtro.charAt(0)=='<'){
                                    
                                    var sFiltro = filtro.substr(1);
                                    if(sFiltro.length === 0){
                                        resultados.push(1);
                                    }else{
                                        if(linha[coluna] < sFiltro){ 
                                            resultados.push(1);
                                        }else{
                                            resultados.push(0);
                                        }
                                    }
            
                                }else if(filtro.charAt(0)=='>'){
                                    
                                    var sFiltro = filtro.substr(1);
                                    if(sFiltro.length === 0){
                                        resultados.push(1);
                                    }else{
                                        if(linha[coluna] > sFiltro){ 
                                            resultados.push(1);
                                        }else{
                                            resultados.push(0);
                                        }
                                    }
                                }else{
                                    if(linha[coluna].toString().indexOf(filtro) >= 0){ 
                                        resultados.push(1);
                                    }else{
                                        resultados.push(0);
                                    }
                                    
                                }
                            //Comparação normal (texto)
                            }else{
                                if(typeof linha[coluna].toString() =='string'){
                                    if(linha[coluna].toString().toUpperCase().indexOf(filtro.toUpperCase()) >= 0){ 
                                        resultados.push(1);// Se encontrou registra 1 ( linha deve ficar)
                                    }else{
                                        resultados.push(0);// Se Não encontrou registra 0 ( linha não exibida)
                                    }
                                }
                            }
                        }else{
                            resultados.push(1);// Se encontrou registra 1 ( linha deve ficar)
                        }
                        
                    }
                    //Se encontrar um 0 registrado, a linha não será exibida
                    if(resultados.indexOf(0)!==-1){
                        //Não Mostra linha
                    }else{
                        novaTabela.push(linha); //Mostra Linha
                    }
                    
                }
                
                
                return novaTabela;
            },
    


    }

}
</script>
<style scoped>

    /*********************************************************************
    FORMATAÇÃO BASE - FORMULÁRIO 
    *********************************************************************/
        

        .formulario-flutuante{
            position: fixed;
            display:block;
            height: 100vh;
            width:100vw;
            top:0;
            left:0;
            z-index: 10;
            text-align: center;
        }

        .mask{
            position: absolute;
            display:block;
            top:0;
            left:0;
            height: 100vh;
            width:100vw;
            background-color: #ffffff;
            opacity: 0.9;
            z-index: 15;
        }

        #form-0{
            height: calc(100% - 90px);
            width: 60%;
        }
        #form-1{
            height: calc(80% - 90px);
            width: 60%;
        }
        #form-2{
            height: calc(100% - 90px);
            width: 70%;
        }
        #form-3{
            height: calc(80% - 90px);
            width: 60%;
        }
        #form-4{
            height: calc(90% - 90px);
            width: 60%;
        }
        .form{
            display: grid;
            grid-template-rows: 40px auto 50px;
            grid-row-gap: 2px;
            position: relative;
            background-color: #ffffff;
            margin:auto;
            margin-top: 50px;
            z-index: 20;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
           
            border-radius: 10px;
            overflow: hidden;
            transition: 0.5s;
        }

        .form-decora{
            position: absolute;
            display: block;
            height: 140px;
            width: 100%;
            top:-10px;
            left: 0;
            background-color: #486684;
            
            z-index: 21;
        }

        .form-title{
            display: block;
            position: relative;
            padding: 10px;
            z-index: 23;
        }
            .form-title > span{
                display: block;
                position: relative;
                text-align: left;
                font-size: 22px;
                font-weight: 600;
                color: #f1f1f1; /* #2c3e50*/
                height: calc(100% - 8px);
                
            }

            .form-ico-close{
                position: absolute;
                display:block;
                top:8px;
                right: 10px;
                height: 30px;
                width: 30px;
                border-radius: 50px;
                background-color: #ff0000;
                color: #f1f1f1;
                cursor: pointer;

            }
            .ico-close{
                position: relative;
                display: inline-block;
                vertical-align: top;
                height: 30px;
                line-height: 30px;
                transition: 0.5s;
            }
            .form-ico-close:hover .ico-close{
                transform: rotate(360deg)
                
            }

        .form-content{
            display: block;
            position: relative;
            padding: 10px;
            text-align: left;
            overflow-y: auto;
            margin-top:6px;
            z-index: 22;
        }

        .input-mask{
            width: calc(100% - 12px);
            height: 22px;
            display: block;
            position: relative;
            padding: 5px;
            background-color: #ffffff;
            text-align: center;
            margin:5px 0;
            border:1px solid #cccccc;
            border-radius: 50px;
        }
        
        .input-mask input{
            width: 86%;
            height: 20px;
            display: inline-block;
            position: relative;
            margin-right: 5px;
            border:0;
            text-align: center;
            
        }
        .form-commands{
            display: block;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
        }




        .form-content::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #F5F5F5;
        }

        .form-content::-webkit-scrollbar
        {
            width: 12px;
            background-color: #F5F5F5;
        }

        .form-content::-webkit-scrollbar-thumb
        {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #8c8c8c;
        }

        

        

    /*********************************************************************
    FORMATAÇÃO BASE - CARDS
    *********************************************************************/

        .form-card{
            display: block;
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
            padding: 10px;
            z-index: 22;
        }
        .card-white{
            
            background-color: #ffffff;
            
            
        }
        .card-f1{
            background-color: #f1f1f1;
        }

    /*********************************************************************
    FORMATAÇÃO BASE - CONTROLE FORMULÁRIO 0
    *********************************************************************/


        .form-separate{
            display: inline-block;
            position: relative;
            width: 100%;
            height: 22px;
            line-height: 22px;
            
            color: #486684;
            font-size: 16px;
            font-weight: 700;
            
        }
        .form-separate-simple{
            display: inline-block;
            position: relative;
            width: 100%;
            height: 10px;
            
            
            
        }
        .form-end-line{
            display: block;
            position: relative;
            width: 100%;
            height: 1px;
            margin-top: 0px;
        }

        .form-input{
            display: inline-block;
            position: relative;
            
            border-bottom: 1px solid #333333;
            /*border-bottom: 2px solid #5b80a4;*/
            height: 32px;
            margin-top: 10px;
            margin-right: 15px;
            color:#333333;
        }
    

        .form-input input{
            position: absolute;
            display: block;
            bottom: 0;
            left: 0;
            height: 20px;
            width: calc(100% - 4px);
            color:#333333;
            font-size: 14px;
            padding-left: 4px;
            border:0;
            background-color: transparent;
            
        }

        .form-input label{
            /*
            position: absolute;
            display: block;
            bottom: 2px;
            left: 5px;
            background-color: #ffffff;
            transition: .2s linear;
            */
            position: absolute;
            display: block;
            top: -5px;
            font-size: 12px;
            height: 10px;
            color:#0b539b;
            
        }
        input:focus + label {
            
            color:#0099cc;
            font-weight: 700;
        }

        .form-input label .obg{
        
            color: #ff0000;
            font-size: 14px;
        }
        /*
        input:focus + label {
            top: 0px;
            font-size: 11px;
            height: 10px;
            color:#5b80a4;
            font-weight: 600;
        }
        
        .form-input > input[type=text]:focus { 
            color:#2c3e50;
            border-bottom: 1px solid #5b80a4; 
        }
        */

        input,select:focus{
            outline: none;
            outline-width: 0;
        }

        .form-input select{
            height: 22px;
            width: calc(100% - 5px);
            font-size: 12px;
            padding-left: 5px;
            border:0;
        }


    /*********************************************************************
    FORMATAÇÃO BASE - CONTROLE FORMULÁRIO 4
    *********************************************************************/

        .form-block-grid{
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 10px;
            grid-template-rows: 3fr 1fr;
        }
        .form-block{
            position: relative;
            display: inline-block;
            vertical-align: top;
            
            border-radius: 6px;
            padding: 10px;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
            /*box-shadow:  0 0 20px rgba(0, 0, 0, 0.1) inset;*/
            background-color: #f1f1f1;
            
        }
        
        .form-block-label{
            display: block;
            position: relative;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
            height: 30px;
            line-height: 30px;
            width:100%;
        }
        
        .form-block-controle{
            display: block;
            position: relative;
            height: calc(100% - 40px);
            
            overflow-y: auto;
           
        }

        .form-block-controle-filtro{
            display: block;
            position: relative;
            height: calc(100% - 80px);
            
            overflow-y: auto;
           
        }
        /*
        .form-block-controle::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #000000;
        }

        .form-block-controle::-webkit-scrollbar
        {
            width: 12px;
            background-color: #000000;
        }

        .form-block-controle::-webkit-scrollbar-thumb
        {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #8c8c8c;
        }
        */

        .form-block-item{
            display: block;
            position: relative;
            width: 100% ;
            height: 26px;
            line-height: 26px;
            background-color: #517394;
            color:#f1f1f1;
            margin-bottom: 6px;
            border-radius: 50px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;

        }

        .form-block-item:hover{
            background-color: #0099cc;
            color:#f1f1f1;
        }

        .form-block-item-sel{
            background-color: #00cc66;
            color:#f1f1f1;
        }   


        .v-money{
            text-align: center;
            font-weight: 600;
            color: #2c3e50;
        }

    /*********************************************************************
    FORMATAÇÃO BASE - CONTROLE FORMULÁRIO 2
    *********************************************************************/
        .grid-form-2{
            display: grid;
            grid-gap:8px;
            grid-template-columns: 1fr 2fr;
            grid-template-areas:
                "cli-sel cat-sel"
                
                "cli-sel tab-pro"
                "cli-det tab-pro";

        }

        .clientes-selecao{
            
            grid-area: cli-sel;
        }

        .clientes-detalhes{
           
            display: block;
            position: relative;
            padding: 5px;
            text-align: left;
            font-size: 11px;
            grid-area: cli-det;
            
        }

        .categorias-selecao{
            display: block;
            position: relative;
            
            grid-area: cat-sel;
        }

        .tabela-produtos{
            display: block;
            position: relative;
            
            grid-area: tab-pro;
        }

        
            .cliente-id{
                position:absolute;
                display: none;
                right: 10px;
                top:5px;
                font-size: 16px;
                font-weight: 700;
                color:#0099cc;

            }
            .cliente-detalhes-item{
                width: 100%;
                display: block;
                position: relative;
                height: auto;
                margin:2px 0;
                
            }
            .cliente-detalhes-item label{
                width: 100%;
                display: block;
                position: relative;
                height: 10px;
                line-height: 10px;
                font-size: 10px;
                color:#0099cc;
            }
            .cliente-detalhes-item span{
                width: 100%;
                display: block;
                position: relative;
                height: 11px;
                line-height: 11px;
                font-size: 11px;
                color:#333333;
                
            }



</style>
