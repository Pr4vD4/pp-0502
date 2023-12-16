import router from "@/router/index.js";

export async function handleUnauthorizedError(error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        await router.push({
            name: 'login'
        })
    }
}