export const utilitarios = {


        //**************************************************************************************************************************
        // Utilitários
        mesAtual(){
            let data = new Date()
            let mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
            let mesF = (mes.length == 1) ? '0'+mes : mes

            return mesF
        },
        dataFormatada: function(dataCompleta) {
            let data = new Date(dataCompleta)
            let dia  = data.getDate().toString()
            let diaF = (dia.length == 1) ? '0'+dia : dia
            let mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
            let mesF = (mes.length == 1) ? '0'+mes : mes
            let anoF = data.getFullYear()

            return diaF+"/"+mesF+"/"+anoF
        },

        dataVencimentoFormatada(dataCompleta, plano){
            let data = new Date(dataCompleta)

            let vencimento
            if(plano=='Mensal'){
                vencimento = data.setMonth(data.getMonth()+1)
            }else if(plano=="Trimestral"){
                vencimento = data.setMonth(data.getMonth()+3)
            }else if(plano=='Semestral'){
                vencimento = data.setMonth(data.getMonth()+6)
            }
            vencimento = new Date(vencimento)
            //console.log('dataVencimentoFormatada')
            //console.log(data)
            //console.log(vencimento)

            let dia  = vencimento.getDate().toString()
            let diaF = (dia.length == 1) ? '0'+dia : dia
            let mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
            let mesF = (mes.length == 1) ? '0'+mes : mes
            let anoF = data.getFullYear()

            return diaF+"/"+mesF+"/"+anoF
        },

        diferencaDatas(dataCompleta, plano){
            let data = new Date(dataCompleta)
            let hoje = new Date()
            let vencimento
            if(plano=='Mensal'){
                vencimento = data.setMonth(data.getMonth()+1)
            }else if(plano=="Trimestral"){
                vencimento = data.setMonth(data.getMonth()+3)
            }else if(plano=='Semestral'){
                vencimento = data.setMonth(data.getMonth()+6)
            }
            //vencimento = new Date(vencimento)
            //console.log('diferencaDatas')
            //console.log('> ' +hoje)
            //console.log('>> ' +vencimento)
            let resultado =  Math.floor((vencimento-hoje)/(1000*60*60*24))
            if(resultado < 1){
                //resultado = '00:'+Math.floor((vencimento-hoje)/(1000*60*24)).toFixed(0)+':00'
                resultado = 0
            }else{

            }
            return resultado


        },

        diferencaDiasHoje(dataCompleta){
            let data = new Date(dataCompleta)
            let hoje = new Date()
           
            let resultado =  Math.floor((hoje-data)/(1000*60*60*24))
            if(resultado < 1){
                //resultado = '00:'+Math.floor((vencimento-hoje)/(1000*60*24)).toFixed(0)+':00'
                resultado = 0
            }else{

            }
            return resultado


        },

        // Ao selecionar
        selecionarLinha(linhasSelecionadas, linha){
            linha.sel = true
            let linhasLen = linhasSelecionadas.length
            let teste = false
            for (let index = 0; index < linhasLen; index++) {
                const element = linhasSelecionadas[index];
                if(element.id === linha.id){
                    teste = true
                    break
                }
            }
            if(!teste){
                linhasSelecionadas.push(linha)
            }

            
        },

        // Ao desselecionar
        desselecionarLinha(linhasSelecionadas, linha){
            linha.sel = false
            let linhasLen = linhasSelecionadas.length
            for (let index = 0; index < linhasLen; index++) {
                const element = linhasSelecionadas[index];
                if(element.id === linha.id){
                    linhasSelecionadas.splice(index, 1)
                    break
                }
            }

        },

        stringToDate(data){

            let dataArr = `${data.split('/')[2]}-${data.split('/')[1]}-${data.split('/')[0]}`
            return new Date(dataArr)

        }

}

