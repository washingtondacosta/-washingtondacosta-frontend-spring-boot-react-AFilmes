import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FilmeDataService from '../service/FilmeDataService';

const AFILMES = 'washington'

class FilmeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            titulo: this.props.match.params.titulo,
            sinopse: this.props.match.params.sinopse,
            anoLancamento: this.props.match.params.anoLancamento,
            produtores: this.props.match.params.produtores,
            protagonistas: this.props.match.params.protagonistas,
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

        FilmeDataService.retrieveFilme(AFILMES, this.state.id)
            .then(response => this.setState({
                titulo: response.data.titulo,
                sinopse: response.data.sinopse,
                anoLancamento: response.data.anoLancamento,
                produtores: response.data.produtores,
                protagonistas: response.data.protagonistas
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.titulo) {
            errors.titulo = 'Informe um titulo'
        } else if (values.titulo.length < 2) {
            errors.titulo = 'Valor do titulo deve ter no minimo 2 caracteres'
        }

        return errors

    }

    onSubmit(values) {
        let username = AFILMES

        let filme = {
            id: this.state.id,
            titulo: values.titulo,
            sinopse: values.sinopse,
            anoLancamento: values.anoLancamento,
            produtores: values.produtores,
            protagonistas: values.protagonistas,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            FilmeDataService.createFilme(username, filme)
                .then(() => this.props.history.push('/filmes'))
        } else {
            FilmeDataService.updateFilme(username, this.state.id, filme)
                .then(() => this.props.history.push('/filmes'))
        }

        console.log(values);
    }

    render() {

        let { id, titulo, sinopse, anoLancamento, produtores, protagonistas} = this.state

        return (
            <div>
                <h3>Filme</h3>
                <a class="btn btn-primary" href="../">Voltar</a>
                <div className="container">
                    <Formik
                        initialValues={{ id, titulo, sinopse, anoLancamento, produtores, protagonistas}}
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
                                        <label>Titulo</label>
                                        <Field className="form-control" type="text" name="titulo" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Sinopse</label>
                                        <Field className="form-control" type="text" name="sinopse" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Ano de Lançamento</label>
                                        <Field className="form-control" type="text" name="anoLancamento" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Produtores</label>
                                        <Field className="form-control" type="text" name="produtores" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Protagonistas</label>
                                        <Field className="form-control" type="text" name="protagonistas" />
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

export default FilmeComponent