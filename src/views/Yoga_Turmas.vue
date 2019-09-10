<template>
    <div class="pagina">
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Yoga</span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Turmas</span>
           
        </div>

        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Yoga Turmas</div>
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
                    <div class="btn" :class="{'btn-desable': exibe=='cards', 'btn-pdr' : exibe!='cards'}"  @click="exibe='grade'" >
                        <div class="btn-label">Grade Horário</div>
                        <font-awesome-icon :icon="['fas', 'th']"  class="btn-ico" />
                    </div>
                    <!--
                    <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                        <div class="btn-label">Nova Turma</div>
                        <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                    </div>
                    -->
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

            <template v-else-if="exibe==='tabela'">
                
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
                        
                           <vue-table-ml :head="tabelaTurmas.tabelaHead" :body="getTabela_Turmas" @lineClick="abreDetalhe($event)"></vue-table-ml>

                        </div>

                    </div>

                </div>

            </template>

            <template v-else>
                <div class="grade-titulo"><span>Grade de Horários</span></div>
                <div class="grade-container">
                    <div class="grade-conteudo-titulo">
                        <div>HORÁRIO <font-awesome-icon :icon="['fas', 'plus']" size="lg"  class="novo-horario" @click="novoHorario = true"/></div>
                        <div>SEGUNDA</div>
                        <div>TERÇA</div>
                        <div>QUARTA</div>
                        <div>QUINTA</div>
                        <div>SEXTA</div>
                        <div class="no-border">SÁBADO</div>
                    </div>
                    <div class="grade-conteudo">
                        <div :class="{'grade-conteudo-novo-horario-enabled': novoHorario, 'grade-conteudo-novo-horario-desabled': novoHorario==false}">
                            <div>

                                <span class="novo-horario-div">

                                    <span class="novo-horario-input-mask">
                                        <input type="text" v-mask="'##:##'" size="6" v-model="novoHorarioTexto">
                                    </span>
                                    <font-awesome-icon :icon="['fas', 'times-circle']" size="lg"  class="novo-horario-cancela" @click="novoHorario = false"/>
                                    <font-awesome-icon :icon="['fas', 'check-circle']" size="lg"  class="novo-horario-confirma" @click="cadastraNovoHorario"/>

                                </span>
                                
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="grade-conteudo-horario" v-for="item in grade" :key="item.horario">
                            <div class="grade-conteudo-horario-hora" data-tool-tip="Clique para excluir o horário!" @click="excluirHorario(item)">{{item.horario_grade}}h</div>

                            <div  v-for="turma in item.grade"  :key="turma.indice" > <!-- :key="turma.id" :: causando aviso vue de key duplicado -->
                                <template v-if="turma.id != null">
                                    <div class="grade-conteudo-horario-item"  @click="abreDetalhe(turma)" >
                                        {{turma.modalidade}}
                                    </div>
                                </template>
                                <template v-else>
                                    
                                    <font-awesome-icon :icon="['fas', 'plus-circle']" size="lg"  class="nova-turma-ico" @click="abreDetalhe(item)"/>
                                </template>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>


            </template>

        </div>


        <!-- Novo modelo de Formulário -->
        <template v-if="detalhe">
            <div :class="{'mask-fechando' : detalheFechando, 'mask': detalheFechando===false}"></div>
            <div :class="{'formulario-detalhes-fechando' : detalheFechando, 'formulario-detalhes': detalheFechando===false}" >
               

                <template v-if="'horario_grade' in itemSelecionado">

                    <div class="formulario-menu">
                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>
                        <!--
                        <div class="formulario-menu-item menu-item-sel">
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Novo</div>
                        </div>
                        
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'pencil-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Editar</div>
                        </div>
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Vender</div>
                        </div>
                        
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Excluir</div>
                        </div>
                        -->
                    </div>

                    <div class="fomulario-conteudo">

                            <div class="formulario-inputs">

                                <div class="input-container" style="width:100%">
                                    <label>Dias Diponíveis para o horário {{itemSelecionado.horario_grade}}h </label>
                                    <div class="input-buttons-list" style="height:auto">
                                        <template v-for="dia in itemSelecionado.grade">
                                            <div  :key="dia.indice" v-if="dia.id==null" class="opc-button" :class="{'opc-sel': novoDados.dia_semana.includes(dia.indice)}"  @click=" (novoDados.dia_semana.includes(dia.indice)) ? novoDados.dia_semana.splice(novoDados.dia_semana.indexOf(dia.indice),1) : novoDados.dia_semana.push(dia.indice) ">
                                                {{semana[dia.indice]}}
                                            </div>
                                        </template>
                                    </div>
                                </div>

                            </div>
                            <div class="formulario-inputs" v-if="novoDados.dia_semana.length > 0">
                                <div class="input-container" style="width:100%">
                                    <label>Modalidades</label>
                                    <div class="input-buttons-list" style="height:auto">
                                        <div class="opc-button" :class="{'opc-sel': novoDados.modalidade === item.texto}"  v-for="item in controles.modalidades" :key="item.texto" @click="novoDados.modalidade = item.texto">{{item.texto}}</div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="formulario-inputs" v-if="novoDados.dia_semana.length > 0 && novoDados.modalidade != null">
                                <div class="input-container" style="width:100%">
                                    <label>Professoras</label>
                                    <div class="input-buttons-list" style="height:auto">
                                        <template v-for="item in controles.modalidades">
                                            
                                            <div v-if="novoDados.modalidade === item.texto"  class="opc-button" :class="{'opc-sel': novoDados.professoras.includes(professora.id)}"  v-for="professora in item.professoras" :key="professora.dados_pessoais.cpf" @click="(novoDados.professoras.includes(professora.id)) ? novoDados.professoras.splice(novoDados.professoras.indexOf(professora.id),1) : novoDados.professoras.push(professora.id)">{{professora.dados_pessoais.nome + ' ' + professora.dados_pessoais.sobrenome }}</div>
                                        
                                        </template>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="formularios-inputs" v-if="novoDados.dia_semana.length > 0 && novoDados.modalidade != null && novoDados.professoras.length > 0">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="cadastrarTurma"><font-awesome-icon :icon="['fas', 'check']" size="lg" /> Cadastrar</div>
                                </div>
                            </div>
                        

                    </div>


                </template>

                <template v-else>

                    <div class="formulario-menu">
                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>
                        <!--
                        <div class="formulario-menu-item menu-item-sel">
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Novo</div>
                        </div>
                        
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'pencil-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Editar</div>
                        </div>
                        <div class="formulario-menu-item">
                            <font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Vender</div>
                        </div>
                        
                         
                         <div class="formulario-menu-item " :class="{'menu-item-sel':menuSelecionado==0}"  @click="menuSelecionado=0">
                            <font-awesome-icon :icon="['fas', 'eye']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Visualizar</div>
                        </div>
                         -->
                        <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==3}"  @click="menuSelecionado=3">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Excluir</div>
                        </div>
                       
                    </div>
                    <div class="fomulario-conteudo">

                        <!-- Excluir -->
                        <template v-if="menuSelecionado===3">
                            <!-- seleção de produtos -->
                            <div class="formulario-inputs" >
                                
                                <div class="input-container" style="width:100%;height:120px;">
                                    <label>Turma Selecionada</label>
                                    <div class="input-itens-list-selected"  >
                                        <div class="item-cell" style="width:100%;font-weight:700;">Modalidade {{itemSelecionado.modalidade}} </div>
                                        <!--<div class="item-cell" style="width:4%;"><font-awesome-icon :icon="['fas', 'times']" size="lg" @click="novoContrato.produto = null" /></div>-->
                                        <div class="item-cell" style="width:100%;font-size:12px;">Horário: {{itemSelecionado.horario}}h</div>
                                        <div class="item-cell" style="width:100%;font-size:12px;">Dias da Semana: {{itemSelecionado.dia_semana.map(i => diaSemana[i]).join(', ')}}</div>
                                        <div class="item-cell" style="width:100%;font-size:12px;">Professoras:
                                            <template v-for="prof in getTabela_Professoras" >
                                                <template v-for="turmaId in itemSelecionado.professoras">
                                                    <span :key="prof.id" v-if="turmaId == prof.id">{{prof.nome}}</span>
                                                </template>
                                            </template>
                                        </div>
                                        <div class="item-cell" style="width:100%;font-size:12px;">Alunos:
                                            <template v-for="cli in getTabela_Clientes" >
                                                <template v-for="turmaId in itemSelecionado.alunos">
                                                    <span :key="cli.id" v-if="turmaId == cli.id">{{cli.nome}}</span>
                                                </template>
                                            </template>
                                        </div>
                                        <div class="item-cell" style="width:100%;font-size:12px;">Id: {{itemSelecionado.id}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="formulario-inputs" >
                                <div class="input-container" style="width:100%">
                                    <label><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Tem certeza de que deseja excluir a turma?</label>
                                </div>
                            </div>
                             <div class="formularios-inputs">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="excluirTurma"><font-awesome-icon :icon="['fas', 'trash-alt']" size="1x" /> Confirmar Exclusão da Turma</div>
                                </div>
                            </div>
                        </template>
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

import  vueTableMl from '@/components/vue-table-ml'

export default {

    name:'Yoga_Turmas',
    directives:{
        mask
    },
    components: {
        Money,
        'vue-table-ml': vueTableMl
    },
    data(){
        return {

            exibe: 'grade',
            diaSemana:utilitarios.diaSemana,
            horariosId:'',
            horarios:[],
            novoHorario:false,
            novoHorarioTexto:'',
            semana:['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            grade:[],
            tabela:[],
            filtro:'',

            tabelaTurmas:{
                tabelaTitle:'Turmas Cadastradas - YOGA',
                tabelaHead: [
                    {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:2, columnText:'Horário', columnData:'horario', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:3, columnText:'Data Cadastro', columnData:'data_cadastro', columnOrder: 'data_cadastro_order', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:4, columnText:'Dia da Semana', columnData:'dia_semana_map', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:5, columnText:'Professoras', columnData:'professoras_nome', type:'string', filterText:'', asc:null, style:{width:'20%'}},
                   
                    
                        
                ],
                tabelaBody:[]
            },
            linhasSelecionadas:[],

            // Controles Formulário
            itemSelecionado:null,
            menuSelecionado:3,
            detalhe: false,
            detalheFechando:false,
            novoItem:false,

            controles:{
                modalidades:[],
                
            },
            novoDados:{
                alunos:[],
                contratos:[],
                categoria:'YOGA',
                horario:null,
                dia_semana:[],
                modalidade:null,
                professoras:[],
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
            'getTabela_Turmas',
            'getTabela_Clientes',
            'getTabela_Professoras',
            'getTabela_Produtos'
        ]),
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.filtro
            let arrLen = this.getTabela_Turmas.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Turmas[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            this.tabelaTurmas.tabelaBody = resultado
            return resultado

        },
        tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaTurmas);
        },
       
    },
    created(){
        console.log('Yoga_Produtos >> Criado')
        console.log(this.getTabela_Turmas)
        this.getHorarios()
        this.tabela = this.getTabela_Turmas
        this.montaGrade(this.getTabela_Turmas)
        this.tabelaTurmas.tabelaBody = this.getTabela_Turmas // tabelas
        this.inicalizaControles()
        
    },
    watch:{

        getTabela_Turmas: function(val){
            console.log('watch >> getTabela_Produtos')
            this.montaGrade(val)
            this.tabela = val
            this.tabelaTurmas.tabelaBody = val
        }

    },

    methods:{


        // Itens / Tabela
        abreDetalhe(item){

            console.log('abreDetalhe >>')

            this.novoDados = {
                categoria:'YOGA',
                horario:null,
                dia_semana:[],
                modalidade:null,
                professoras:[],
                data_cadastro:null,
                cadastrado_por:null
            }
            this.itemSelecionado = item
            this.detalhe = true


            if(item==='novo'){
                this.novoItem=true
                this.detalhe = true
            }else{
             
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

        ordenar(tabelaTurmas, tabelaFiltrada, e){
            utilitarios.ordenarTabela(tabelaTurmas, tabelaFiltrada, e)
        },

        inicalizaControles(){
            console.log('inicalizaControles4')

            let self = this
            this.$db.collection('produtos_cartela').get().then(resultado => {
                resultado.forEach(doc => {
                    if(doc.data().categoria=='YOGA'){
                        //self.controles.modalidades = doc.data().modalidades
                        doc.data().modalidades.forEach( modalidade =>{
                            let professoras = []
                            this.$db.collection('professoras').where("modalidades","array-contains", modalidade).get().then(resultadoProfessoras => {
                                resultadoProfessoras.forEach(docProfessoras => {
                                    let professora = docProfessoras.data()
                                    professora.id = docProfessoras.id
                                    professoras.push(professora)
                                })
                            })

                            let item = {texto: modalidade, professoras:professoras}
                            self.controles.modalidades.push(item)
                        })

                    }else{}
                    
                })
                console.log(self.controles.modalidades)

            }).catch( error => {
                console.log(error)
                console.error(`${error.Message}`)
            })

        },
        
        getHorarios(){
            console.log('getHorarios')

            let self = this
            self.horarios = []

            this.$db.collection('turmas_configuracoes').get().then(resultado => {

                resultado.forEach(doc => {
                    
                    if(doc.data().categoria=='YOGA'){
                        self.horariosId = doc.id
                        self.horarios = doc.data().horarios
                    }else{
                         
                    }
                    
                })
                
                self.horarios.sort()
                //console.log(self.controles.modalidades)
                self.montaGrade(self.getTabela_Turmas)

            }).catch( error => {
                
                console.log(error)
                console.error(`${error.Message}`)

            })

        },
        montaGrade(lista){

            let gradeTemp = []

            for (let index = 0; index < this.horarios.length; index++) {
                const element = this.horarios[index];
                let itemGrade = { 
                    horario_grade: element, 
                    grade:[
                            {id:null, indice:0},
                            {id:null, indice:1},
                            {id:null, indice:2},
                            {id:null, indice:3},
                            {id:null, indice:4},
                            {id:null, indice:5}
                        ]
                    }

                gradeTemp.push(itemGrade)
            }

            for (let index = 0; index < lista.length; index++) {
                const element = lista[index];
                for (let index2 = 0; index2 < gradeTemp.length; index2++) {
                    const element2 = gradeTemp[index2];
                    if(element.horario === element2.horario_grade){
                       element.dia_semana.forEach( dia =>{
                            element2.grade[dia] = element
                       })
                    }
                }
            }

            this.grade = gradeTemp

        },

        cadastraNovoHorario(){
            let self = this
            let novoH = this.novoHorarioTexto
            let cadastrado = 0
            this.horarios.forEach( valor =>{
                if(valor === novoH){
                    alert('Horário já cadastrado...')
                    cadastrado++
                    
                }
            })

            if(cadastrado===0){
                
                // atualizando matriz de valores para campo horarios nao documento que controla as configurações de turmas na coleção turmas_configuracoes
                self.$db.collection("turmas_configuracoes").doc(self.horariosId).update({"horarios": firebase.firestore.FieldValue.arrayUnion(novoH)}).then(function(){
                    console.log("turmas_configuracoes atualizados com sucesso")
                    // recarregando lista
                    self.getHorarios()

                }).catch(error2 =>{
                    console.error("Error adding document: ", error)
                })


               
            }
            this.novoHorario = false

        },
        async excluirHorario(item){
            let r = confirm(`Confirma a exclusão do horário ${item.horario_grade}h ?`)
            if(r===true){
            
                let self = this
                //console.log(item)
                try {
                    for (let index = 0; index < item.grade.length; index++) {
                        const element = item.grade[index];
                        if(element.id != null){
                            throw 'Não é possível excluir.\nJá existem turmas cadastradas para este horário.\nExclua todas as turmas deste horário e tente novamente.'
                            break
                        }
                    }

                    console.log('continua aqui')
                    // Remove horário
                    await self.$db.collection("turmas_configuracoes").doc(self.horariosId).update({"horarios": firebase.firestore.FieldValue.arrayRemove(item.horario_grade)})
                    // atualiza Grade
                    self.getHorarios()
                } catch (error) {
                    alert(error)
                }
           
            }else{
                
            }

        },

        async cadastrarTurma(){
            console.log('cadastrarTurma')
            let self = this
            
            if(self.novoDados.dia_semana.length == 0 || self.novoDados.modalidade == null || self.novoDados.professoras.length == 0){

                 alert('Informe todos os campos obrigatórios!')

            }else{


                self.novoDados.data_cadastro = new Date()
                self.novoDados.cadastrado_por = self.getUsuarioLogado.uid,
                self.novoDados.horario = self.itemSelecionado.horario_grade

                try {

                    let resposta = await this.$db.collection('turmas').add(self.novoDados)
                    console.log(resposta.id)
                    console.log(resposta)
                    
                    // Atualizando campo turmas para cada professora selecionada
                    self.novoDados.professoras.forEach( async prof =>{
                        let respostaAtualizaProfessora = await self.$db.collection("professoras").doc(prof).update({"turmas": firebase.firestore.FieldValue.arrayUnion(resposta.id)})
                    })

                    self.novoDados = {
                        categoria:'YOGA',
                        horario:null,
                        dia_semana:[],
                        modalidade:null,
                        professoras:[],
                        data_cadastro:null,
                        cadastrado_por:null
                    }
                    alert('Cadastro realizado com sucesso!')

                } catch (error) {
                    console.error("Error ao cadastrar: ", error)
                }
          
            }

        },

        async excluirTurma(){
            
            let self = this
            let turmaSelecionada = this.itemSelecionado
            try {
                let deletaTurma = await self.$db.collection('turmas').doc(turmaSelecionada.id).delete()
                
                // Atualizar Turmas
                if(turmaSelecionada.professoras.length > 0){
                    turmaSelecionada.professoras.forEach( async professora => {
                        await self.$db.collection("professoras").doc(professora).update({"turmas": firebase.firestore.FieldValue.arrayRemove(turmaSelecionada.id)})
                    })
                }
                // Atualizar contratos
                if(turmaSelecionada.contratos.length > 0){
                    turmaSelecionada.contratos.forEach( async contrato => {
                        await self.$db.collection("contratos").doc(contrato).update({"turmas": firebase.firestore.FieldValue.arrayRemove(turmaSelecionada.id)})
                    })
                }
                
                self.fechaDetalhe()
                alert(`Contrato ${turmaSelecionada.id} excluída com sucesso!`)
            } catch (error) {
                console.error("Error removing document: ", error);
            }

        },

       


        cadastrarProduto(){

            console.log('cadastrarProduto')
            let self = this
            //console.log(self.formularios[4].data)
            if(self.novoDados.categoria === 'YOGA'){
                // verificando campos obrigatórios
                if(self.novoDados.categoria.length == 0 || self.novoDados.modalidade == null || self.novoDados.plano == null || self.novoDados.frequencia == null || self.novoDados.valor == 0){

                    alert('Informe todos os campos!')

                }else{

                    self.novoDados.data_cadastro = new Date()
                    self.novoDados.cadastrado_por = self.getUsuarioLogado.uid
                    
                    console.log(self.novoDados)

                    this.$db.collection('produtos').add(self.novoDados).then(resposta =>{
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
