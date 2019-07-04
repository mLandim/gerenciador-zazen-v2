<template>

    <div id="login">

        <div class="info-app">

            <div class="image-app">
                <img alt="Zazen" src="@/assets/logo_preta_zazen.webp">
            </div>
            <div class="titulo-app">{{ getTitulo }}</div>
            <div class="versao-app">{{ getVersao }}</div>

        </div>

        <!-- Formulário de Login -->
        <div class="form-login" v-if="cadastrar==false">

            <form action="">

                <div class="form-input">
                    <input type="text"  placeholder="Email" v-model="email" autocomplete="username" >
                </div>
                <div class="form-input">
                    <input type="password"  placeholder="Senha" v-model="senha" v-on:keyup.enter="loginFirebase" autocomplete="current-password" >
                </div>

            </form>
            
             
            <div class="form-submit" @click="loginFirebase">Login</div>    
        
            <div class="form-message" :class="{'erro': erro == true}">{{mensagem}}</div>

            <div class="form-cadastrar" @click="telaCadastrar()">Cadastrar Conta</div>

        </div>

        <!-- Formulário Cadastro Novo Usuário -->
        <div class="form-login" v-else>

            <form action="">

                <div class="form-input">
                    <input type="text"  placeholder="Nome" v-model="nome">
                </div>
                <div class="form-input">
                    <input type="text"  placeholder="Email" v-model="email">
                </div>
                <div class="form-input">
                    <input type="password"  placeholder="Senha" v-model="senha" autocomplete="new-password">
                </div>
                <div class="form-input">
                    <input type="password"  placeholder="Confirme a Senha" v-model="confirmaSenha" autocomplete="new-password">
                </div>
                <div class="form-input">
                    <input type="text"  placeholder="Token de segurança" v-model="token">
                </div>

            </form>
             
            <div class="form-submit" @click="cadastrarFirebase">Cadastrar</div>    
        
            <div class="form-message" :class="{'erro': erro == true}">{{mensagem}}</div>

            <div class="form-cadastrar" @click="telaLogin()">Voltar Para Login</div>

        </div>
    
    </div>
    
</template>

<script>

    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import firebase from 'firebase'
    import { setTimeout } from 'timers';

    export default {

        name:'login',
        data(){
            return {
               
                email:'',
                senha:'',

                nome:'',
                confirmaSenha:'',
                token:'',
                
                erro:false,
                mensagem:'',
                cadastrar:false,

                
            }
        },
        computed:{
            ...mapGetters([
            'getTitulo',
            'getVersao',
            'getUsuarioLogado'
            ])
        },
        methods:{

            telaCadastrar(){
                this.cadastrar = true
            },
            telaLogin(){
                this.cadastrar = false
            },
            // Logar usuário
            loginFirebase(){
                let self = this
                firebase.auth().signInWithEmailAndPassword(this.email, this.senha).then(() => {
                    this.mensagem = `Olá ${this.email}!`
                    // Desencadeará um "evento persistente" que monitora estado do usuario e toma decisões com base nisso (monitora lista de ususarios // interrompe monitoramento)
                    this.$router.push({ path: '/clientes'})

                    this.$store.dispatch('verificaUsuarioLogado', this.email)
                    
                    
                }).catch((error) => {

                     this.mensagem = `Erro ao logar:  ${error.code} - ${error.message}`
                    setTimeout(function(){
                       self.mensagem = ''
                    }, 3000)
                    
                    
                })
            
            },

            cadastrarFirebase(){

                let self  = this
                let nome = this.nome
                let email = this.email
                let senha1 = this.senha
                let senha2 = this.confirmaSenha
                let token = this.token

                if(senha1 != senha2 && (senha1 != '' || senha2 != '')){
                    this.erro = true
                    this.mensagem = 'As senhas não conferem.'
                    setTimeout(function(){
                        self.erro = false
                        self.mensagem = ''
                    },3000)
                }else if(nome =='' || email =='' || token =='' || senha1 == '' || senha2 == ''){
                    this.erro = true
                    this.mensagem = 'Preencha todos os campos.'
                    setTimeout(function(){
                        self.erro = false
                        self.mensagem = ''
                    },3000)
                }else{
                    

                    this.$db.collection('token_cadastro').where('token', '==', token).get().then(docResp => {
                        
                        console.log(docResp)
                        //console.log(docResp[0].data())
                        docResp.forEach(doc => {
                            
                            console.log(doc.id, " => ", doc.data());

                            if(doc){

                                let timeStampNow = new Date().getTime()
                                let difToken = self.diferencaTimestamp(timeStampNow, doc.data().timestamp)
                                if(difToken > 2){
                                    self.erro = true
                                    self.mensagem = 'O Token fornecido já expirou.'
                                    setTimeout(function(){
                                        self.erro = false
                                        self.mensagem = ''
                                    },3000)

                                }else{

                                    let grupo = doc.data().grupo

                                    firebase.auth().createUserWithEmailAndPassword(self.email, self.senha).then(() => {
                        
                                        let user = firebase.auth().currentUser

                                        user.updateProfile({
                                            displayName: nome
                                        }).then(() => {
                                            self.mensagem = `${nome} cadastrado com sucesso!`
                                            self.registrarNovoUsuario(user.uid, nome, email, grupo )
                                        }).catch( (errorName) => {
                                            self.erro = true
                                            self.mensagem = `Cadastrado com erro:  ${errorName}`
                                            setTimeout(function(){
                                                self.erro = false
                                                self.mensagem = ''
                                            },3000)

                                            
                                        })

                                    }).catch((error) => {
                                        self.erro = true
                                        self.mensagem = `Erro ao cadastrar:  ${error.Message}`
                                        setTimeout(function(){
                                            self.erro = false
                                            self.mensagem = ''
                                        },3000)
                                        
                                    })


                                }


                            }else{
                                console.log(error)
                                this.erro = true
                                this.mensagem = 'O Token fornecido não existe.'
                                setTimeout(function(){
                                    self.erro = false
                                    self.mensagem = ''
                                },3000)
                            }






                        });

                        
                        


                    }).catch(error => {

                        self.erro = true
                        self.mensagem = 'O Token fornecido é inválido.'
                        setTimeout(function(){
                            self.erro = false
                            self.mensagem = ''
                        },3000)


                    })


                    




                }

                
                        
            },

            diferencaTimestamp(timestamp1, timestamp2) {
                let difference = timestamp1 - timestamp2;
                let daysDifference = Math.floor(difference/1000/60/60/24)

                return daysDifference;


            },

           
            // Cloud Firestore - adicionar registro (documento)
            registrarNovoUsuario(uid, nome, email, grupo){
                let self  = this
                let item = {
                    id: uid,
                    nome: nome,
                    email: email,
                    grupo: {
                        id: grupo,
                        nome:''
                    },
                    data_cadastro: new Date()
                }

                this.$db.collection('users').add(item).then((docRef) =>{
                    console.log('Users::: ok')
                    console.log(docRef)
                    //this.$router.push({ path: '/login'})

                    self.nome = ''
                    self.email = ''
                    self.senha = ''
                    self.confirmaSenha = ''
                    self.token = ''

                }).catch((error) => {
                    self.erro = true
                    self.mensagem = `Erro ao cadastrar:  ${error.Message}`
                    setTimeout(function(){
                        self.erro = false
                        self.mensagem = ''
                    },3000)

                    console.log('Users::: Erro')
                    console.log(error)

                })
            }
            
        }
        
    }
</script>

<style scoped>

    #login{
        display: grid;
        grid-template-areas: 
            "g-app g-app   g-app"
            "...   g-login ...";

        grid-template-columns: 1fr minmax( 250px , 350px) 1fr;
        grid-gap: 10px;
    }


    .info-app{
        grid-area: g-app;
        position: relative;
        display: inline-block;
        text-align: center;
        margin-top:100px;
        margin-bottom: 50px;
    }
    .image-app{
        position: relative;
        display: inline-block;
        width: 100%;
        text-align: center;
        
    }
    .titulo-app{
        position: relative;
        display: inline-block;
        font-size: 58px;
        height: 58px;
        font-weight:100;
        color:#2d4052;
    }
    .versao-app{
        position: relative;
        display: inline-block;
        font-size: 11px;
        width: 100%;
        text-align: center;
    }


    .form-login{
        grid-area: g-login;
        text-align: center;
        grid-column-start: 2;
        grid-column-end: 2;
        
        /*display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
        */
    }

    .form-message{
        position: relative;
        display: block;
        color:#486684;
        font-size: 12px;
        margin-top: 20px;
    }
    .erro{
        color:#ff0000;
    }

    .form-input{
        position: relative;
        display: block;
        background-color: #ffffff;
        font-size: 14px;
        border-radius: 50px;
        margin: 5px;
        padding: 3px;
        width: auto;

    }
    
    .form-submit{
        position: relative;
        display: block;
        background-color: #486684;
       
        color:#ffffff;
        font-size: 20px;
        font-weight: 600;
        border-radius: 50px;
        margin: 5px;
        padding: 3px;
        width: auto;
        cursor: pointer;
    }
        .form-submit:hover{
            background-color: #2c3e50;
            
            box-shadow: 2px 2px 8px 1px #a6a6a6;
        }

    input{
        margin: 0 5px;
        border:0;
        width:90%;
        font-size: 16px;
        color:#486684;
    }

    input:focus{
        outline: none;
        outline-width: 0;
    }

    .form-cadastrar{
        position: relative;
        display: block;
        
        margin-top: 50px;
        font-size: 14px;
        cursor: pointer;

    }
    .form-cadastrar:hover{
        color:#005c99;
    }

</style>
