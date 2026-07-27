export default interface Sector {
    sector_id?: number
    sector_name: string
    sector_status: 'Pending' | 'Approved' | 'Inactive'
    sector_description: string
}