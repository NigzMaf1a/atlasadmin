export default interface Role {
    role_id?: number
    sector_id: number
    role_title: string
    role_status: 'Pending' | 'Approved' | 'Inactive'
}