import { RootState } from '../store'

export const getClientSearch = ({ clients }: RootState) => clients.search
