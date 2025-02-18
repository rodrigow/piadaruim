import React, { useEffect, useState } from 'react';
import { Button, Flex, Spin, Typography } from 'antd';
import { usePiadaRuim } from './hooks/usePiadaRuim';
import { BulbOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

export const App = () => {
  const { Paragraph, Title, Text } = Typography;

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  const { piada, isPiadaLoading } = usePiadaRuim({ id });
  const [ mostrarResposta, setMostrarResposta ] = useState(false)

  useEffect(() => {
    setMostrarResposta(false);
  }, [ piada ]);

  if (isPiadaLoading) {
    return (
      <div>
        <Flex vertical={true} align='center' justify='center'>
          <Title level={1}>Piada Ruim do Dia!</Title>
          <Divider/>
          <Spin size='large' tip='Carregando...'/>
        </Flex>
      </div>
    )
  }

  return (
    <>
      <Flex vertical={true} align='center' justify='center'>
        <Title level={1}>Piada Ruim do Dia!</Title>
        <Divider/>

        {piada?.resposta ? (
          <Title level={2}>{piada?.pergunta}</Title>
        ) : (
          <Title level={2} type='success'>{piada?.pergunta}</Title>
        )}

        {piada && piada.resposta && (
          <>
            {!mostrarResposta && (
              <Button
                type='primary' shape='round' size='large'
                icon={<BulbOutlined/>}
                onClick={() => setMostrarResposta(true)}
              >
                Ver Resposta
              </Button>
            )}
            {mostrarResposta && (
              <Title level={2} type='success'>{piada?.resposta}</Title>
            )}
          </>
        )}

        <Divider/>
        <Text>Compartilhe</Text>
        <Paragraph
          type='secondary'
          copyable={{
            tooltips: [ 'Clique aqui para copiar o link', 'Link compiado' ],
          }}
        >
          {`https://piadaruim.com/id=${piada?.id}`}
        </Paragraph>
      </Flex>
    </>
  );
}
