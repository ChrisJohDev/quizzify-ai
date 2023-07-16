/**
 * Project Name: Quizzify-AI
 *
 * Pricing page.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React from 'react';
import styles from '@/styles/pricing.module.css';
import Loading from '@/components/loading';

const notImplemented = true;

/**
 * Pricing page.
 *
 * @returns {React.ReactElement} - The pricing page.
 */
export default function Pricing (): React.ReactElement {
  return (
    <div className={`container flex flex-col mx-auto ${styles.pricingPage}`}>
      {
        notImplemented
          ? <div className={`${styles.tmp}`}>
            <h1 className="text-center">Pricing not implemented!</h1>
            <p>
              Our pricing model is in the works and we will soon be able to provide Price information and different methods of payment.
            </p>
            <p>
              Thank you for your patience and understanding.
            </p>
          </div>
          : <>
            <Loading text={'Loading this might be a ver y long text...'} /><h1 className="text-center">Pricing Page</h1><div className={`mx-auto ${styles.tableWrapper}`}>
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
          </>
      }

    </div>

  );
}
