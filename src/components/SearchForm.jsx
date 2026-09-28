function SearchForm() {
  return (
    <form className="wz-search-form" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="input-group wz-search-group">
        <input
          type="text"
          className="form-control wz-search-input"
          name="search"
          placeholder="Digite o que você procura"
          aria-label="Buscar produtos"
        />
        <button className="btn wz-search-btn" type="submit" aria-label="Buscar">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  )
}

export default SearchForm
