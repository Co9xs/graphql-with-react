import { useRef } from "react"
export const InputForm = (props) => {
  const { defaultVariables, setVariables } = props
  const inputElement = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    setVariables({
      ...defaultVariables,
      query: inputElement.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputElement}/>
      <button type="submit">submit</button>
    </form>
  )
}