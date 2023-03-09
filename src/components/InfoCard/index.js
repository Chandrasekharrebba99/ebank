import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class InfoCard extends Component {
  state = {courseDetails: [], apiStatus: apiStatusConstants.initial}

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
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const Url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(Url)
    if (response.ok) {
      const data = await response.json()
      const Alldata = data.course_details
      const newData = {
        id: Alldata.id,
        name: Alldata.name,
        imageUrl: Alldata.image_url,
        description: Alldata.description,
      }
      this.setState({
        courseDetails: newData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    return (
      <div>
        <img src={courseDetails.imageUrl} alt={courseDetails.name} />
        <h1>{courseDetails.name}</h1>
        <p>{courseDetails.description}</p>
      </div>
    )
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

  render() {
    return (
      <di>
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        {this.renderProductDetails()}
      </di>
    )
  }
}

export default InfoCard
