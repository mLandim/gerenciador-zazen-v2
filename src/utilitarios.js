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

        //**************************************************************************************************************************    
        

}

