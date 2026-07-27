export default interface Task {
    task_id: number
    registration_id: number
    task_detail: string
    task_status: string
    start_time: Date
    end_time: Date
}