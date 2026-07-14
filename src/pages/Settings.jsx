import { useState } from 'react'

function Settings() {
  const savedSettings =
    JSON.parse(localStorage.getItem('recallSettings')) || {}

  const [settings, setSettings] = useState({
    matchAlerts: savedSettings.matchAlerts ?? true,
    recoveryUpdates: savedSettings.recoveryUpdates ?? true,
    campusVisibility: savedSettings.campusVisibility ?? true,
    matchSensitivity: savedSettings.matchSensitivity || 'Balanced',
    theme: savedSettings.theme || 'Dark',
  })

  const [saved, setSaved] = useState(false)

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }))

    setSaved(false)
  }

  const handleSensitivity = (event) => {
    setSettings((previous) => ({
      ...previous,
      matchSensitivity: event.target.value,
    }))

    setSaved(false)
  }

  const handleTheme = (event) => {
    const theme = event.target.value

    setSettings((previous) => ({
      ...previous,
      theme,
    }))

    document.documentElement.setAttribute(
      'data-theme',
      theme.toLowerCase(),
    )

    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem(
      'recallSettings',
      JSON.stringify(settings),
    )

    setSaved(true)
  }

  return (
    <section className="settings-page">
      <div className="collection-heading">
        <p className="eyebrow">NETWORK PREFERENCES</p>
        <h1>Settings.</h1>

        <p>
          Control recovery alerts, match behavior and campus visibility.
        </p>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <p className="card-label">RECOVERY ALERTS</p>
          <h2>Notifications</h2>

          <SettingToggle
            title="Smart Match Alerts"
            description="Receive signals when RECALL identifies a possible recovery match."
            active={settings.matchAlerts}
            onClick={() => handleToggle('matchAlerts')}
          />

          <SettingToggle
            title="Recovery Updates"
            description="Track changes to lost, found and returned recovery cases."
            active={settings.recoveryUpdates}
            onClick={() => handleToggle('recoveryUpdates')}
          />
        </article>

        <article className="settings-card">
          <p className="card-label">MATCH ENGINE</p>
          <h2>Recovery intelligence</h2>

          <div className="settings-field">
            <label>Match Sensitivity</label>

            <select
              value={settings.matchSensitivity}
              onChange={handleSensitivity}
            >
              <option>Strict</option>
              <option>Balanced</option>
              <option>Broad</option>
            </select>

            <p>
              Controls how closely lost and found signals must align.
            </p>
          </div>

          <SettingToggle
            title="Campus Visibility"
            description="Allow your recovery reports to appear across the campus recovery network."
            active={settings.campusVisibility}
            onClick={() => handleToggle('campusVisibility')}
          />

          <div className="settings-field">
            <label>Interface Theme</label>

            <select
              value={settings.theme}
              onChange={handleTheme}
            >
              <option>Dark</option>
              <option>Light</option>
            </select>

            <p>
              Choose the visual theme used across the RECALL network.
            </p>
          </div>
        </article>
      </div>

      {saved && (
        <div className="success-message settings-success">
          Recovery preferences saved successfully.
        </div>
      )}

      <button
        className="primary-button settings-save"
        onClick={handleSave}
      >
        Save Preferences
      </button>
    </section>
  )
}

function SettingToggle({
  title,
  description,
  active,
  onClick,
}) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        className={`setting-toggle ${active ? 'active' : ''}`}
        onClick={onClick}
        aria-label={`Toggle ${title}`}
      >
        <span></span>
      </button>
    </div>
  )
}

export default Settings