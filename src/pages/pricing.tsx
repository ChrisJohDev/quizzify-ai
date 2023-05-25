import styles from '@/styles/pricing.module.css'
import Loading from '@/components/loading';

export default function Pricing() {
  return (
    <div className={`container flex flex-col mx-auto ${styles.pricingPage}`}>
      <Loading text={"Loading this might be a ver y long text..."} />
      <h1 className="text-center">Pricing Page</h1>
      <div className={`mx-auto ${styles.tableWrapper}`}>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic</td>
              <td>$10/month</td>
            </tr>
            <tr>
              <td>Pro</td>
              <td>25$/month</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}