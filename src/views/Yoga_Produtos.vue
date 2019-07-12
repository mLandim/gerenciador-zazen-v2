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
            </div>

            <div class="lista-filter-order">
                <div class="input-filter">
                    <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                    <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                </div>
                <!--
                <div class="order-conteiner">
                    <span>Ordenar por </span>
                    <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'nome')">NOME</div>
                    <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'data_nascimento')">ANIVERSÁRIO</div>
                    <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'contratos')">QUANTIDADE CONTRATOS</div>
                </div>

                <div class="order-conteiner-min">
                    <div class="order-item"><font-awesome-icon :icon="['fas', 'sort-alpha-down']" fixed-width /></div>
                    
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
import { setTimeout } from 'timers';

export default {

    name:'Yoga_Produtos',
    data(){
        return {
            tabela:[],
            filtro:'',


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

            return resultado

        }
       
    },
    created(){
        console.log('Yoga_Produtos >> Criado')
        console.log(this.getTabela_Produtos.tabelaYoga)
        this.tabela = this.getTabela_Produtos.tabelaYoga
        
    },
    watch:{

        getTabela_Produtos: function(val){
            console.log('watch >> getTabela_Produtos')
            
            this.tabela = val.tabelaYoga

        }

    },

    methods:{



        abreDetalhe(item){

            console.log('abreDetalhe >>')
            this.detalhe = true
           

        
        
        },

        fechaDetalhe(){

            console.log('fechaDetalhe >>')
            this.detalheFechando = true

            setTimeout(()=>{
                this.detalhe = false
                this.detalheFechando = false
            },1000)
            
        },






    }

}

</script>
