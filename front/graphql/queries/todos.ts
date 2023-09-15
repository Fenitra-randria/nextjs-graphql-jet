import {  gql } from 'graphql-request'

export const Todos = gql`
    query todos{
        todos {
            data {
                id
                attributes {
                title
                createdAt
                }
            }
        }
    }
`
