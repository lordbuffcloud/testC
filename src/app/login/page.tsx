import { login } from '@/actions/auth'

export default function LoginPage() {
  return (
    <div>
      <h1>Login to Flash Decks</h1>
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
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  )
}
