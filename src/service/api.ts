export interface LoginCredentials {
    email: string;
    password: string;
}

export const simulateLogin = ({email, password}: LoginCredentials): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@example.com' && password === 'password') {
                resolve('token-123');
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 3000);
    });
};