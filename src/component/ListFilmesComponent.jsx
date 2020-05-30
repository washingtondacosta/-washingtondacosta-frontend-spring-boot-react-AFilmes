import React, { Component } from 'react'
import FilmeDataService from '../service/FilmeDataService';

const AFILMES = 'afilmes'

class ListFilmesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filmes: [],
            message: null
        }
        this.deleteFilmeClicked = this.deleteFilmeClicked.bind(this)
        this.updateFilmeClicked = this.updateFilmeClicked.bind(this)
        this.addFilmeClicked = this.addFilmeClicked.bind(this)
        this.refreshFilmes = this.refreshFilmes.bind(this)
    }

    componentDidMount() {
        this.refreshFilmes();
    }

    refreshFilmes() {
        FilmeDataService.retrieveAllFilmes(AFILMES)//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({ filmes: response.data })
                }
            )
    }

    deleteFilmeClicked(id) {
        FilmeDataService.deleteFilme(AFILMES, id)
            .then(
                response => {
                    this.setState({ message: `Registro de filme ${id} deletado com sucesso` })
                    this.refreshFilmes()
                }
            )

    }

    addFilmeClicked() {
        this.props.history.push(`/filmes/-1`)
    }

    updateFilmeClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/filmes/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>Lista de Filmes</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Titulo</th>
                                <th>Sinopse</th>
                                <th>Ano de lançamento</th>
                                <th>Produtor(es)</th>
                                <th>Protagonista(s)</th>
                                <th>Média das avaliações</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.filmes.map(
                                    filme =>
                                        <tr key={filme.id}>
                                            <td>{filme.id}</td>
                                            <td>{filme.titulo}</td>
                                            <td>{filme.sinopse}</td>
                                            <td>{filme.anoLancamento}</td>
                                            <td>{filme.produtores}</td>
                                            <td>{filme.protagonistas}</td>
                                            <td>{filme.mediaAvaliacoes}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.updateFilmeClicked(filme.id)}>Editar</button>
                                                <button className="btn btn-danger" onClick={() => this.deleteFilmeClicked(filme.id)}>Excluir</button>
                                                </td>
                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addFilmeClicked}>Adicionar Filme</button>
                        <a Style="margin-left:15px" className="btn btn-warning" href="../avaliacoes">Listar avaliações</a>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default ListFilmesComponent