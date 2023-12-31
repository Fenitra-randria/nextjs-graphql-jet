import { GetServerSideProps } from 'next';
import React, { SyntheticEvent, useState } from 'react';
import { sdk } from '../graphql/client';
import { Todo, TodosQuery } from '../graphql/types';
import Head from 'next/head';
interface HomeProps {
  todos: TodosQuery
}

export default function Home(props: HomeProps) {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodosQuery['todos']>(props.todos.todos)
  

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
  
    try {
      const response = await sdk.createTodo({
        title,
      });      
  
      setTodos((prevTodos) => {
        if (!prevTodos || !prevTodos.data) return prevTodos;
        return {
          ...prevTodos,
          data: [...(prevTodos.data || []), response?.createTodo?.data],
        };
      });
  
      setTitle('');
    } catch (error) {
      //Error creating todo
    }
  };

  const onDelete = async (id: Todo['id']) => {
    try {
      await sdk.deleteTodo({
        id,
      });
  
      setTodos((prevTodos) => {
        if (!prevTodos || !prevTodos.data) return prevTodos;
        return {
          ...prevTodos,
          data: prevTodos.data.filter((todo) => todo.id !== id),
        };
      });
    } catch (error) {
      //Error deleting todo
    }
  };

  return (
    <>
      <Head>
        <title>Project - Test Nextjs + Jest + GraphQL</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" />
      </Head>
      <div style={{ maxWidth: 700 }} className="container mt-5">
        <h1 className="mb-5 text-center">Suivi de toutes les tâches</h1>

        <form onSubmit={onSubmit}>
          <div className="input-group mb-3">
            <input required value={title} onChange={(event) => setTitle(event.target.value)} id="title" type="text" className="form-control" placeholder="Ajouter une nouvelle tâche" aria-label="Ajouter une nouvelle tâche" aria-describedby="button-addon2"/>
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Ajouter</button>
          </div>
        </form>

        <ul className="list-group">
          {todos?.data?.map((todo) => (
            <li
              key={todo.id}
              data-testid={`todo-${todo.id}`}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              {todo.attributes?.title}
              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const todos = await sdk.todos() 

  return {
    props: {
      todos
    }
  }
}