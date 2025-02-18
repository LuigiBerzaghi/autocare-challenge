import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contato.css';

const Contato: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [enviado, setEnviado] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!nome || !email || !mensagem) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se o email é válido
    if (!isValidEmail(email)) {
      setErro('Por favor, insira um endereço de email válido.');
      return;
    }

    setCarregando(true);
    setErro(null);

    // Parâmetros para o template do EmailJS
    const templateParams = {
      nome,
      email,
      mensagem,
    };

    try {
      await emailjs.send(
        'service_7ky7mpj', // Substitua pelo seu Service ID
        'template_ffgt22p', // Substitua pelo seu Template ID
        templateParams,
        '-APsGrdM4xbW0jO10' // Sua chave pública (Public Key)
      );
      setEnviado(true);
    } catch (error) {
      setErro('Ocorreu um erro ao enviar seu email. Tente novamente mais tarde.');
      console.error('Erro ao enviar email:', error);
    } finally {
      setCarregando(false);
    }
  };

  
  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <section className="contato" id='contato'>
    <h1 className="section-contato-titulo"> Continua com duvidas? entre em contato conosco </h1>
      <div className="container__contato">
        <form id="form-contato" onSubmit={handleSubmit}>
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            id="mensagem"
            name="mensagem"
            placeholder="Mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit" className="botao-contato" disabled={carregando}>
            {carregando ? 'Enviando...' : enviado ? 'Mensagem Enviada!' : 'Enviar Mensagem'}
          </button>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contato;
