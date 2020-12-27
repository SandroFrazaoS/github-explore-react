import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Title,
  Form,
  Repositories,
  Error,
  IRepository,
  DeleteButton,
} from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autou/nome do repositório');
      return;
    }

    const findRepositoryIndex = repositories.findIndex(
      repository =>
        repository.full_name.toLowerCase() === newRepo.toLowerCase(),
    );

    if (findRepositoryIndex > -1) {
      setInputError('Repository already on the list');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const respository = response.data;
      setRepositories([...repositories, respository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  const handleRemoveRepository = useCallback(
    (repositoryName: string) => {
      const newRepositories = repositories.filter(
        repository => repository.full_name !== repositoryName,
      );

      setRepositories(newRepositories);
    },
    [repositories],
  );

  return (
    <>
      <img src={logoImg} alt="Github Explore" />
      <Title>Explore Repository no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <IRepository key={repository.full_name}>
            <DeleteButton
              type="button"
              onClick={() => handleRemoveRepository(repository.full_name)}
            >
              <FiTrash2 size={25} />
            </DeleteButton>

            <Link
              key={repository.full_name}
              to={`/repositories/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </IRepository>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
