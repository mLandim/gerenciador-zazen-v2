<template>
    <div class="menu-lateral">
        <div id="nav">

            <!-- <router-link> é renderizado como tag a por padrão -->
            <!-- caminho do roteamento pasado na prop "to" -->
            <!--<router-link to="/">Home</router-link> |-->

            <router-link to="/inicio-logado"><font-awesome-icon :icon="['fas', 'home']" size="lg" fixed-width /> Início</router-link>
            <router-link to="/clientes"><font-awesome-icon :icon="['fas', 'user']" size="lg" fixed-width /> Clientes</router-link> 
           
            <router-link to="/contratos"><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width /> Vendas</router-link>
            
            <template>
                <div class="menu-grupo" @click="menuGrupoYoga">
                    <font-awesome-icon :icon="['fas', 'running']" size="lg" fixed-width /> Yoga
                    <font-awesome-icon :icon="['fas', 'chevron-up']" size="sm"  class="menu-grupo-ico-arrow" v-if="menuGrupo.yoga"/>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm"  class="menu-grupo-ico-arrow" v-else/>
                </div>

                <div class="menu-grupo-sub" v-if="menuGrupo.yoga">
                    <router-link to="/yoga-produtos"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Produtos</router-link>
                    <router-link to="/yoga-contratos"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Contratos</router-link>
                    <router-link to="/produtos-balcao"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Turmas</router-link>
                    <router-link to="/produtos-balcao"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Professoras</router-link>
                    
                </div>

            </template>

            <template>
                <div class="menu-grupo" @click="menuGrupoSalas">
                    <font-awesome-icon :icon="['fas', 'calendar-alt']" size="lg" fixed-width /> Salas
                    <font-awesome-icon :icon="['fas', 'chevron-up']" size="sm"  class="menu-grupo-ico-arrow" v-if="menuGrupo.salas"/>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm"  class="menu-grupo-ico-arrow" v-else/>
                </div>

                <div class="menu-grupo-sub" v-if="menuGrupo.salas">
                    <router-link to="/produtos-balcao"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Contratos</router-link>
                    <router-link to="/produtos-balcao"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Agendamentos</router-link>
                    
                </div>

            </template>

            <!--<router-link to="/turmas"><font-awesome-icon :icon="['fas', 'users']" size="lg" fixed-width />YOGA</router-link>-->

            <!--<router-link to="/agendamentos"><font-awesome-icon :icon="['far', 'calendar-alt']" size="lg" fixed-width /> Agendamentos SALA</router-link>-->
            <!--            
            <template>
                <div class="menu-grupo" @click="menuGrupoProdutos">
                    <font-awesome-icon :icon="['fas', 'cookie-bite']" size="lg" fixed-width /> Produtos
                    <font-awesome-icon :icon="['fas', 'chevron-up']" size="sm"  class="menu-grupo-ico-arrow" v-if="menuGrupo.produto"/>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm"  class="menu-grupo-ico-arrow" v-else/>

                </div>

                <div class="menu-grupo-sub" v-if="menuGrupo.produto">
                    <router-link to="/produtos-balcao"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Consulta e Cadastro</router-link>
                    
                </div>
            </template>
            -->

            <!-- Apenas perfil Administrativo :: 0 -->
            <router-link to="/relatorios" v-if="getPerfilAcesso == 0"><font-awesome-icon :icon="['fas', 'file-alt']" size="lg" fixed-width /> Relatórios</router-link>

            <!-- Apenas perfil Administrativo :: 0 -->
            <template v-if="getPerfilAcesso == 0">
                <div class="menu-grupo" @click="menuGrupoSistema" >
                    <font-awesome-icon :icon="['fas', 'cogs']" size="lg" fixed-width /> Sistema
                    <font-awesome-icon :icon="['fas', 'chevron-up']" size="sm"  class="menu-grupo-ico-arrow" v-if="menuGrupo.sistema"/>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm"  class="menu-grupo-ico-arrow" v-else/>
                </div>
                <div class="menu-grupo-sub" v-if="menuGrupo.sistema">
                    <router-link to="/user-novo-cadastro"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Novo Usuário</router-link>
                    <router-link to="/user-consulta"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Usuários Cadastrados</router-link>
                    <router-link to="/user-acessos"><font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" /> Acessos</router-link>
                </div>
            </template>
            
            <router-link to="/about"><font-awesome-icon :icon="['fas', 'question']" size="lg" fixed-width /> Sobre</router-link>

            
      
        </div>
        <div class="menu-footer">
            <span>{{getTitulo}}</span>
            <span>{{getVersao}}</span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    
    name: 'menu-lateral',
    data(){
        return {
            
            menuGrupo:{
                sistema: false,
                produto: false,
                yoga: false,
                salas: false,
            }
        }
    },
    computed:{
        ...mapGetters([
        'getTitulo',
        'getVersao',
        'getUsuarioLogado',
        'getPerfilAcesso'
        ]),

    },
    created(){
        console.log(' Perfil: '+ this.getPerfilAcesso)
    },
    methods:{
        
        menuGrupoYoga(){
            this.menuGrupo.yoga = !this.menuGrupo.yoga
            console.log(' Perfil: '+ this.getPerfilAcesso)
        },
        menuGrupoSalas(){
            this.menuGrupo.salas = !this.menuGrupo.salas
            console.log(' Perfil: '+ this.getPerfilAcesso)
        },
        menuGrupoSistema(){
            this.menuGrupo.sistema = !this.menuGrupo.sistema
            console.log(' Perfil: '+ this.getPerfilAcesso)
        },
        menuGrupoProdutos(){
            this.menuGrupo.produto = !this.menuGrupo.produto
        }
    }

}
</script>

<style scoped>
    .menu-lateral{
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 12px;
        
    }


    #nav{
        
        overflow: hidden;
        
    }

    #nav a {
        position: relative;
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: left;
        text-decoration: none;
        color: #34495e;
        font-weight: 700;
        cursor: pointer;
        padding-left: 6px;
    }
        #nav a:hover{
            border-radius: 10px;
            background-color: #f1f1f1;
            z-index: 10;
        }

    #nav .menu-grupo{
        position: relative;
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: left;
        text-decoration: none;
        color: #34495e;
        font-weight: 700;
        cursor: pointer;
        padding-left: 6px;
    }    
        #nav .menu-grupo:hover{
            
            background-color: #f1f1f1;
        }
    .menu-grupo-ico-arrow{
        display: block;
        position: absolute;
        height: 36px;
        line-height: 36px;
        top:0;
        right: 10px;
    }
    .menu-grupo-sub {
        padding-left: 20px;
        
    }
    .menu-grupo-sub a{
        padding-left: 50px;
        font-size:12px;
        height: 26px;
        line-height: 26px;
    }

    .menu-footer{
        display: block;
        position:absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: auto;

    }
    .menu-footer span{
        display: block;
        position: relative;
        width: 100%;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        text-align: center;
        color:#2c3e50;
    }

</style>
