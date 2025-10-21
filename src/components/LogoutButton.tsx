'use client'

export default function LogoutButton() {
  const handleLogout = () => {
    document.cookie = 'logged_in=; path=/; max-age=0'
    window.location.href = '/simple-login'
  }

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  )
}
