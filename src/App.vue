<template>
   <div id="app">

        <!-- Se o usurário estiver logado -->
        <template v-if="getUsuarioLogado.uid!=null" >

           
            <!-- Usando estrutura HTML5 -->
            <header class="topo" >
                <div class="menu-pequeno">
                    <font-awesome-icon :icon="['fas', 'bars']" size="lg" fixed-width />
                </div>
                <div class="logo-p"></div>
            </header>
            <aside class="menu">
                <div class="logo"></div>
                <div class="menu-reponsivo">
                    <menu-lateral></menu-lateral>
                </div>
            </aside>
            <main class="conteudo">
                <!-- Onde as páginas rotiadas são exibidas -->
                <router-view/>
            </main>
            

        </template>

        <!-- Se não estiver logado apresenta  view Home que importa componente Login -->
        <template v-else>
            <div class="vazio">
                <home></home>
            </div>
            

        </template>

        
        
        


    </div>
</template>
<script>

//import TopPage from './components/TopPage'
import MenuLateral from './components/MenuLateral'
//import FormularioFlutuante from './components/FormularioFlutuante'

import Home from './views/Home.vue'


import firebase from 'firebase'


import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


export default {

    name: 'app',
    components:{
        //'top-page': TopPage,
        'menu-lateral': MenuLateral,
        //'formulario-flutuante': FormularioFlutuante,
        'home': Home
    },
    data(){
        return {
            listaDeUsuariosDb:[],
            mensagemSnapshot:'',
        }
    },
    firestore(){
        return {
        //listaDeUsuariosDb: this.$firebaseDb.collection('users').where('id', '==', this.getUsuarioLogado.uid) 
    
        }
  
    },
    computed:{
        ...mapGetters([
            'getTitulo',
            'getUsuarioLogado',
            'getListaUsuariosVisiveis',
            'getFormularioFlutuante'
        ]),

    },
    created(){
    
    
    },
    methods:{

 
   

    }

}

</script>

<style>


/*********************************************************************
    IMPORTS BÁSICOS
*********************************************************************/ 

    @import './css/fontes.css';
    @import './css/tabelas.1.0.0.css';
    @import './css/botoes.1.0.0.css';



/*********************************************************************
    GERAL
*********************************************************************/ 

    body{
        margin:0;
        padding: 0;
        background-color: #f3f4f6;
        /*background-image: linear-gradient(270deg, #c5cad3 0%, #e2e4e9 35%, #f3f4f6 100%);*/
        font-family:  'Varela Round','Roboto','Avenir', Helvetica, Arial, sans-serif;
    }
 

    #app {
        
        display: grid;
        grid-template-areas: "g-menu   g-topo "
                             "g-menu   g-conteudo";
        
        grid-template-columns: 200px auto ;
        grid-template-rows: 50px calc(100vh - 50px);
    }

    .topo{
      grid-area: g-topo;
      background-color: #ffffff;
      border-bottom:1px solid #e6e6e6;
      padding: 6px;
    }
        .menu-pequeno{
            display: none;
        }

    .menu{
      grid-area: g-menu;
      display: grid;
      grid-template-rows: 50px auto;
      overflow: hidden;
      
    }

        .logo{
            background-image: url("assets/logo_preta_zazen_nome.webp");
            background-position: center;
            background-repeat: no-repeat;
            background-color: #ffffff;
            
            border-bottom:1px solid #e6e6e6;
            color:#ffffff;
            padding: 6px;
        }
        
        .menu-reponsivo{
                
            color:#ffffff;
            padding: 6px;
                
        }

    .conteudo{
      grid-area: g-conteudo;
      padding: 6px;
      overflow: hidden;
    }

    .footer{
      grid-area: g-footer;
      background-color: #e6e6e6;
      
    }

    .vazio{
        grid-column: 1 / -1;
    }

    input::placeholder { /* Chrome/Opera/Safari */
        color: #808080;
        font-family:  'Varela Round','Avenir', Helvetica, Arial, sans-serif;
    }




/*********************************************************************
    IMPORTS CASCADE ORDEM DE RELEVÂNCIA
*********************************************************************/ 

    @import './css/paginas.css';
    @import './css/elements.css';
    @import './css/itens.css';



/*********************************************************************
    MEDIA QUERYS
*********************************************************************/ 

  @media screen and (max-width: 400px){
        
        #app{
            
            grid-template-areas:"g-topo   g-topo "
                                "g-conteudo   g-conteudo";
            grid-template-rows:  50px calc(100vh - 50px);
        
        }
       
        .menu{
            display: none;
        }

        .logo-p{
            background: url("assets/logo_preta_zazen_nome.webp") no-repeat center center fixed;
            
            height: 98%;
            color:#ffffff;
            
        }
        .menu-pequeno{
            position: absolute;
            display: block;
            left: 5px;
            top:0;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            
        }
       
    }



</style>
