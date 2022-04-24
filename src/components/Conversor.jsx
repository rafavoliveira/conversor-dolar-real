import React, { useState } from "react";
import { Button, Card, Form, Input } from "semantic-ui-react";

const Conversor = ({ moedaOrigem, moedaDestino }) => {
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState(0);
  const [cotacao, setCotacao] = useState(0);

  const alterarValor = (e, { value }) => {
    setValor(value);
  };

  const converter = async function () {
    setLoading(true);
    const url = `https://free.currconv.com/api/v7/convert?q=${moedaOrigem}_${moedaDestino}&compact=ultra&apiKey=cc21b4380b0ac74d3b7b`;

    const response = await fetch(url);
    const result = await response.json();
    setLoading(false);
    setCotacao(result[`${moedaOrigem}_${moedaDestino}`]);
  };
  return (
    <Card>
      <Card.Content>
        <Card.Header>Conversor de Moedas</Card.Header>
        <Card.Meta>Cotação Atual: R$ {cotacao.toFixed(2)}</Card.Meta>
        <Card.Description>
          <Form>
            <Form.Field>
              <label>{moedaOrigem}</label>
              <Input
                type="text"
                placeholder={`Valor em ${moedaOrigem}`}
                onChange={alterarValor}
                value={valor}
              ></Input>
            </Form.Field>
            <Form.Field>
              <label>{moedaDestino}</label>
              <label>{(valor * cotacao).toFixed(2)}</label>
            </Form.Field>
          </Form>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          color="blue"
          fluid
          loading={loading}
          disabled={loading}
          onClick={converter}
        >
          Converter
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Conversor;
