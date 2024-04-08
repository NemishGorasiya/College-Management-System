import './YearMonthFilter.scss'


const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];


export default function YearMonthFilter() {
  return (
    <div className="yearMonthFilterWrapper">
          <select name="yearSelect" id="yearSelect">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <select name="monthSelect" id="monthSelect">
            {
              months.map(month => <option key={month} value={month}>{month}</option>)
            }
          </select>
        </div>
  )
}
