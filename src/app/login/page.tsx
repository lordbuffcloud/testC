import { login } from '@/actions/auth'

export default function LoginPage() {
  return (
    <div>
      <h1>Login to Flash Decks</h1>
      <p>Enter the password to access your flash cards.</p>
      
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
      
      <div className="help-text">
        <p><strong>Setup Instructions:</strong></p>
        <ol>
          <li>Make sure environment variables are set in Vercel</li>
          <li>Add Vercel Postgres integration</li>
          <li>Visit <code>/api/init</code> to initialize database</li>
        </ol>
      </div>
    </div>
  )
}
