const endpoints = {
    login: '/api/auth/login',
    user: {
        post: 'api/reg/post',
        get: 'api/reg/get',
        patch: (id: number) => `/api/reg/patch/${id}`
    },
    sector: {
        post: '/api/sect/post',
        get: '/api/sect/get',
        patch: (id: number) => `/api/sect/patch/${id}`
    },
    role: {
        post: '/api/roles/post',
        get: '/api/roles/get',
        patch: (id: number) => `/api/roles/patch/${id}`
    },
    task: {
        post: '/api/task/post',
        get: '/api/task/get',
        patch: (id: number) => `/api/task/patch/${id}`
    },
    task_alloc: {
        post: '/api/alloc/post',
        get: '/api/alloc/get'
    },
    about: {
        get: '/api/about/get',
        patch: (id: number) => `/api/about/patch/${id}`
    },
    contact: {
        get: '/api/contact/get',
        patch: (id: number) => `/api/contact/patch/${id}`
    }
}

export default endpoints