export const InputForm = (props) => {
  const { query, defaultVariables, setVariables } = props
  const handleChange = (e) => {
    setVariables({
      ...defaultVariables,
      query: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange}/>
    </form>
  )
}