function ButtonComponent(props) {
 const {label, type, onClickHandler} = props
 return (
  <>
   <button
   type={type}
   onClick={onClickHandler}>
    {label}
   </button>
  </>
 )
}


export default ButtonComponent