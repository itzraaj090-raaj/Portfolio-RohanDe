function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "SQL"
  ];

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="skills">
        {skills.map((skill, index) => (
          <div className="skill" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;