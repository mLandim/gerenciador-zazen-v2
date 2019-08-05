<template>

    <div class="pagina">

        <!-- Representa a árvore de aceeso da página - estilos gerais -->
        <div class="arvore-acesso">
            <router-link to="/inicio">Início</router-link>
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
            <span>Clientes</span>
        </div>

        <!-- Conteúdo exibido na página - Estilos gerais -->
        <div class="info-conteudo">
            
            <div class="informacao">
                <div class="informacao-titulo">Clientes</div>
                <div class="informacao-quantidades" v-if="tabela.length===tabelafiltro.length">
                    <div class="q-total" v-if="tabela.length > 1">{{ tabela.length }} cadastrados</div>
                    <div class="q-total" v-else >{{ tabela.length }} cadastrado</div>
                </div>
                <div class="informacao-quantidades" v-else>
                    <div class="q-total"> exibindo {{ tabelafiltro.length }}  / </div> <div class="q-filtrada">{{ tabela.length}} cadastrados</div>
                </div>

                <div class="dock-btn dock-btn-right">
                   <div class="btn" :class="{'btn-desable': exibe=='tabela', 'btn-pdr' : exibe!='tabela'}" @click="exibe='tabela'" >
                        <div class="btn-label">Tabela</div>
                        <font-awesome-icon :icon="['fas', 'border-all']"  class="btn-ico" />
                    </div>
                    <div class="btn" :class="{'btn-desable': exibe=='cards', 'btn-pdr' : exibe!='cards'}"  @click="exibe='cards'" >
                        <div class="btn-label">Cartões</div>
                        <font-awesome-icon :icon="['fas', 'th']"  class="btn-ico" />
                    </div>
                    <div class="btn" :class="{'btn-desable': exibe=='grafico', 'btn-pdr' : exibe!='grafico'}"  @click="exibe='grafico'" >
                        <div class="btn-label">Estatísticas</div>
                        <font-awesome-icon :icon="['fas', 'chart-line']"  class="btn-ico" />
                    </div>
                </div>

            </div>
            
            <!-- Cards -->
            <template v-if="exibe==='cards'">

                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>
                    <div class="order-conteiner">
                        <span>Ordenar por </span>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'nome')">NOME</div>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'data_nascimento')">ANIVERSÁRIO</div>
                        <div class="order-item" @click="aplicarOrdem(tabelafiltro, true, 'contratos')">QUANTIDADE CONTRATOS</div>
                    </div>
                    <div class="order-conteiner-min">
                        <div class="order-item"><font-awesome-icon :icon="['fas', 'sort-alpha-down']" fixed-width /></div>
                        
                    </div>

                    <!-- Comandos para manipular os dados da tabela -->
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Cliente</div>
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                        </div>
                    </div>

                </div>

                <div class="lista-itens">
                    
                    <div class="item"  v-for="item in tabelafiltro" :key="item.nome" @click="abreDetalhe(item)">
                        <div class="item-image">
                            <div class="thunb-none"><font-awesome-icon :icon="['fas', 'user']" fixed-width /></div>
                        </div>
                        <div class="item-info">
                            <span class="info-linha1">{{ item.nome_completo }}</span>
                            <span class="info-linha2"><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> {{ item.email }}</span>
                            <span class="info-linha2" v-if="item.instagram"><font-awesome-icon :icon="['fab', 'instagram']" size="lg" fixed-width /> {{ item.instagram }}</span>
                            
                        </div>
                        <div class="item-bar">
                            <span v-if="item.telefone"><font-awesome-icon :icon="['fas', 'phone']" size="lg" fixed-width />{{ item.telefone_completo }} </span>
                            <span><font-awesome-icon :icon="['fas', 'birthday-cake']" size="lg" fixed-width />{{ item.data_nascimento }}</span>
                            <span v-if="item.contratos" class="item-bar-contratos"><font-awesome-icon :icon="['fas', 'file-invoice-dollar']" size="lg" fixed-width />{{ item.contratos_len }} Contr. </span>
                        </div>
                    </div>

                </div>

            </template>
            <!-- Tabela -->
            <template v-else-if="exibe==='tabela'">
                
                <div class="lista-filter-order">
                    <div class="input-filter">
                        <input type="text" placeholder="Filtar Resultados..." v-model="filtro" >
                        <font-awesome-icon :icon="['fas', 'search']" fixed-width class="input-ico" />
                    </div>

                    <!-- Comandos para manipular os dados da tabela -->
                    <div class="dock-btn dock-btn-right">
                        <div class="btn" :class="{'btn-green': linhasSelecionadas.length==0, 'btn-desable' : linhasSelecionadas.length>0}"  @click="abreDetalhe('novo')">
                            <div class="btn-label">Novo Cliente</div>
                            <font-awesome-icon :icon="['fas', 'plus']" size="lg" class="btn-ico" />
                        </div>
                    </div>

                </div>

                <div class="cd-grid-container">
                
                    <div class="cd-grid cd-grid-30  cd-shw-0">

                        <div class="cd-grid-title">

                            <span>Clique na Linha para Selecionar...</span>

                            

                        </div>

                        <div class="cd-grid-content">
                        
                            <table class="tabela-formatada"  style="width:100%" cellspacing="0"  >
                                <thead>
                                    <tr>
                                        <template  v-for="(head, key) in tabelaClientes.tabelaHead" >
                                                    
                                            <th  :key="head.colunaId" class="th" :style="head.style" style="text-align:center;" > <!-- :class="{ 'th-maior': head.columnData === 'ABREVIADO'}" -->

                                                <!--Se a propriedade filterText não estiver disponível: não habilitar o filtro para a coluna-->
                                                <div class="filtro">
                                                    <input v-if="'filterText' in head" type="text"  v-model="head.filterText" placeholder="Filtrar..." > <!--:size="head.filterSize" -->
                                                </div>
                                                <!--Se a propriedade asc não estiver disponível: não habilitar a coluna para ordenar-->
                                                <div class="ordem" v-if="'asc' in head" :id="key" :class="{'head-sort': 'asc' in head}"  @click="ordenar(tabelaClientes, tabelaFiltrada, $event)">
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
                                

                                    <tr v-for="(linha) in tabelaFiltrada" :key="linha.id" @click="abreDetalhe(linha)"> <!--:class="{'tr-x': linha.EXC == 'X'}" @click="clicarLinhaSubconta(linha)"-->
                                        
                                        <template v-for="(th) in tabelaClientes.tabelaHead"  >
                                            
                                            <!--
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-if="th.type=='checkbox'" >
                                                <font-awesome-icon :icon="['fas', 'check-square']" size="2x" v-if="linha[th.columnData]" @click="desselecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                                <font-awesome-icon :icon="['fas', 'square']" size="2x" v-else @click="selecionarLinha(linha)" class="tabela-chk-fw-2x" />
                                            </td>
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" v-else >{{ linha[th.columnData] }}</td>
                                            -->
                                            <td :key="th.colunaId" :class="{'td-hover':th.asc!=null}" :style="th.style" >{{ linha[th.columnData] }}</td>
                                        </template>
                                            

                                    </tr>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Exibindo {{tabelaFiltrada.length}} de {{tabelaClientes.tabelaBody.length}} Registros</th>
                                    </tr>
                                </tfoot>

                            </table>

                        </div>

                    </div>

                </div>

            </template>
            <!-- Estatíticas -->
            <template v-else>
                <div></div>
                <div class="estatisticas">
                                        
                    <div class="cd-grid cd-grid-30  cd-shw-0">
                        <div class="cd-grid-title">
                            <span><font-awesome-icon :icon="['fas', 'birthday-cake']"  /> Aniversariantes do Mês</span> 
                        </div>
                        <div class="cd-grid-content">
                            <div class="cd-lista">
                                <div class="cd-lista-item" v-for="item in aniversariantes" :key="item.id">
                                    <span style="width:70%;" >
                                        <span style="position:relative; display:block; width:100%;height:30px;line-height:40px; font-weight:700;">{{item.nome_completo}}</span>
                                        <span style="position:relative; display:block; width:100%;height:20px;line-height:10px;font-size:10px">{{item.email}}</span>
                                    </span>
                                    <span style="width:29%; font-weight:700; line-height:40px;">{{item.data_nascimento}}</span>
                                </div>
                            </div>
                           

                        </div>
                    </div>

                     
                    
                </div>

            </template>
        
        </div>


        <!-- Novo modelo de Formulário -->
        <template v-if="detalhe">

            <!-- Máscara para bloquear o resto da página enquanto o formulário estiver aberto -->
            <div :class="{'mask-fechando' : detalheFechando, 'mask': detalheFechando===false}"></div>

            <div :class="{'formulario-detalhes-fechando' : detalheFechando, 'formulario-detalhes': detalheFechando===false}" >
                
                <template v-if="novoItem">
                    <div class="formulario-menu">

                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>

                    </div>
                    <div class="fomulario-conteudo">
                        <div class="formulario-conteudo-titulo">
                            <span>Novo Cliente</span>
                        </div>

                        <div class="formulario-inputs">

                            <div class="input-container" style="width:30%">
                                <label>Nome *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-model="novoDados.nome">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:70%">
                                <label>Sobrenome *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-model="novoDados.sobrenome">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Cpf *</label>
                                <div class="input-border-context regular-context" style="height:30px">
                                    <input type="text" v-mask="'###.###.###-##'"  v-model="novoDados.cpf">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Rg</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"  v-model="novoDados.rg">

                                </div>
                            </div>
                            <div class="input-container" style="width:60%">
                                <label>Data de Nascimento *</label>
                                <div class="input-border-context regular-context" style="height:30px;width:30%">
                                    <input type="text" v-mask="'##/##/####'"  v-model="novoDados.nascimento">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:60%">
                                <label>Email *</label>
                                <div class="input-border-context regular-context" style="height:30px;">
                                    <input type="text"  v-model="novoDados.email">
                                    <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                </div>
                            </div>
                            <div class="input-container" style="width:40%">
                                <label>Instagram</label>
                                <div class="input-border" style="height:30px;">
                                    <input type="text"  v-model="novoDados.instagram">
                                </div>
                            </div>

                        </div>
                        <div class="formularios-inputs">
                            
                            <div class="input-container" style="width:100%">
                                <label>Cep</label>
                                <div class="input-border" style="height:30px;width:20%">
                                    <input type="text" v-mask="'#####-###'"  v-model="novoDados.endereco.cep" @blur="consultaCep($event, novoDados.endereco)">
                                </div>
                            </div>
                            <div class="input-container" style="width:80%">
                                <label>Logradouro (Rua, Avenida, Travessa...)</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"   v-model="novoDados.endereco.logradouro" >
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Número</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"   v-model="novoDados.endereco.numero" >
                                </div>
                            </div>
                            <div class="input-container" style="width:100%">
                                <label>Complemento (Númdero do apartamentp, casa...)</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"   v-model="novoDados.endereco.complemento" >
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Bairro</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"   v-model="novoDados.endereco.bairro" >
                                </div>
                            </div>
                            <div class="input-container" style="width:20%">
                                <label>Cidade</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text"   v-model="novoDados.endereco.cidade" >
                                </div>
                            </div>
                            <div class="input-container" style="width:60%">
                                <label>UF</label>
                                <div class="input-border" style="height:30px;width:40px">
                                    <input type="text"   v-model="novoDados.endereco.uf" >
                                </div>
                            </div>
                            <div class="input-container" style="width:60px">
                                <label>DDD</label>
                                <div class="input-border" style="height:30px">
                                    <input type="text" v-mask="'(##)'"   v-model="novoDados.telefone.ddd" >
                                </div>
                            </div>
                            <div class="input-container" style="width:calc(100% - 60px);">
                                <label>Telefone</label>
                                <div class="input-border" style="height:30px;width:16%;">
                                    <input type="text"  v-mask="'#####-####'" v-model="novoDados.telefone.numero" >
                                </div>
                            </div>
                            <div class="input-container" style="width:100%;">
                                <label>Observações</label>
                                <div class="input-border" style="height:60px;">
                                    <textarea v-model="novoDados.observacoes" ></textarea>
                                    
                                </div>
                            </div>

                        </div>
                        <div class="formularios-inputs">
                            <div class="input-container" style="width:100%;">
                                <div class="input-button left" @click="cadastrarCliente"><font-awesome-icon :icon="['fas', 'check']" size="lg" /> Cadastrar Novo Cliente</div>
                            </div>
                        </div>
                    
                    </div>
                </template>

                <template v-else>
                    <!-- Menu lateral do Formulário -->
                    <div class="formulario-menu">

                        <div class="form-ico-close" @click="fechaDetalhe">
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" class="ico-close" />
                        </div>

                        <div class="formulario-menu-item " :class="{'menu-item-sel':menuSelecionado==0}"  @click="menuSelecionado=0">
                            <font-awesome-icon :icon="['fas', 'eye']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Visualizar</div>
                        </div>
                    
                        <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==1}"  @click="menuSelecionado=1">
                            <font-awesome-icon :icon="['fas', 'pencil-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Editar</div>
                        </div>
                        <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==2}"  @click="menuSelecionado=2">
                            <font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Vender</div>
                        </div>
                        <div class="formulario-menu-item" :class="{'menu-item-sel':menuSelecionado==3}"  @click="menuSelecionado=3">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"  class="ico-menu"/>
                            <div class="text-menu">Excluir</div>
                        </div>

                    </div>
                    <!-- Conteudo do formulário -->
                    <div class="fomulario-conteudo">
                        <div class="formulario-conteudo-titulo">
                            <span>{{itemSelecionado.nome_completo}}</span>
                        </div>
                        <!-- Visualizar -->
                        <template v-if="menuSelecionado===0">
                            
                            <div class="cliente-visualizar">
                                <div class="cliente-bloco">
                                    <div class="bloco">
                                        <div class="cliente-foto">
                                            <font-awesome-icon :icon="['fas', 'user']" />
                                        </div>
                                        <div class="cliente-tags">
                                            <label for=""><font-awesome-icon :icon="['fas', 'hashtag']" size="lg" fixed-width />Tags</label>
                                            <span>{{ itemSelecionado.tags.split('|').join(' ') }}</span>
                                        </div>
                                    </div>
                                    <div class="bloco2">
                                        <div class="formulario-conteudo-item-texto">
                                            <label for=""><font-awesome-icon :icon="['fas', 'address-card']" size="lg" fixed-width /> Documento Id</label>
                                            <span>{{itemSelecionado.cpf}}</span>
                                        </div>
                                        <div class="formulario-conteudo-item-texto">
                                            <label for=""><font-awesome-icon :icon="['far', 'envelope']" size="lg" fixed-width /> Email</label>
                                            <span>{{itemSelecionado.email}}</span>
                                        </div>
                                        <div class="formulario-conteudo-item-texto" v-if="itemSelecionado.instagram">
                                            <label for=""><font-awesome-icon :icon="['fab', 'instagram']" size="lg" fixed-width /> Instagram</label>
                                            <span>{{itemSelecionado.instagram}}</span>
                                        </div>
                                        <div class="formulario-conteudo-item-texto" >
                                            <label for=""><font-awesome-icon :icon="['fas', 'birthday-cake']" size="lg" fixed-width /> Nascimento</label>
                                            <span>{{itemSelecionado.data_nascimento}}</span>
                                        </div>
                                        <div class="formulario-conteudo-item-texto" v-if="itemSelecionado.telefone">
                                            <label for=""><font-awesome-icon :icon="['fas', 'phone']" size="lg" fixed-width /> Telefone</label>
                                            <span>{{itemSelecionado.telefone_completo}}</span>
                                        </div>
                                        <div class="formulario-conteudo-item-texto">
                                            <label for=""><font-awesome-icon :icon="['fas', 'home']" size="lg" fixed-width /> Endereço</label>
                                            <span>{{itemSelecionado.endereco.logradouro}}, {{itemSelecionado.endereco.numero}}</span>
                                            <span v-if="itemSelecionado.endereco.complemento">{{itemSelecionado.endereco.complemento}}</span>
                                            <span>{{itemSelecionado.endereco.bairro}}, {{itemSelecionado.endereco.cidade}}-{{itemSelecionado.endereco.uf}}</span>
                                            <span v-if="itemSelecionado.endereco.cep">{{itemSelecionado.endereco.cep}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="cliente-bloco2">

                                    <div class="cliente-contratos">
                                        <div class="cliente-contratos-titulo">
                                            <span>Contratos</span>
                                        </div>
                                        <div class="cliente-contratos-lista">
                                            <template v-for="item in contratos"  >
                                                <div class="cliente-contratos-item"  :key="item.id"  v-if="itemSelecionado.contratos.indexOf(item.id) !=- 1"> <!--item.cliente.id === itemSelecionado.id-->
                                                    <div class="item-image">
                                                        <div class="thunb-none">
                                                            <font-awesome-icon :icon="getIconeTipoProduto[item.categoria]" fixed-width />
                                                        </div>
                                                    </div>
                                                    <div class="item-info">
                                                        <span class="info-linha1">{{ item.modalidade }}</span>
                                                        <span class="info-linha2"><font-awesome-icon :icon="['far', 'clock']" size="lg" fixed-width /> {{ item.plano }} - {{ item.frequencia }} - {{ item.horario }}</span>
                                                    </div>
                                                    <div class="item-bar">
                                                        <span ><font-awesome-icon :icon="['fas', 'check']" size="lg" fixed-width />{{ item.data_inicio }}</span>
                                                        <span ><font-awesome-icon :icon="['fas', 'hourglass-half']" size="lg" fixed-width />{{ item.vencimento_pz }} dias</span>
                                                        <span ><font-awesome-icon :icon="['fas', 'dollar-sign']" size="lg" fixed-width />{{ item.valor }}</span>
                                                    </div>
                                                </div>
                                            </template>
                                            
                                        </div>    

                                    </div>
                                    


                                </div>
                            </div>
                        </template>

                        <!-- Editar -->
                        <template v-if="menuSelecionado===1">
                            
                            <div class="formulario-inputs">

                                <div class="input-container" style="width:30%">
                                    <label>Nome *</label>
                                    <div class="input-border-context regular-context" style="height:30px">
                                        <input type="text" v-model="itemSelecionado.nome">
                                        <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                    </div>
                                </div>
                                <div class="input-container" style="width:70%">
                                    <label>Sobrenome *</label>
                                    <div class="input-border-context regular-context" style="height:30px">
                                        <input type="text" v-model="itemSelecionado.sobrenome">
                                        <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                    </div>
                                </div>
                                <div class="input-container" style="width:20%">
                                    <label>Cpf *</label>
                                    <div class="input-border-context regular-context" style="height:30px">
                                        <input type="text" v-mask="'###.###.###-##'"  v-model="itemSelecionado.cpf">
                                        <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                    </div>
                                </div>
                                <div class="input-container" style="width:20%">
                                    <label>Rg</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"  v-model="itemSelecionado.rg">

                                    </div>
                                </div>
                                <div class="input-container" style="width:60%">
                                    <label>Data de Nascimento *</label>
                                    <div class="input-border-context regular-context" style="height:30px;width:30%">
                                        <input type="text" v-mask="'##/##/####'"  v-model="itemSelecionado.data_nascimento">
                                        <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                    </div>
                                </div>
                                <div class="input-container" style="width:60%">
                                    <label>Email *</label>
                                    <div class="input-border-context regular-context" style="height:30px;">
                                        <input type="text"  v-model="itemSelecionado.email">
                                        <font-awesome-icon :icon="['fas','exclamation-circle']" fixed-width class="ico-context" />
                                    </div>
                                </div>
                                <div class="input-container" style="width:40%">
                                    <label>Instagram</label>
                                    <div class="input-border" style="height:30px;">
                                        <input type="text"  v-model="itemSelecionado.instagram">
                                    </div>
                                </div>

                            </div>
                            <div class="formularios-inputs">
                                
                                <div class="input-container" style="width:100%">
                                    <label>Cep</label>
                                    <div class="input-border" style="height:30px;width:20%">
                                        <input type="text" v-mask="'#####-###'"  v-model="itemSelecionado.endereco.cep" @blur="consultaCep($event, itemSelecionado.endereco)">
                                    </div>
                                </div>
                                <div class="input-container" style="width:80%">
                                    <label>Logradouro (Rua, Avenida, Travessa...)</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"   v-model="itemSelecionado.endereco.logradouro" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:20%">
                                    <label>Número</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"   v-model="itemSelecionado.endereco.numero" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:100%">
                                    <label>Complemento (Númdero do apartamentp, casa...)</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"   v-model="itemSelecionado.endereco.complemento" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:20%">
                                    <label>Bairro</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"   v-model="itemSelecionado.endereco.bairro" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:20%">
                                    <label>Cidade</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text"   v-model="itemSelecionado.endereco.cidade" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:60%">
                                    <label>UF</label>
                                    <div class="input-border" style="height:30px;width:40px">
                                        <input type="text"   v-model="itemSelecionado.endereco.uf" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:60px">
                                    <label>DDD</label>
                                    <div class="input-border" style="height:30px">
                                        <input type="text" v-mask="'(##)'"   v-model="itemSelecionado.telefone.ddd" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:calc(100% - 60px);">
                                    <label>Telefone</label>
                                    <div class="input-border" style="height:30px;width:16%;">
                                        <input type="text"  v-mask="'#####-####'" v-model="itemSelecionado.telefone.numero" >
                                    </div>
                                </div>
                                <div class="input-container" style="width:100%;">
                                    <label>Observações</label>
                                    <div class="input-border" style="height:60px;">
                                        <textarea v-model="itemSelecionado.observacoes" ></textarea>
                                        
                                    </div>
                                </div>

                            </div>
                            <div class="formularios-inputs">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="editarCliente"><font-awesome-icon :icon="['fas', 'check']" size="lg" /> Confirmar Alterações</div>
                                </div>
                            </div>
                        </template>

                        <!-- Vender -->
                        <template v-if="menuSelecionado===2">

                            <div class="formulario-inputs">

                                <div class="input-container" style="width:100%">
                                    <label>Tipo de Produto</label>
                                    <div class="input-buttons-list" style="height:auto">
                                        <div class="opc-button" :class="{'opc-sel': venderDados.categoria === 'YOGA'}"  @click="venderDados.categoria = 'YOGA'">
                                            <font-awesome-icon :icon="getIconeTipoProduto['YOGA']" fixed-width /> YOGA
                                        </div>
                                        <div class="opc-button" :class="{'opc-sel': venderDados.categoria === 'LOJA'}"  @click="venderDados.categoria = 'LOJA'">
                                            <font-awesome-icon :icon="getIconeTipoProduto['LOJA']" fixed-width /> LOJA
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="formulario-inputs" v-if="venderDados.categoria === 'YOGA'">
                                <div class="input-container" style="width:100%">
                                    <label>Produtos Disponíveis</label>
                                    <div class="input-border-context regular-context" style="height:30px;width:30%">
                                        <input type="text" v-model="filtroProdutos" placeholder="Filtrar...">
                                        <font-awesome-icon :icon="['fas','search']" fixed-width class="ico-context" />
                                    </div>
                                    <div class="input-itens-list" style="height:320px; overflow-y:auto;">
                                        <div class="item-list" :class="{'item-list-sel': venderDados.produto != null && venderDados.produto.id === item.id}" style="height:40px;" v-for="item in listaProdutosVender" :key="item.id" @click="venderDados.produto = item">
                                            <div class="item-cell" style="width:20%">{{item.modalidade}}</div>
                                            <div class="item-cell" style="width:60%">Plano {{item.plano}} - Frequência {{item.frequencia}} - Horário {{item.horario}}h</div>
                                            <div class="item-cell" style="width:20%; font-size:22px; font-weight:700; text-align:center;">R$ {{item.valor}}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                            <div class="formularios-inputs" v-if="venderDados.produto!=null">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="cadastrarContrato"><font-awesome-icon :icon="['fas', 'check']" size="1x" /> Confirmar Venda</div>
                                </div>
                            </div>

                        </template>
                        
                        <!-- Excluir -->
                        <template v-if="menuSelecionado===3">
                            <div class="formulario-inputs" >
                                <div class="input-container" style="width:100%">
                                    <label><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Tem certeza de que deseja excluir o cliente?</label>
                                </div>
                            </div>
                             <div class="formularios-inputs">
                                <div class="input-container" style="width:100%;">
                                    <div class="input-button left" @click="excluirCliente"><font-awesome-icon :icon="['fas', 'trash-alt']" size="1x" /> Confirmar Exclusão do Cliente</div>
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

export default {

    name:'clientes',
    directives:{
        mask
    },
    data(){
        return {

            exibe: 'tabela',
            // Controles Itens
            tabela:[],
            contratos:[],
            produtos:[],
            filtro:'',


            // Controles Tabela
            tabelaClientes:{
                tabelaTitle:'Clientes',
                tabelaHead: [
                    {colunaId:0, columnText:'Cpf', columnData:'cpf', type:'string', filterText:'', asc:null,  style:{}},
                    {colunaId:1, columnText:'Nome', columnData:'nome_completo', type:'string', filterText:'',  asc:null,  style:{width:'20%', textAlign:'left'}},
                    {colunaId:2, columnText:'Email', columnData:'email', type:'string', filterText:'',  asc:null,  style:{width:'20%', textAlign:'left'}},
                    {colunaId:3, columnText:'Igr', columnData:'instagram', type:'string', filterText:'',  asc:null,  style:{width:'10%',textAlign:'left'}},
                    {colunaId:4, columnText:'Data Cadastro', columnData:'data_cadastro', columnOrder: 'data_cadastro_order', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:5, columnText:'Data Nascimento', columnData:'data_nascimento', columnOrder: 'data_nascimento_order', type:'string', filterText:'',  asc:null,  style:{}},
                    {colunaId:6, columnText:'Situação', columnData:'situacao', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    {colunaId:7, columnText:'Telefone', columnData:'telefone_completo', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    {colunaId:8, columnText:'Contratos', columnData:'contratos_len', type:'string', filterText:'', asc:null, style:{textAlign:'center'}},
                    //{colunaId:9, columnText:'Selecionar', columnData:'sel', type:'checkbox', asc:null, style:{width:'6%', textAlign:'center'}},
                ],
                tabelaBody:[]
            },
            linhasSelecionadas:[],

            

            // Controles Formulário
            itemSelecionado:null,
            menuSelecionado:0,
            detalhe: false,
            detalheFechando:false,
            novoItem:false,
            novoDados:{
                nome:'',
                sobrenome:'',
                email:'',
                instagram:'',
                cpf:'',
                rg:'',
                endereco:{
                    logradouro:'',
                    numero:'',
                    complemento:'',
                    cep:'',
                    bairro:'',
                    cidade:'',
                    uf:''

                },
                telefone:{
                    ddd:'',
                    numero:'',
                },
                        
                nascimento:'',
                observacoes:'',
                data_cadastro:'',
                contratos:[],
                ativo: true,
                cadastrado_por:''
            },
            editarDados:{
                nome:'',
                sobrenome:'',
                email:'',
                instagram:'',
                cpf:'',
                rg:'',
                endereco:{
                    logradouro:'',
                    numero:'',
                    complemento:'',
                    cep:'',
                    bairro:'',
                    cidade:'',
                    uf:''

                },
                telefone:{
                    ddd:'',
                    numero:'',
                },
                        
                nascimento:'',
                observacoes:'',
                data_cadastro:'',
                contratos:[],
                ativo: true,
                cadastrado_por:''
            },
            venderDados:{
                categoria:null,
                produto:null,
                cliente:null,
                turma:null
            },
            filtroProdutos:''
        }
    },
    computed:{
        ...mapGetters([
            'getUsuarioLogado',
            'getTabela_Clientes',
            'getTabela_Contratos',
            'getTabela_Produtos',
            'getIconeTipoProduto'
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
            this.tabelaClientes.tabelaBody = resultado
            return resultado

        },

        tabelaFiltrada:function(){
            return utilitarios.filtrandoTabela(this.tabelaClientes);
        },

        aniversariantes:function(){

            let resposta = []
            for (let index = 0; index < this.getTabela_Clientes.length; index++) {
                const element = this.getTabela_Clientes[index];
                if(element.tags.includes('#niver')){
                    resposta.push(element)
                }
            }

            return resposta


        },

        listaProdutosVender:function(){
            let self = this
            let resultado = []
            let filtro = this.filtroProdutos
            let arrLen = this.getTabela_Produtos.tabelaYoga.length
            for (let index = 0; index < arrLen; index++) {
                const element = this.getTabela_Produtos.tabelaYoga[index];

                if(JSON.stringify(element).toUpperCase().includes(filtro.toUpperCase())){
                    resultado.push(element)
                }
            }
            //this.tabelaClientes.tabelaBody = resultado
            return resultado
        }


    },
    created(){
        console.log('Clientes >> Criado')
        console.log(this.getTabela_Clientes)

        // Clientes
        this.tabela = this.getTabela_Clientes // itens
        this.tabelaClientes.tabelaBody = this.getTabela_Clientes // tabelas
        
        // Contratos
        console.log('Clientes >> Contratos')
        console.log(this.getTabela_Contratos)
        this.contratos = [...this.getTabela_Contratos.tabelaYoga, ...this.getTabela_Contratos.tabelaSalas, ...this.getTabela_Contratos.tabelaLoja]
        console.log(this.contratos)
    },
    watch:{

        getTabela_Clientes: function(val){
            console.log('watch >> getTabela_Clientes')
            
            this.tabela = val // itens
            this.tabelaClientes.tabelaBody = val // tabelas

        },
        getTabela_Contratos: function(val){
            console.log('watch >> getTabela_Contratos')
            
            this.contratos =  [...val.tabelaYoga, ...val.tabelaSalas, ...val.tabelaLoja]

        }

    },

    methods:{


        // Itens / Tabela

            // Selecionado item e abrindo formulário
            abreDetalhe(item){
                if(item==='novo'){
                    this.novoItem=true
                    this.detalhe = true
                }else{
                    this.itemSelecionado = item
                    this.detalhe = true
                }
                console.log('abreDetalhe >>')
                
        
            },

            // Tabela > Ordernar tabela
            ordenar(tabelaClientes, tabelaFiltrada, e){
                utilitarios.ordenarTabela(tabelaClientes, tabelaFiltrada, e)
            },

        // Formulário Detalhe
            
            // Fechando formulário e liberando controles
            fechaDetalhe(){

                console.log('fechaDetalhe >>')
                this.detalheFechando = true
                

                setTimeout(()=>{
                    let novo = {
                        nome:'',
                        sobrenome:'',
                        email:'',
                        instagram:'',
                        cpf:'',
                        rg:'',
                        endereco:{
                            logradouro:'',
                            numero:'',
                            complemento:'',
                            cep:'',
                            bairro:'',
                            cidade:'',
                            uf:''

                        },
                        telefone:{
                            ddd:'',
                            numero:'',
                        },
                                
                        nascimento:'',
                        observacoes:'',
                        data_cadastro:'',
                        contratos:[],
                        ativo: true,
                        cadastrado_por:''
                    }
                    let vender = {
                        categoria:null,
                        produto:null,
                        cliente:null,
                        turma:null
                    }
                    this.menuSelecionado = 0
                    this.novoDados = novo
                    this.venderDados = vender
                    this.novoItem = false
                    this.itemSelecionado = null
                    this.detalhe = false
                    this.detalheFechando = false
                },1000)
                
            },
            // Selecionando item do menu
            selecionaMenu(menuIndex){
                this.menuSelecionado = menuIndex
            },

            // Consultando CEP no web service dos Correios
            consultaCep(e, formulario){

                let self = this
                const cep = e.target.value
                console.log(cep)
                if(cep.length>0){
                    this.$http.get('https://viacep.com.br/ws/' + cep + '/json/').then( resposta =>{

                        console.log(resposta.data)
                        let resultado = resposta.data
                        formulario.logradouro = resultado.logradouro
                        formulario.bairro = resultado.bairro
                        formulario.cidade = resultado.localidade
                        formulario.uf = resultado.uf

                    }).catch(error => {
                        console.error(error)
                    })
                }else{
                    console.log('cep vazio')
                }

                

            },
            // Cadastrar novo Cliente
            cadastrarCliente(){

                console.log('cadastrarCliente')
                let self = this
                // verificando campos obrigatórios
                if(self.novoDados.nome.length == 0 || self.novoDados.sobrenome.length == 0 || self.novoDados.email.length == 0 || self.novoDados.cpf.length == 0 || self.novoDados.nascimento.length == 0){

                    alert('Preencha todos os campos obrigatórios! (*)')

                }else{

                    self.novoDados.nome = self.novoDados.nome.toUpperCase()
                    self.novoDados.sobrenome = self.novoDados.sobrenome.toUpperCase()
                    self.novoDados.data_cadastro = new Date()
                    self.novoDados.nascimento = utilitarios.stringToDate(self.novoDados.nascimento)
                    self.novoDados.cadastrado_por = self.getUsuarioLogado.uid
                    self.novoDados.email = self.novoDados.email.toLowerCase()
                    self.novoDados.instagram = self.novoDados.instagram.toLowerCase()

                    this.$db.collection('clientes').add(self.novoDados).then(resposta =>{
                        console.log(resposta.id)
                        console.log(resposta)

                        let dados = {
                            nome:'',
                            sobrenome:'',
                            email:'',
                            instagram:'',
                            cpf:'',
                            rg:'',
                            endereco:{
                                logradouro:'',
                                numero:'',
                                complemento:'',
                                cep:'',
                                bairro:'',
                                cidade:'',
                                uf:''
                            },
                            telefone:{
                                ddd:'',
                                numero:'',
                            },
                            nascimento:'',
                            observacoes:'',
                            data_cadastro:'',
                            contratos:[],
                            ativo: true,
                            cadastrado_por:''
                        }

                        self.novoDados = dados

                        alert('Cadastrato com sucesso!')

                    }).catch(function(error) {
                        console.error("Error adding document: ", error)
                    });

                }
                


            },
            // Vender produto para o CLiente
            cadastrarContrato(){
                let self = this
                let clienteSelecionado = this.itemSelecionado
                // Validação temporária
                if(this.venderDados.produto!==null && clienteSelecionado!==null){


                    let linha = {
                        cliente:[clienteSelecionado.id],
                        data_inicio:new Date(),
                        produto:[this.venderDados.produto.id],
                        turma:[''],
                        situacao:'ativo',
                        valor_total:this.venderDados.produto.valor
                    }

                    //let batch = this.$db.batch()
                    //let updateCliente = this.$db.collection("clientes").doc(this.formularios[2].clienteSelecionado.id);
                    //batch.update(updateCliente, {"contratos": FieldValue.arrayUnion()});


                    this.$db.collection('contratos').add(linha).then(resposta =>{
                        console.log(resposta.id)
                        console.log(resposta)

                        // Atualizando informações do cliente com o novo contrato
                        self.$db.collection("clientes").doc(clienteSelecionado.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
                            console.log("Clientes atualizados com sucesso")
                        }).catch(error2 =>{
                            console.error("Error adding document: ", error)
                        })
                        // Atualizando informações do produto com o novo contrato
                        self.$db.collection("produtos").doc(self.venderDados.produto.id).update({"contratos": firebase.firestore.FieldValue.arrayUnion(resposta.id)}).then(function(){
                            console.log("Produtos atualizados com sucesso")
                        }).catch(error3 =>{
                            console.error("Error adding document: ", error)
                        })


                        alert('Cadastrato com sucesso!')


                    }).catch(function(error) {
                        console.error("Error adding document: ", error)
                    });

                }else{
                    alert("Selecione um Cliente e um Produto.")
                }

            },
            // Editar Cliente
            editarCliente(){

                console.log('editarCliente')
                let self = this
                let clienteSelecionado = this.itemSelecionado
                let cloneCliente = Object.assign({}, clienteSelecionado)
                delete cloneCliente.id
                console.log(clienteSelecionado)
                console.log(cloneCliente)
                let _nome = cloneCliente.nome.toUpperCase()
                let _sobrenome =  cloneCliente.sobrenome.toUpperCase()
                
                //let _rg
                //let _cpf
                //let _email = cloneCliente.email
                //let _instagram = cloneCliente.instagram
                let _nascimento = utilitarios.stringToDate(cloneCliente.data_nascimento)
                //let _observacoes = cloneCliente.observacoes
                
                
                this.$db.collection('clientes').doc(clienteSelecionado.id).update({

                    nome: _nome,
                    sobrenome: _sobrenome,
                    cpf: cloneCliente.cpf,
                    rg: cloneCliente.rg,
                    email: cloneCliente.email,
                    instagram: cloneCliente.instagram,
                    nascimento: _nascimento,
                    endereco: cloneCliente.endereco,
                    telefone: {ddd: cloneCliente.telefone.ddd.replace('(', '').replace(')',''), numero: cloneCliente.telefone.numero.replace(/-/g, '')  },
                    observacoes: cloneCliente.observacoes,

                    /*
                    'endereco.bairro': cloneCliente.endereco.bairro,
                    endereco.cep,
                    endereco.complemento,
                    endereco.cidade,
                    endereco.logradouro,
                    endereco.numero,
                    endereco.uf,
                    telefone.ddd,
                    telefone.numero
                    observacoes:
                    */


                }).then(function(){
                        
                        //console.log(resposta.id)
                        //console.log(resposta)
                        /*
                        let dados = {
                            nome:'',
                            sobrenome:'',
                            email:'',
                            instagram:'',
                            cpf:'',
                            rg:'',
                            endereco:{
                                logradouro:'',
                                numero:'',
                                complemento:'',
                                cep:'',
                                bairro:'',
                                cidade:'',
                                uf:''
                            },
                            telefone:{
                                ddd:'',
                                numero:'',
                            },
                            nascimento:'',
                            observacoes:'',
                            data_cadastro:'',
                            contratos:[],
                            ativo: true,
                            cadastrado_por:''
                        }

                        self.novoDados = dados
                        */
                        alert('Atualizado com sucesso!')
                        self.fechaDetalhe()

                }).catch(function(error) {
                        console.error("Error adding document: ", error)
                });
                

            },
            // Excluir Cliente
            excluirCliente(){
                let self = this
                let clienteSelecionado = this.itemSelecionado
                this.$db.collection('clientes').doc(clienteSelecionado.id).delete().then(function(){
                    self.fechaDetalhe()
                    alert(`${clienteSelecionado.nome} excluído com sucesso!`)
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                })
                
            },
        

        // Métodos antigos

            // Abre formulário flutuante para NOVO produto
            novoantigo(){
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


        // Em desuso

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

    }

}

</script>


<style scoped>

    .cliente-visualizar{
        display: grid;
        grid-template-rows: 1fr 1fr;
        height: calc(100% - 50px);
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
    }

    .cliente-visualizar > .cliente-bloco{
        display: grid;
        grid-template-columns: 200px 1fr;
        height: 100%;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #272727;
        box-sizing: border-box;
    }
    .bloco2{
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .cliente-foto{
        display: block;
        position: relative;
        height: 200px;
        line-height: 200px;
        width: 200px;
        background-color: #272727;
        border-radius: 10px;
        text-align: center;
        color:#4d4d4d;
        box-sizing: border-box;
    }

    .cliente-foto > svg{
        height: 200px;
        line-height: 200px;
        font-size: 102px;
    }
    
    .cliente-tags > label{
        text-align: left;
        color: #00e7fc;
        font-size: 11px;
        
    }

    .cliente-tags span{
        display: block;
        position: relative;
        height: 100px;
        line-height: 12px;
        width: 100%;
        text-align: left;
        color: #f1f1f1;
        font-size: 12px;
        font-weight: 700;
        margin-top: 3px;
        padding: 0 5px;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .cliente-contratos{
        display: grid;
        grid-template-rows: 50px 1fr;
        height: 100%;
        width: 100%;
        
        box-sizing: border-box;
    }
    .cliente-contratos-titulo{
        display: block;
        position: relative;
        height: 50px;
        line-height: 50px;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .cliente-contratos-titulo > span{

        text-align: left;
        color: #f1f1f1;
        font-size: 28px;
        font-weight: 700;
    }

    .cliente-contratos-lista{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-template-rows: repeat(auto-fill, 98px);
        grid-gap: 8px;
        overflow-y: auto;
        
        box-sizing: border-box;
    }
    .cliente-contratos-item{
        display: grid;
        grid-template-columns: 44px auto;
        grid-template-rows: 70px auto;
        grid-column-gap: 2px;
        background-color: #ffffff;
        height: 98px;
        padding: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        border-radius: 6px;
        overflow: hidden;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        
    }

    @media screen and (max-width: 400px){
        .cliente-foto{display:inline-block; vertical-align: top; height: 50px;line-height: 50px;width: 50px;margin-left: 10px;}
        .cliente-tags{display:inline-block; vertical-align: top; height: 50px; width: calc(100% - 65px);}
        .cliente-tags span{ height: 38px;}
        .cliente-foto > svg{height: 50px;line-height: 50px; font-size: 32px;}
        .cliente-visualizar > .cliente-bloco{grid-template-columns:1fr; grid-template-rows: 50px 1fr;}

    }

</style>
