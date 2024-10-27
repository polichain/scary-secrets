import { create } from '@web3-storage/w3up-client';

let client;

export const initializeClient = async () => {
  if (!client) {
    client = await create();
  }
};

export const loginUser = async (email) => {
  try {
    await initializeClient();
    await client.login(email);
    console.log('Usuário logado com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};

export const createOrUseSpace = async () => {
  try {
    await initializeClient();
    
    // Verifica se já existe um espaço
    const spaces = await client.spaces();
    let space;

    if (spaces.length === 0) {
      // Se não existir, cria um novo espaço
      space = await client.createSpace('default-space');
      await client.setCurrentSpace(space.did());
      console.log('Espaço criado e definido como atual.');
    } else {
      // Usa o primeiro espaço disponível
      space = spaces[0];
      await client.setCurrentSpace(space.did());
      console.log('Espaço existente definido como atual.');
    }
    
    return space;
  } catch (error) {
    console.error('Erro ao criar ou usar o espaço:', error);
  }
};

export const uploadFile = async (file) => {
  try {
    await initializeClient();
    await createOrUseSpace();
    
    // Faz o upload do arquivo
    const cid = await client.uploadFile(file);
    console.log(`Arquivo carregado com sucesso. CID: ${cid}`);
    return cid;
  } catch (error) {
    console.error('Erro ao carregar arquivo:', error);
  }
};
export const getFile = async (cid) => {
  try {
    const response = await fetch(`https://w3s.link/ipfs/${cid}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar o arquivo.');
    }
    return response;
  } catch (error) {
    console.error('Erro ao buscar o arquivo:', error);
    throw error;
  }
};
// storachaService.tsx

export const delegateUploadPermissions = async (toDid) => {
  try {
    await initializeClient(); // Certifique-se de que o cliente está inicializado
    const space = await createOrUseSpace(); // Usa o espaço já criado
    const delegation = await client.createDelegation(toDid, ['upload/add'], {
      with: space.did(),
    });
    return delegation;
  } catch (error) {
    console.error('Erro ao delegar permissões de upload:', error);
    throw error;
  }
};

