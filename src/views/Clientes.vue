<template>
    <div class="pagina">
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Clientes</span>
           
        </div>

        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Clientes</div>
            </div>

            <div class="lista-filter-order">
                <div class="input-filter">
                    <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                    <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                </div>
                <div class="order-conteiner">
                    <span>Ordenar por </span>
                    <div class="order-item">NOME</div>
                    <div class="order-item">ANIVERSÁRIO</div>
                    <div class="order-item">QUANTIDADE CONTRATOS</div>
                </div>
                <div class="order-conteiner-min">
                    <div class="order-item"><font-awesome-icon :icon="['fas', 'sort-alpha-down']" fixed-width /></div>
                    
                </div>
            </div>

            <div class="lista-itens">
                
                <div class="item"  v-for="item in tabelafiltro" :key="item.nome">
                    <div class="item-image">
                        <div class="thunb-none"><font-awesome-icon :icon="['fas', 'user']" fixed-width /></div>
                    </div>
                    <div class="item-info">
                        <span class="info-linha1">{{ item.nome }}</span>
                        <span class="info-linha2"><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> {{ item.email }}</span>
                        <span class="info-linha2" v-if="item.instagram"><font-awesome-icon :icon="['fab', 'instagram']" size="lg" fixed-width /> {{ item.instagram }}</span>
                    </div>
                    
                </div>

            </div>

        </div>

       


    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {

    name:'clientes',
    data(){
        return {
            tabela:[],
            filtro:'',
        }
    },
    computed:{
        ...mapGetters([
            'getUsuarioLogado',
            'getTabela_Clientes'
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

        }
       
    },
    created(){
        console.log('Clientes >> Criado')
        console.log(this.getTabela_Clientes)
        this.tabela = this.getTabela_Clientes
        
    },
    watch:{

        getTabela_Clientes: function(val){
            console.log('watch >> getTabela_Clientes')
            
            this.tabela = val

        }

    },

    methods:{

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
        
        //**************************************************************************************************************************    
            


    }

}

</script>


<style scoped>


</style>
