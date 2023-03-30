interface Props {
  password: string
  setPassword: (password: string) => void
}

export const Input = ({ password, setPassword }: Props) => (
  <label htmlFor='password'>
    <input
      type='text'
      id='password'
      placeholder='Enter password...'
      className='border-2 px-5 py-5 text-5xl'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </label>
)
