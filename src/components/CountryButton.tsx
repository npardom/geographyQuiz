function CountryButton({action, image, name}:{action: any, image:string, name: string} ) {
  return (
    <div className = "countryButton" onClick={action}>
        <div className ="innerContainer">
            <img src={image} className = "countryLogo"/>
            {name}
        </div>
    </div>
  )
}

export default CountryButton