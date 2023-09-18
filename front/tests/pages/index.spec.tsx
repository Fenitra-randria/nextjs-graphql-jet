import React from 'react';
import { render } from '@testing-library/react';
import Home, { getServerSideProps } from '../../pages/index';
import { sdk } from '../../graphql/client';
import { TodosQuery } from '../../graphql/types';

describe('The home page', () => {
  it('getServerSideProps returns the correct list of todos from the api', async () => {
    const TEST_TODOS: TodosQuery = {
      __typename: 'Query',
      todos: {
        data: [
          {
            __typename: 'Todo',
            id: '1',
            attributes: {
              title: 'Learn vue',
              createdAt: '2023-09-15',
            },
          },
        ],
      },
    };

    jest.spyOn(sdk, 'todos').mockImplementation(async () => TEST_TODOS);

    const response = await getServerSideProps({} as any);

    expect(sdk.todos).toHaveBeenCalled();
    expect(response).toEqual({
      props: {
        todos: TEST_TODOS,
      },
    });
  });

  it('Home page renders initial todos correctly', () => {
    const TEST_TODOS: TodosQuery = {
      __typename: 'Query',
      todos: {
        data: [
          {
            __typename: 'Todo',
            id: '1',
            attributes: {
              title: 'Learn vue',
              createdAt: '2023-09-15',
            },
          },
          {
            __typename: 'Todo',
            id: '2',
            attributes: {
              title: 'Master react',
              createdAt: '2023-09-16',
            },
          },
        ],
      },
    };

    const { getByTestId } = render(<Home todos={TEST_TODOS} />);

    TEST_TODOS.todos.data.forEach((todo) => {
      const todoItem = getByTestId(`todo-${todo.id}`);
      expect(todoItem.textContent).toContain(todo.attributes?.title);
    });
  });
});