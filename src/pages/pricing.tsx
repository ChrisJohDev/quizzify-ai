import styles from '@/styles/pricing.module.css'

export default function Pricing() {
  return (
    <div className={`container flex flex-col mx-auto ${styles.pricingPage}`}>
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