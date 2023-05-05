import Logo from './logo'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex justify-center mt-auto p-3">
      <span className="mr-4"><Logo width={30} src={''} alt={''}/></span>
      <p>Copyright &copy; {year} - Quizzify is a product by Chris Johannesson</p>
    </footer>
  )
}

export default Footer;
