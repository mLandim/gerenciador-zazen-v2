<template>
    <div class="home">

        

        <!-- Componente Login -->  
        <login></login>

    </div>
</template>

<script>

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login'

import { mapGetters } from 'vuex'

export default {
    name: 'home',
    components:{
        'login': Login
    },
    computed:{
        ...mapGetters([
            'getTitulo',
            'getVersao'
        ]),

    },
  
}

</script>
<style scoped>
    
</style>
