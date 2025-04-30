import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries/auth'; // Update the path to the correct location
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [login] = useMutation(LOGIN);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value
      }
    });
    
    localStorage.setItem('token', data.login.token);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}