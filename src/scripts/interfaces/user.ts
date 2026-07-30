export default interface User {
    user_id?: number
    sector_id: number
    role_id: number
    user_name: string
    password?: string
    email: string
    acc_status: 'Pending' | 'Approved' | 'Inactive'
    reg_type: string
    location: string
}