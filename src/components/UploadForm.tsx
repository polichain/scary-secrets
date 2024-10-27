import React, { useState } from 'react';
import { loginUser, uploadFile } from '../services/storachaService.tsx';

const UploadForm = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null); // Especificar File | null para o estado do arquivo
  const [uploadMessage, setUploadMessage] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleFileUpload = async () => {
    try {
      if (file) {
        const cid = await uploadFile(file);
        setUploadMessage(`Arquivo carregado com sucesso. CID: ${cid}`);
      } else {
        setUploadMessage('Por favor, selecione um arquivo.');
      }
    } catch (error) {
      console.error('Erro ao carregar o arquivo:', error);
      setUploadMessage('Erro ao carregar o arquivo.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null); // Definir para null se nenhum arquivo for selecionado
    }
  };

  return (
    <div>
      <h2>Upload de Arquivos Assustadores</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
      />
      <button onClick={handleLogin}>Login</button>

      <input
        type="file"
        onChange={handleFileChange} // Usa a função handleFileChange
      />
      <button onClick={handleFileUpload}>Carregar Arquivo</button>

      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default UploadForm;
