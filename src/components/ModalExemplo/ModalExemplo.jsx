import { useState } from "react";
import "./ModalInserir.scss";

export default function ModalExemplo(props, method = "POST") {
    if (method === "PUT") {
        document.title = "EDITAR";
    } else if (method === "POST") {
        document.title = "CADASTRAR";
    }
    let novoId;
    if (method == "POST") {
        fetch("http://localhost:5000/produtos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                novoId = data[data.length - 1].id + 1;
            })
            .catch((error) => console.log(error));
    }
    const [produto, setProduto] = useState({
        id: novoId,
        nome: "",
        preco: "",
        desc: "",
        img: "",
    });
    if (method == "PUT") {
        let id = props.id;
        fetch("http://localhost:5000/produtos/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProduto(data);
            });
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (method == "POST") {
            fetch("http://localhost:5000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            })
                .then((response) => {
                    console.log(
                        "Status da requisição HTTP : " + response.status
                    );
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
        } else if (method == "PUT") {
            fetch("http://localhost:5000/produtos", {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(produto),
            })
            .then(response => response.json())
            .then(data => this.setState({id: data.id}));
        }
        props.setOpen(false);
    };

    if (props.open) {
        return (
            <div className="container">
                <h1>Cadastrar Produto</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Novo Produto</legend>
                            <div>
                                <label htmlFor="idProduto">Nome Produto:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="idProduto"
                                    value={produto.nome}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idPreco">Preço Produto:</label>
                                <input
                                    type="text"
                                    name="preco"
                                    id="idPreco"
                                    value={produto.preco}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idDesc">
                                    Descrição Produto:
                                </label>
                                <input
                                    type="text"
                                    name="desc"
                                    id="idDesc"
                                    value={produto.desc}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idDesc">
                                    Imagem do Produto:
                                </label>
                                <input
                                    type="text"
                                    name="img"
                                    id="idImg"
                                    value={produto.img}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button>CADASTRAR</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}
