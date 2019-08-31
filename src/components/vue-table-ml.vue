<template>
    <div class="vue-table-ml">

        <table class="table-ml"  cellspacing="0"  >
            <thead>
                <tr>
                    <template  v-for="(head, key) in tableObject.tabelaHead" >
                                
                        <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                            <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                            <div class="filtro">
                                <input v-if="'filterText' in head" type="text"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                            </div>
                            <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                            <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenarTabela(tableObject, tabelaFiltrada, $event)">
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
            

                <tr v-for="linha in tabelaFiltrada" :key="linha.id" @click="lineClick(linha)"> <!--:class="{'tr-x': linha.EXC == 'X'}" @click="clicarLinhaSubconta(linha)"-->
                    
                    <template v-for="th in tableObject.tabelaHead"  >
                        <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" >{{ linha[th.columnData] }}</td>
                    </template>
                        

                </tr>

            </tbody>
            <tfoot>
                <tr>
                    <th>Exibindo {{tabelaFiltrada.length}} de {{tableObject.tabelaBody.length}} Registros</th>
                </tr>
            </tfoot>

        </table>

    </div>
</template>

<script>

export default {
    name:'vue-table-ml',
    props:{
        title:{
            type: String,
            required:false,
            default: 'Tabela'
        },
        head:{
            type: Array,
            required:true
        },
        body:{
            type: Array,
            required:true
        }
    },
    data(){
        return {

            mainFilter: null,

            tableObject:{
                tabelaTitle:'Turmas Cadastradas - YOGA',
                tabelaHead: [

                    /*
                    {colunaId:0, columnText:'Categoria', columnData:'categoria', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Modalidade', columnData:'modalidade', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:2, columnText:'Horário', columnData:'horario', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:3, columnText:'Data Cadastro', columnData:'data_cadastro', columnOrder: 'data_cadastro_order', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:4, columnText:'Dia da Semana', columnData:'dia_semana', type:'string', filterText:'', asc:null, style:{}},
                    {colunaId:5, columnText:'Professoras', columnData:'professoras_nome', type:'string', filterText:'', asc:null, style:{width:'20%'}},
                    */
                    
                        
                ],
                tabelaBody:[]
            },
            linhasSelecionadas:[],
        }

    },
    computed:{
        /*
        tabelafiltro: function(){

            let self = this
            let resultado = []
            let filtro = this.mainFilter
            let arrLen = this.body.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.body[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            this.tableObject.tabelaBody = resultado
            return resultado
           

        },
        */
        tabelaFiltrada:function(){
            return this.filtrandoTabela(this.tableObject);
        },
    },
    created(){

        console.log('vue-table-ml :: created')
        console.log(this.title)


        this.tableObject.tabelaTitle = this.title

        this.tableObject.tabelaHead = this.head
        this.tableObject.tabelaBody = this.body
        

    },
    methods:{

        lineClick(line){


            this.$emit('lineClick', line)
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
        FORMATAÇÃO BASE PARA TABELAS
    *********************************************************************/
    .vue-table-ml{
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
    .table-ml{
        width: 100%;
        height: 100%;
        border: 0;
        margin:auto;
        border-spacing: 0;
        font-size:11px;
        background-color: #ffffff;
        
    }
    .table-ml > thead {
        display: table;
        height: 30px;
        
    }
    /*
    .table-ml > thead > tr{
        height: 30px;
        line-height: 30px;
    }
    */
    .table-ml > thead > tr > th.th{
        position: relative;
        cursor: pointer;
        text-align: center;
        color:#000000;
        padding:0 5px;
        box-sizing: border-box;
        /*border-bottom: 2px solid #bfbfbf;*/
    }
    .table-ml > thead > tr > th.th-maior{
        width: 30%;
    }
    .table-ml > thead > tr > th.th:hover{
        color: #006699;
    }
    .table-ml > thead > tr > th.th > .filtro{
        border:1px solid #6e6e6e;
        border-radius: 4px;
        text-align: center;
        cursor: text;
        box-sizing: border-box;
    }
    .table-ml > thead > tr > th.th > .filtro > input{
        width: 100%;
        border: 0;
        outline: none;
        padding-left: 3px;
        box-sizing: border-box;

    }
    .head-sort-ico{
        position: absolute;
        display: block;
        bottom: 0;
        right: 6px;
        height: 24px;
        line-height: 24px;
        background-color: #ffffff;
        padding: 0 2px;
        width: auto;

    }

    .table-ml thead tr {
        display: table;
        width: calc(100% - 1.4em);
        table-layout: fixed;
        height: 30px;
        line-height: 24px;
    }

    .table-ml > tbody{
        display: block;
        height: auto;
        max-height: calc(100% - 70px);
        overflow-y: scroll;
        overflow-x: hidden;
        border-bottom: 1px solid #cccccc;
        border-top: 3px solid #cccccc;
    }
    .table-ml  tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    .table-ml > tbody > tr > td{
        border-top: 1px solid #bfbfbf;
        height: 30px;
        line-height: 30px;
        max-height: 30px;
        max-width: 250px;
        white-space: nowrap;
        overflow-x: hidden;
        padding:0 5px;
        text-align: center;
        box-sizing: border-box;
    }
    .table-ml > tbody > tr:first-child > td{
        border-top: 0;
    }

    .table-ml tbody tr.tr-x td{
        color: #ff0000;
    }
    .table-ml tbody tr td.td-hover{
        
        font-weight: 700;
    }
    .table-ml > tbody > tr > td.td-maior{
        width: 30%;
    }
    .table-ml > tbody > tr:hover > td{
        background-color: #cceeff;
        cursor: pointer;
    }
    .table-ml > tbody > tr.sel > td{
        background-color: #99ffcc;
        color:#00994d;
        cursor: pointer;
    }

    .tabela-chk-fw-2x{
        margin-top:5px;
    }

    .table-ml > tfoot{
        display: block;
        height: 30px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #cccccc;
    }
    .table-ml > tfoot tr{
        display: table;
        height: 30px;
        width: calc(100% - 1.4em);
        background-color: #f2f2f2;
    }
</style>
