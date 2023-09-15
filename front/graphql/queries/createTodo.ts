import {  gql } from 'graphql-request'

export const CreateTodo = gql`
    mutation createTodo($title: String!) {
        createTodo(data: {title: $title}) {
          data {
            id
            attributes{
              title
              createdAt
            }
          }
        }
    }
`
