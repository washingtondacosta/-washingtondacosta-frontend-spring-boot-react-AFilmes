import React, { Component } from 'react';
import ListFilmesComponent from './ListFilmesComponent';
import ListAvaliacoesComponent from './ListAvaliacoesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FilmeComponent from './FilmeComponent';
import AvaliacaoComponent from './AvaliacaoComponent';

class AfilmesApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Sistema de avaliações</h1>
                    <Switch>
                        <Route path="/" exact component={ListFilmesComponent} />
                        <Route path="/filmes" exact component={ListFilmesComponent} />
                        <Route path="/avaliacoes" exact component={ListAvaliacoesComponent} />
                        <Route path="/filmes/:id" component={FilmeComponent} />
                        <Route path="/avaliacoes/:id" component={AvaliacaoComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default AfilmesApp