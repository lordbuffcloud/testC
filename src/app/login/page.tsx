import { login } from '@/actions/auth'

interface LoginPageProps {
  searchParams: {
    error?: string
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div>
      <h1>Login to Flash Decks</h1>
      <p>Enter the password to access your flash cards.</p>
      
      {searchParams.error && (
        <div className="error">
          Login failed. Please check your password or contact administrator.
        </div>
      )}
      
      <form action={login} className="login-form">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            required
            autoFocus
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  )
}
