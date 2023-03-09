import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {courses: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchData()
  }

  retrybtn = () => {
    this.fetchData()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retrybtn}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  fetchData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const ApiCall = await fetch('https://apis.ccbp.in/te/courses')
    if (ApiCall.ok) {
      const response = await ApiCall.json()
      const object = response.courses.map(arr => ({
        id: arr.id,
        name: arr.name,
        logoURL: arr.logo_url,
      }))
      this.setState({courses: object, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {courses} = this.state
    return (
      <div>
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <h1>Courses</h1>
        <ul>
          {courses.map(arr => (
            <Link to={`/courses/${arr.id}`} key={arr.id}>
              <li key={arr.id}>
                <img src={arr.logoURL} alt={arr.name} />
                <p>{arr.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>{this.renderProductDetails()}</div>
      </div>
    )
  }
}

export default Home
