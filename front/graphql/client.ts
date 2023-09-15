import { GraphQLClient } from 'graphql-request'
import { getSdk } from './types'

export const client = new GraphQLClient('http://localhost:1337/graphql')

export const sdk = getSdk(client)
