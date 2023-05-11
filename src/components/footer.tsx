import Logo from './logo'
import styles from '@/styles/footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={`mx-auto flex justify-center mt-auto p-3 ${styles.footer}`}>
      <span className="mr-4"><Logo width={30} src={''} alt={''}/></span>
      <p>Copyright &copy; {year} - Quizzify is a product by Chris Johannesson</p>
    </footer>
  )
}

export default Footer;
