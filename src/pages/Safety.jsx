function Safety() {
  const safetyRules = [
    {
      number: '01',
      title: 'Protect personal information',
      description:
        'Never include passwords, banking details or highly sensitive personal information in a recovery report.',
    },
    {
      number: '02',
      title: 'Verify before returning',
      description:
        'Ask the claimant to describe identifying details that were not publicly shown in the report.',
    },
    {
      number: '03',
      title: 'Use campus meeting points',
      description:
        'Return items at visible campus locations such as the library, department office or security desk.',
    },
    {
      number: '04',
      title: 'Report suspicious claims',
      description:
        'Do not transfer an item when ownership signals are inconsistent or the claimant cannot verify details.',
    },
  ]

  return (
    <section className="safety-page">
      <div className="collection-heading">
        <p className="eyebrow">RECOVERY SAFETY PROTOCOL</p>
        <h1>Recover responsibly.</h1>

        <p>
          RECALL helps connect recovery signals. Safe verification and
          responsible item return remain essential.
        </p>
      </div>

      <div className="safety-grid">
        {safetyRules.map((rule) => (
          <article className="safety-card" key={rule.number}>
            <span>{rule.number}</span>
            <h2>{rule.title}</h2>
            <p>{rule.description}</p>
          </article>
        ))}
      </div>

      <div className="safety-warning">
        <div className="safety-warning-icon">!</div>

        <div>
          <p className="eyebrow">IMPORTANT RECOVERY SIGNAL</p>
          <h2>Ownership confidence comes before item transfer.</h2>
          <p>
            When a claim cannot be verified, keep the recovery case open
            and use the RECALL ownership verification process.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Safety