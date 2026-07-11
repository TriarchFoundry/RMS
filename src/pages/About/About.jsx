import './About.css'

const TIMELINE = [
  { stage: 'Requirement analysis', copy: 'Studied the problems tenants and landlords face in manual, paper-based renting.' },
  { stage: 'System design', copy: 'Planned a three-tier architecture: presentation, application logic, and database.' },
  { stage: 'Implementation', copy: 'Built tenant registration, rent tracking, maintenance requests and document storage.' },
  { stage: 'Testing & deployment', copy: 'Verified each module, then packaged the system for landlords and tenants to use.' },
]

export default function About() {
  return (
    <div className="container section">
      <p className="eyebrow">About the project</p>
      <h1>A centralized, digital alternative to the paper rent register.</h1>
      <p className="about-lede">
        Basera is a Rental Management System built to remove the friction from renting rooms —
        for tenants who lose time and security searching for a place, and for landlords who
        lose track of vacancies, tenants and payments. It replaces manual coordination with a
        shared, structured platform.
      </p>

      <div className="about-grid">
        <div className="about-block">
          <h2>For tenants</h2>
          <p>Search rooms by location and budget, apply, upload identification, pay rent online,
          and raise maintenance requests — all from one account.</p>
        </div>
        <div className="about-block">
          <h2>For landlords</h2>
          <p>List rooms, review applications, track who owes what and when, and resolve
          maintenance issues from a single queue instead of scattered messages.</p>
        </div>
      </div>

      <h2 className="about-section-title">How it was built</h2>
      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div className="timeline__item" key={item.stage}>
            <span className="timeline__index mono">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.stage}</h3>
              <p>{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
