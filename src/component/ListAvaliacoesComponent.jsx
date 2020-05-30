import React, { Component } from 'react'
import AvaliacaoDataService from '../service/AvaliacaoDataService';

const AAVALIACOES = 'aavaliacoes'

class ListAvaliacoesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avaliacoes: [],
            message: null
        }
        this.deleteAvaliacaoClicked = this.deleteAvaliacaoClicked.bind(this)
        this.updateAvaliacaoClicked = this.updateAvaliacaoClicked.bind(this)
        this.addAvaliacaoClicked = this.addAvaliacaoClicked.bind(this)
        this.refreshAvaliacoes = this.refreshAvaliacoes.bind(this)
    }

    componentDidMount() {
        this.refreshAvaliacoes();
    }

    refreshAvaliacoes() {
        AvaliacaoDataService.retrieveAllAvaliacoes(AAVALIACOES)//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({ avaliacoes: response.data })
                }
            )
    }

    deleteAvaliacaoClicked(id) {
        AvaliacaoDataService.deleteAvaliacao(AAVALIACOES, id)
            .then(
                response => {
                    this.setState({ message: `Registro de avaliação ${id} deletado com sucesso` })
                    this.refreshAvaliacoes()
                }
            )

    }

    addAvaliacaoClicked() {
        this.props.history.push(`/avaliacoes/-1`)
    }

    updateAvaliacaoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/avaliacoes/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>Avaliações</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                
                                <th>Nota</th>
                                <th>Comentário</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.avaliacoes.map(
                                    avaliacao =>
                                        <tr key={avaliacao.id}>
                                            <td>{avaliacao.id}</td>
                                            
                                            <td>{avaliacao.nota}</td>
                                            <td>{avaliacao.comentario}</td>
                                            
                                            
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.updateAvaliacaoClicked(avaliacao.id)}>Editar</button>
                                                <button className="btn btn-danger" onClick={() => this.deleteAvaliacaoClicked(avaliacao.id)}>Excluir</button>
                                                </td>
                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addAvaliacaoClicked}>Adicionar</button>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default ListAvaliacoesComponent