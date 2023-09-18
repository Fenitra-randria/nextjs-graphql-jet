import 'bootstrap/dist/css/bootstrap.min.css';
import React, { SyntheticEvent, useState , useEffect } from 'react';
import { sdk } from '../graphql/client';
import { Todo, TodosQuery } from '../graphql/types';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Page: React.FC = () => {

  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodosQuery['todos']>()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sdk.todos();
        setTodos(response?.todos);
      } catch (error) {
        //Error getting todos
      }
    };
  
    fetchData(); // Appelez la fonction fetchData ici pour déclencher la requête
  }, []);

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
};
