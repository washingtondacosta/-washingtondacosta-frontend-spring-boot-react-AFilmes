import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AvaliacaoDataService from '../service/AvaliacaoDataService';


const AAVALIACOES = 'washington'

class AvaliacaoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            comentario: this.props.match.params.comentario,
            idFilmeFk: this.props.match.params.idFilmeFk,
            nomeUsuario: this.props.match.params.nomeUsuario,
            nota: this.props.match.params.nota     
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        AvaliacaoDataService.retrieveAvaliacao(AAVALIACOES, this.state.id)
            .then(response => this.setState({
                id: response.data.id,
                comentario: response.data.comentario,
                idFilmeFk: response.data.idFilmeFk,
                nomeUsuario: response.data.nomeUsuario,
                nota: response.data.nota
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.nota) {
            errors.nota = 'Informe a nota da avaliação'
        } else if (values.nota.length < 0) {
            errors.nota = 'Informe a nota da avaliação'
        }

        return errors

    }

    onSubmit(values) {
        let username = AAVALIACOES

        let avaliacao = {
            id: this.state.id,
            comentario: values.comentario,
            idFilmeFk: values.idFilmeFk,
            nomeUsuario: values.nomeUsuario,
            nota: values.nota
        }

        if (this.state.id === -1) {
            AvaliacaoDataService.createAvaliacao(username, avaliacao)
                .then(() => this.props.history.push('/avaliacoes'))
        } else {
            AvaliacaoDataService.updateAvaliacao(username, this.state.id, avaliacao)
                .then(() => this.props.history.push('/avaliacoes'))
        }

        console.log(values);
    }

    render() {

        let { id, comentario, idFilmeFk, nomeUsuario, nota} = this.state

        return (
            <div>
                <h3>Avaliação</h3>
                <a class="btn btn-primary" href="../">Voltar</a>
                <div className="container">
                    <Formik
                        initialValues={{ id, comentario, idFilmeFk, nomeUsuario, nota}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="titulo" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="hidden" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Comentário</label>
                                        <Field className="form-control" type="text" name="comentario" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Filme</label>
                                        <Field className="form-control" type="text" name="idFilmeFk" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Seu nome</label>
                                        <Field className="form-control" type="text" name="nomeUsuario" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Nota</label>
                                        <Field className="form-control" type="text" name="nota" />
                                    </fieldset>
                                
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
        
    }
}

export default AvaliacaoComponent