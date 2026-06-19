function SortByComponent({handleSort}) {
  return (
    <>
      <div id="filter-comp">
        <select id='sort-by-comp' name='filter' onChange={handleSort}>
          <option value="">Sort By...</option>
          <option value="AlphaA-Z">Alphabetically, A-Z</option>
          <option value="AlphaZ-A">Alphabetically, Z-A</option>
          <option value="PriceH-L">Price, High-Low</option>
          <option value="PriceL-H">Price, Low-High</option>
        </select>
      </div>
    </>
  )
}


export default SortByComponent