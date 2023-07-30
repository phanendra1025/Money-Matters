import './index.css'

const SideNavbarOptionButton = props => {
  const {optionDetails, isActive, changeSideNavbarActiveOptionId} = props
  const {optionId, displayText, iconUrl, activeIconUrl} = optionDetails
  const iconSrc = isActive ? activeIconUrl : iconUrl
  const textClass = isActive ? 'active-side-navbar-option-name' : ''
  const itemClass = isActive ? 'active-side-navbar-option-item' : ''
  const changeTheId = () => {
    changeSideNavbarActiveOptionId(optionId)
  }
  return (
    <li className={`side-navbar-option-item ${itemClass}`}>
      <button
        type="button"
        onClick={changeTheId}
        className="side-navbar-option-button"
      >
        <img src={iconSrc} alt="icon" className="icon-images" />
        <p className={`side-navbar-option-name ${textClass}`}>{displayText}</p>
      </button>
    </li>
  )
}

export default SideNavbarOptionButton